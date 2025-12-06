"use client";
// @ts-nocheck

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function AILinkPage() {
  const [shop, setShop] = useState<any>(null);
  const [qr, setQr] = useState<string>("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-2.onrender.com";

  // FRONTEND DOMAIN (AI widget açılan URL)
  const FRONTEND_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    "https://flowai-frontend-hmz9.vercel.app";

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");
    if (!shopId) return;

    // ✔ doğru backend endpoint
    fetch(`${API_URL}/public/shop-info?shopId=${shopId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.ok) {
          setShop(data.shop);

          // ✔ mağaza için doğru AI URL (frontend)
          const url = `${FRONTEND_URL}/ai?shop=${shopId}`;

          // ✔ QR üret
          const qrData = await QRCode.toDataURL(url);
          setQr(qrData);
        }
      })
      .catch((err) => {
        console.error("Shop info error:", err);
      });
  }, []);

  if (!shop)
    return (
      <div className="p-6 text-gray-600">
        Mağaza bilgileri yükleniyor...
      </div>
    );

  const aiUrl = `${FRONTEND_URL}/ai?shop=${shop.id}`;

  function downloadQR() {
    const a = document.createElement("a");
    a.href = qr;
    a.download = `QR-${shop.shopName}.png`;
    a.click();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Link & QR Kod</h1>

      <div className="bg-white shadow p-6 rounded-xl border">
        {/* LİNK */}
        <p className="text-gray-700 font-semibold">
          Mağazaya Özel AI Bağlantısı:
        </p>

        <div className="bg-gray-100 p-3 rounded-lg mt-2 border text-gray-800 break-all">
          {aiUrl}
        </div>

        {/* QR */}
        <h2 className="text-lg font-semibold mt-6 mb-2">QR Kod</h2>

        {qr && (
          <img
            src={qr}
            alt="QR Code"
            className="w-48 h-48 border p-2 rounded-lg bg-white"
          />
        )}

        <button
          onClick={downloadQR}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          QR Kod İndir
        </button>
      </div>
    </div>
  );
}
