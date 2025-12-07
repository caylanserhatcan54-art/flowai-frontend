"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function QRPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const membership = localStorage.getItem("membership");
    
    if (!membership || membership !== "active") {
      router.replace("/dashboard/payment");
      return;
    }

    setMounted(true);
  }, []);

  if (!mounted) return <div className="text-white p-10">Yükleniyor...</div>;

  const shopEmail = localStorage.getItem("shopEmail") || "demo@flowai.com";
  const shopId = shopEmail.split("@")[0];

  const aiUrl = `https://flowai.app/${shopId}`;
  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#190332] text-white p-10">

      <h1 className="text-4xl font-bold mb-4">🔗 AI Link & QR Kod</h1>

      <p className="opacity-70 mb-10 text-lg">
        Müşterileriniz bu link ve QR ile size ulaşabilir.
      </p>

      <div className="bg-white/10 border border-white/20 rounded-xl p-6 max-w-xl mb-10">
        <h2 className="font-semibold text-xl mb-2">🌐 Akıllı AI Link</h2>
        <p className="bg-black/40 p-3 rounded text-lg break-all">{aiUrl}</p>

        <button
          onClick={() => navigator.clipboard.writeText(aiUrl)}
          className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg"
        >
          📋 Linki Kopyala
        </button>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-6 max-w-xl">
        <h2 className="font-semibold text-xl mb-4">🖼 QR Kod</h2>

        <img src={qrUrl} className="w-64 h-64 bg-white rounded-lg p-2 mb-6"/>

        <button
          onClick={() => window.open(qrUrl, "_blank")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          ⬇ QR Kodu İndir
        </button>
      </div>
    </div>
  );
}
