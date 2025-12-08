"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function QRPage() {
  const router = useRouter();
  const [shopId, setShopId] = useState<string>("");
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const extractedShopId = decoded.email.split("@")[0];

      setShopName(decoded.shopName);
      setShopId(extractedShopId);

      // 🔥 SHOP ID’yi kaydet — çok kritik 👇
      localStorage.setItem("shopId", extractedShopId);

    } catch {
      router.push("/login");
    }
  }, []);

  if (!shopId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        🔄 Yükleniyor...
      </div>
    );
  }

  // 🔗 Link oluşturuyoruz
  const aiUrl = `https://flowai.app/${shopId}`;
  // 📌 QR endpoint
  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(aiUrl);
    alert("🔗 Link kopyalandı!");
  };

  const downloadQR = () => {
    window.open(qrUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F2B] to-[#1C034D] p-10 text-white">

      <h1 className="text-4xl font-bold mb-4">🔗 QR Kod & AI Link</h1>
      <p className="opacity-90 mb-10">
        Müşterilerin mağazana özel oluşturulan AI asistanına ulaşması için QR Kod ve bağlantı hazır 🎉
      </p>

      <div className="grid grid-cols-2 gap-12 max-w-6xl">

        {/* LEFT BOX */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">📌 Mağazaya Özel AI Bağlantısı</h2>

          <div className="bg-black/40 px-4 py-3 rounded break-all mb-6 text-lg border border-white/10">
            {aiUrl}
          </div>

          <button
            onClick={copyLink}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold"
          >
            📋 Linki Kopyala
          </button>

          <p className="text-sm opacity-70 mt-4 leading-relaxed">
            Bu bağlantıyı ürün açıklamalarınıza, WhatsApp profilinize,
            Instagram bio'ya, DM’de müşterilere gönderebilir,
            veya mağaza banner’a ekleyebilirsiniz.
          </p>
        </div>

        {/* RIGHT BOX */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/10 text-center">
          <h2 className="text-2xl font-semibold mb-4">🖼 QR Kod</h2>

          <img
            src={qrUrl}
            alt="QR Code"
            className="w-64 h-64 mx-auto bg-white rounded-lg shadow-lg p-2 mb-6"
          />

          <button
            onClick={downloadQR}
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold"
          >
            ⬇ QR Kodu İndir
          </button>

          <p className="text-sm opacity-70 mt-4 leading-relaxed">
            Bu QR’ı mağaza sayfanıza, ürün paketlerine, kartvizitlere,
            promosyon broşürlere yerleştirebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
