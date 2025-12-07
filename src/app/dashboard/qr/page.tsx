"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function QRPage() {
  const [membership, setMembership] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const m = localStorage.getItem("membership");
    setMembership(m);
  }, []);

  if (membership === null)
    return <div className="text-white p-10 text-lg">Yükleniyor...</div>;

  if (membership !== "active") {
    router.push("/dashboard/payment");
    return null;
  }

  const shopEmail = localStorage.getItem("shopEmail");
  const shopId = shopEmail ? shopEmail.split("@")[0] : "magaza";

  const aiUrl = `https://flowai.app/${shopId}`;
  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-4xl font-bold mb-3">🔗 AI Link & QR Kod</h1>
      <p className="opacity-80 mb-10 text-lg">
        Müşterileriniz bu link ve QR ile yapay zekaya ulaşır.
      </p>

      {/* LİNK */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-2">🌐 Mağazanızın AI Linki</h2>
        <p className="bg-black/40 px-4 py-2 rounded mt-2 break-all">{aiUrl}</p>

        <button
          onClick={() => navigator.clipboard.writeText(aiUrl)}
          className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg"
        >
          📋 Linki Kopyala
        </button>
      </div>

      {/* QR KISMI */}
      <div className="mt-10 bg-white/10 border border-white/10 rounded-xl p-6 max-w-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">🖼 QR Kodunuz</h2>

        <img src={qrUrl} className="w-56 h-56 bg-white p-2 rounded-lg mb-6" />

        <button
          onClick={() => window.open(qrUrl)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          ⬇ QR Kodu İndir
        </button>
      </div>

      <div className="mt-12 text-lg opacity-80">
        Bu kodu şuralara koyabilirsiniz:
        <ul className="list-disc pl-6 mt-3 space-y-1">
          <li>Mağaza bannerına</li>
          <li>Ürün açıklamalarına</li>
          <li>WhatsApp profil bağlantısına</li>
          <li>Instagram BIO kısmına</li>
          <li>Kargo paket etiketine</li>
        </ul>
      </div>
    </div>
  );
}
