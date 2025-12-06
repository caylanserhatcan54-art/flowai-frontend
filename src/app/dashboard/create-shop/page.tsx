"use client";

import { useState } from "react";

export default function CreateShopPage() {
  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-2.onrender.com";

  const [name, setName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [platform, setPlatform] = useState("custom");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    setError("");

    const raw = localStorage.getItem("user");
    if (!raw) {
      setError("Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    const user = JSON.parse(raw);

    if (!name || !storeUrl) {
      setError("Mağaza adı ve mağaza URL zorunludur.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/shops/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          name,
          platform,
          storeUrl,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Mağaza oluşturulamadı.");
        setLoading(false);
        return;
      }

      // mağazanın shopId’sini storage’a yaz
      localStorage.setItem("shopId", data.shopId);

      // Dashboard’a yönlendir
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      setError("Sunucuyla bağlantı kurulamadı.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Yeni Mağaza Oluştur</h1>
      <p className="text-gray-600 mb-6">
        FlowAI ile mağazanızı hemen kullanmaya başlayabilirsiniz.
      </p>

      {error && (
        <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <label className="block mb-2 font-medium">Mağaza Adı</label>
      <input
        type="text"
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="Örn: Serhat Elektronik"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mb-2 font-medium">Mağaza URL</label>
      <input
        type="text"
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="https://ornek-magaza.com"
        value={storeUrl}
        onChange={(e) => setStoreUrl(e.target.value)}
      />

      <label className="block mb-2 font-medium">Platform</label>
      <select
        className="w-full px-4 py-2 mb-6 border rounded"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="custom">Kendi Sitesi</option>
        <option value="shopier">Shopier</option>
        <option value="shopify">Shopify</option>
        <option value="trendyol">Trendyol</option>
        <option value="hepsiburada">Hepsiburada</option>
        <option value="n11">N11</option>
        <option value="ikas">İkas</option>
      </select>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
      >
        {loading ? "Oluşturuluyor..." : "Mağaza Oluştur"}
      </button>
    </div>
  );
}
