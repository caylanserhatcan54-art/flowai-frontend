"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LinkPage() {
  const router = useRouter();
  const [shopId, setShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [membershipActive, setMembershipActive] = useState(false);

  const [aiUrl, setAiUrl] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  // 1️⃣ localStorage'dan bilgileri oku
  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    const membership = localStorage.getItem("membership");
    const savedShopId = localStorage.getItem("shopId");

    if (!token) {
      router.push("/login");
      return;
    }

    if (membership === "active") {
      setMembershipActive(true);
    }

    if (!savedShopId) {
      setLoading(false);
      return;
    }

    setShopId(savedShopId);
  }, []);

  // 2️⃣ Backend'den URL üret
  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }

    setAiUrl(`https://flowai.app/${shopId}`);
    setQrUrl(`${BACKEND}/api/qr-image/${shopId}`);

    setLoading(false);
  }, [shopId]);

  // 3️⃣ Yükleniyor ekranı
  if (loading) {
    return (
      <div className="text-white text-2xl p-20 text-center">
        ⏳ Yükleniyor...
      </div>
    );
  }

  // 4️⃣ Eğer shop ID bile yoksa
  if (!shopId) {
    return (
      <div className="text-white text-xl p-20 text-center">
        ❌ Mağaza bulunamadı.<br />
        Lütfen önce kayıt olup panelden ürün içe aktarın.
      </div>
    );
  }

  // 5️⃣ Üyelik yoksa kilitli ekran
  if (!membershipActive) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center p-10">
        <div className="bg-white/10 border border-white/30 rounded-xl p-10 max-w-lg text-center space-y-4">
          <h2 className="text-3xl font-bold mb-2">🔒 Erişim Kilitli</h2>
          <p className="opacity-80">
            QR kod ve AI Link sadece aktif aboneliği olan mağazalara açılır.
          </p>

          <button
            onClick={() => router.push("/dashboard/payment")}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg text-lg"
          >
            💳 Üyeliği Aktif Et
          </button>
        </div>
      </div>
    );
  }

  // 6️⃣ NORMAL EKRAN
  async function copyAiUrl() {
    if (!aiUrl) return;
    await navigator.clipboard.writeText(aiUrl);
    alert("🔗 AI Link kopyalandı!");
  }

  return (
    <div className="text-white p-12 min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C]">
      <h1 className="text-4xl font-bold mb-6">🔗 AI Link & QR Kod</h1>
      <p className="opacity-80 text-lg mb-8">
        Bu link ve QR kod müşterilerin yapay zekaya ulaşması için hazır 🎉
      </p>

      <div className="grid grid-cols-2 gap-10">

        {/* SOL TARAF */}
        <div className="bg-white/10 rounded-xl border border-white/20 p-8 flex flex-col">
          <h3 className="text-2xl font-semibold mb-3">🌍 AI Link</h3>

          <div className="bg-black/40 p-3 rounded text-lg break-all mb-4">
            {aiUrl}
          </div>

          <button
            onClick={copyAiUrl}
            className="bg-green-600 hover:bg-green-700 py-3 rounded-lg"
          >
            📋 Linki Kopyala
          </button>
        </div>

        {/* SAĞ TARAF */}
        <div className="bg-white/10 rounded-xl border border-white/20 p-8 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-3">🖼 QR Kod</h3>

          <img
            src={qrUrl!}
            className="w-64 h-64 bg-white rounded-lg p-2 mb-6"
          />

          <a
            href={qrUrl!}
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg"
          >
            ⬇ QR Kod İndir
          </a>
        </div>
      </div>

      <div className="mt-10 bg-white/10 p-8 rounded-xl border border-white/20">
        <h2 className="text-2xl font-semibold mb-4">📍 Nereye koyulur?</h2>

        <ul className="text-lg space-y-2 opacity-90">
          <li>✔ Ürün açıklamasına ekleyin</li>
          <li>✔ Mağaza banner'ına koyun</li>
          <li>✔ WhatsApp butonu altına koyun</li>
          <li>✔ Instagram profiline ekleyin</li>
          <li>✔ Paket üzerine QR baskı alın</li>
          <li>✔ Kartvizit üzerine ekleyin</li>
        </ul>
      </div>
    </div>
  );
}
