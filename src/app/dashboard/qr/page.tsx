"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function QRPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [shopId, setShopId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    const membership = localStorage.getItem("membership");

    if (!membership || membership !== "active") {
      router.replace("/dashboard/payment");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const id = decoded.email.split("@")[0];
      setShopId(id);
      setLoaded(true);
    } catch {
      router.replace("/login");
    }
  }, []);

  if (!loaded) {
    return <div className="text-white p-10 text-xl">Yükleniyor...</div>;
  }

  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;
  const aiUrl = `https://flowai.app/${shopId}`;

  function copyLink() {
    navigator.clipboard.writeText(aiUrl);
    alert("🔗 Link kopyalandı!");
  }

  function downloadQR() {
    window.open(qrUrl, "_blank");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#190332] text-white p-12">

      <h1 className="text-4xl font-bold mb-4">🔗 AI Link & QR Kod</h1>
      <p className="text-lg opacity-80 mb-10">
        Müşterileriniz bu link ve QR ile yapay zekaya ulaşabilir 🎉
      </p>

      <div className="grid grid-cols-2 gap-10 max-w-5xl">

        {/* Link Alanı */}
        <div className="bg-white/10 border border-white/20 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">🌐 Özel AI Link</h2>

          <div className="bg-black/50 px-4 py-3 rounded mb-4 break-all">
            {aiUrl}
          </div>

          <button
            onClick={copyLink}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg"
          >
            📋 Linki Kopyala
          </button>
        </div>

        {/* QR Kodu Alanı */}
        <div className="bg-white/10 border border-white/20 p-8 rounded-xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">🖼 QR Kod</h2>

          <img
            src={qrUrl}
            alt="QR"
            className="w-64 h-64 bg-white rounded-lg p-2 mb-6"
          />

          <button
            onClick={downloadQR}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            ⬇ QR Kodu İndir
          </button>
        </div>
      </div>

      <div className="mt-12 text-lg opacity-80">
        📌 Bu link & QR nereye eklenebilir?
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Ürün açıklamasına</li>
          <li>Mağaza banner alanına</li>
          <li>Sosyal medya bio linkine</li>
          <li>Whatsapp butonuna</li>
          <li>Kargo poşeti, ürün etiketine</li>
        </ul>
      </div>
    </div>
  );
}
