"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-2.onrender.com";

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");

    if (!shopId) {
      setLoading(false);
      return;
    }

    fetch(`${API}/shops/get?shopId=${shopId}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setShop(data.shop);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Settings fetch error:", err);
        setLoading(false);
      });
  }, [API]);

  if (loading) {
    return (
      <div className="p-6 text-lg font-medium text-gray-600">
        Mağaza bilgileri yükleniyor...
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-6 text-lg font-medium text-red-600">
        Mağaza bulunamadı.
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Kopyalandı!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      {/* BAŞLIK */}
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Hesap Ayarları</h1>

      {/* MAĞAZA BİLGİLERİ */}
      <div className="space-y-3 mb-10">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-900">Mağaza Adı:</span>{" "}
          {shop.name}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-900">E-posta:</span>{" "}
          {shop.ownerEmail}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-900">Plan:</span>{" "}
          {shop.plan === "premium" ? (
            <span className="text-green-600 font-semibold">Premium (899₺)</span>
          ) : (
            <span className="text-blue-600 font-semibold">Standard (499₺)</span>
          )}
        </p>
      </div>

      {/* QR KOD VE LİNK */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Mağaza QR Kodu</h2>

        <div className="flex justify-center mb-6">
          <img
            src={shop.qrUrl}
            alt="QR Code"
            className="w-48 h-48 border rounded-lg shadow"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Yapay Zekâ Müşteri Asistanı Linki
        </h2>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={shop.publicUrl}
            readOnly
            className="flex-1 p-3 border rounded-lg bg-gray-100 text-gray-700"
          />
          <button
            onClick={() => copyToClipboard(shop.publicUrl)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          >
            Kopyala
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Bu linki Trendyol / Hepsiburada ürün açıklamasına koyabilir veya QR'ı
          ürün görsellerine ekleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
