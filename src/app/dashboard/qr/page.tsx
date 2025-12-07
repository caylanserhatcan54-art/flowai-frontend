"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function QRPage() {
  const [shopData, setShopData] = useState<any>(null);
  const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null;

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

      <h1 className="text-4xl font-bold mb-4">🎯 Hazır Akıllı Link & QR Kod</h1>
      <p className="text-lg opacity-80 mb-10">
        Müşterileriniz bu linkten yapay zekaya ulaşabilir 👇
      </p>

      {/* LINK CARD */}
      <div className="bg-white/10 p-6 rounded-xl border border-white/20 max-w-xl">
        <p className="text-lg break-all mb-4">{aiUrl}</p>

        <button
          onClick={() => navigator.clipboard.writeText(aiUrl)}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          📋 Linki Kopyala
        </button>
      </div>

      {/* QR CARD */}
      <div className="bg-white/10 p-6 rounded-xl border border-white/20 max-w-xl mt-8 flex flex-col">
        <img src={qrUrl} className="w-64 h-64 mx-auto bg-white rounded-xl p-2" />
        
        <button
          onClick={() => window.open(qrUrl, "_blank")}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mt-6"
        >
          ⬇ QR Kodu İndir
        </button>
      </div>

      <div className="mt-10 text-lg opacity-90">
        🎁 Önerilen kullanım yerleri:
        <ul className="list-disc ml-6 mt-2 text-base">
          <li>Ürün açıklamasına ekleyin</li>
          <li>Mağaza bannerına koyun</li>
          <li>Paketlerin üzerine QR etiketi basın</li>
          <li>Instagram bio’ya ekleyin</li>
          <li>WhatsApp linkine ekleyin</li>
        </ul>
      </div>
    </div>
  );
}
