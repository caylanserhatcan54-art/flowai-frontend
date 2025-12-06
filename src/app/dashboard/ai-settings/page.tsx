"use client";
import { useState, useEffect } from "react";

export default function AISettingsPage() {
  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-2.onrender.com";

  const [shopId, setShopId] = useState<string | null>(null);
  const [logo, setLogo] = useState("");
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  // ------------------------------------------------------
  // 🔥 Shop ID'yi güvenli şekilde al
  // ------------------------------------------------------
  useEffect(() => {
    const id = localStorage.getItem("shopId");
    setShopId(id);
  }, []);

  // ------------------------------------------------------
  // 🔥 Firestore AI ayarlarını yükle
  // ------------------------------------------------------
  useEffect(() => {
    if (!shopId) return;

    fetch(`${API}/ai-settings/${shopId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.settings) {
          setLogo(data.settings.logo || "");
          setStoreName(data.settings.storeName || "");
          setDescription(data.settings.description || "");
        }
      })
      .catch((e) => {
        console.error("Ayar yükleme hatası:", e);
      });
  }, [shopId, API]);

  // ------------------------------------------------------
  // 🔥 Ayarları kaydet
  // ------------------------------------------------------
  const saveSettings = async () => {
    if (!shopId) {
      setStatus("❌ Shop ID bulunamadı!");
      return;
    }

    const res = await fetch(`${API}/ai-settings/${shopId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logo,
        storeName,
        description,
      }),
    });

    const data = await res.json();

    if (data.ok) setStatus("✔ Ayarlar kaydedildi");
    else setStatus("❌ Kaydedilemedi");
  };

  // ------------------------------------------------------
  // 🔥 Logo yükleme
  // ------------------------------------------------------
  const uploadLogo = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setStatus("Yükleniyor...");

    const upload = await fetch(`${API}/uploads/logo`, {
      method: "POST",
      body: formData,
    });

    const data = await upload.json();

    if (!data.ok) {
      setStatus("❌ Logo yüklenemedi");
      return;
    }

    setLogo(data.url);
    setStatus("✔ Logo yüklendi");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        AI Mağaza Ayarları
      </h1>

      <p className="text-gray-700 mb-8">
        Mağazan için FlowAI yapay zekasını özelleştirebilirsin.
      </p>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        
        {/* LOGO UPLOAD */}
        <label className="font-semibold text-gray-900 block mb-2">
          Mağaza Logosu (PNG / JPG / SVG)
        </label>

        <input
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadLogo(file);
          }}
        />

        {logo && (
          <img
            src={logo}
            className="w-24 h-24 rounded-full border shadow mt-4"
          />
        )}

        {/* STORE NAME */}
        <div className="mt-6">
          <label className="font-semibold text-gray-900 block mb-2">
            Mağaza Adı
          </label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
            placeholder="Örn: Desenyum Case"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="font-semibold text-gray-900 block ml-1 mb-2">
            Mağaza Açıklaması
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 h-28"
            placeholder="Mağazan ne satıyor? AI müşterilere nasıl yardımcı olmalı?"
          ></textarea>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
        >
          Kaydet
        </button>

        {status && <p className="mt-4 text-gray-900">{status}</p>}
      </div>
    </div>
  );
}
