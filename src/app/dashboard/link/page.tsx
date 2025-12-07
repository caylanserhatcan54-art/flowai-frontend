"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LinkPage() {
  const [shopData, setShopData] = useState<any>(null);
  const shopId =
    typeof window !== "undefined" ? localStorage.getItem("shopId") : null;

  useEffect(() => {
    if (!shopId) return;

    async function loadShopData() {
      const res = await fetch(`${BACKEND}/api/public/shop/${shopId}`);
      const json = await res.json();
      setShopData(json);
    }

    loadShopData();
  }, [shopId]);

  if (!shopData) {
    return (
      <div className="text-white text-center p-20 text-2xl">
        Yükleniyor...
      </div>
    );
  }

  const aiUrl = `https://flowai.app/${shopId}`;
  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F2B] to-[#1C034D] text-white p-10">

      <h1 className="text-4xl font-bold mb-6">🔗 Akıllı Link & QR Kod</h1>

      <p className="opacity-90 mb-10 text-lg">
        Müşterileriniz bu link ve QR kod ile AI satış temsilcisine ulaşabilir.
      </p>

      {/* Link Card */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 max-w-xl">
        <p className="text-lg font-medium break-all mb-4">{aiUrl}</p>

        <button
          onClick={() => navigator.clipboard.writeText(aiUrl)}
          className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-semibold text-white w-full"
        >
          📋 Linki Kopyala
        </button>
      </div>

      {/* QR Card */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 max-w-xl mt-8 flex flex-col items-center">
        <img
          src={qrUrl}
          alt="QR Code"
          className="w-60 h-60 rounded-xl bg-white p-2 shadow-lg"
        />

        <button
          onClick={() => window.open(qrUrl, "_blank")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white mt-6"
        >
          ⬇ QR Kodu İndir
        </button>
      </div>

      <div className="mt-12 max-w-xl bg-white/10 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3">📌 Nerede Kullanabilirsiniz?</h3>

        <ul className="opacity-90 space-y-2 text-lg">
          <li>✔ Ürün açıklamasına ekleyin</li>
          <li>✔ WhatsApp profil linkine koyun</li>
          <li>✔ Instagram bio’ya ekleyin</li>
          <li>✔ Mağaza bannerına koyun</li>
          <li>✔ Kargo paketlerine QR olarak basın</li>
          <li>✔ Kartvizitlere yerleştirin</li>
        </ul>
      </div>
    </div>
  );
}
