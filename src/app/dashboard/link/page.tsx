"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LinkPage() {
  const router = useRouter();
  const [shopId, setShopId] = useState<string | null>(null);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      setShopName(decoded.shopName);
      setShopId(decoded.email.split("@")[0]); // emailden ID üret
    } catch {
      router.push("/login");
    }
  }, []);

  if (!shopId) return <div className="text-white p-10">Yükleniyor...</div>;

  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;
  const aiUrl = `https://flowai.app/${shopId}`;

  async function copyLink() {
    await navigator.clipboard.writeText(aiUrl);
    alert("🔗 Link kopyalandı!");
  }

  function downloadQR() {
    window.open(qrUrl, "_blank");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white p-12">
      <h1 className="text-4xl font-bold mb-3">🔗 AI Link & QR Kod</h1>
      <p className="opacity-80 text-lg mb-12">
        Mağaza müşterilerin yapay zekaya ulaşması için QR & özel link hazır 🎉
      </p>

      <div className="grid grid-cols-2 gap-10 max-w-5xl">
        
        {/* AI LINK PANEL */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/10 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">📌 Özel AI Link</h2>

          <div className="bg-black/40 px-4 py-3 rounded break-all mb-4 text-lg">
            {aiUrl}
          </div>

          <button
            onClick={copyLink}
            className="bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium"
          >
            📋 Linki Kopyala
          </button>
        </div>

        {/* QR PANEL */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/10 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">🖼 QR Kod</h2>

          <img
            src={qrUrl}
            alt="QR Code"
            className="w-64 h-64 bg-white p-2 rounded-lg shadow-xl mb-6"
          />

          <button
            onClick={downloadQR}
            className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg font-medium"
          >
            ⬇ QR Kodu İndir
          </button>
        </div>
      </div>

      <div className="mt-12 bg-white/10 p-8 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold mb-4">📌 Bu link & QR nereye koyulmalı?</h3>

        <ul className="opacity-90 space-y-2 text-lg">
          <li>✔ Ürün açıklamasına koy</li>
          <li>✔ Mağaza banner’ına ekle</li>
          <li>✔ WhatsApp iletişim butonuna ekle</li>
          <li>✔ Instagram bio linkine koy</li>
          <li>✔ Kartvizit ve promosyon ürünlerine bas</li>
          <li>✔ Kargo paketinin içine QR olarak koy</li>
        </ul>
      </div>
    </div>
  );
}
