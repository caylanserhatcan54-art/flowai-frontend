"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LinkPage() {
  const router = useRouter();

  const [shopId, setShopId] = useState<string | null>(null);
  const [shopName, setShopName] = useState("");
  const [active, setActive] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // ABONELİK KONTROLÜ
  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const emailPrefix = decoded.email.split("@")[0];
      setShopId(emailPrefix);
      setShopName(decoded.shopName);

      checkSubscription(emailPrefix);
    } catch {
      router.push("/login");
    }
  }, []);

  async function checkSubscription(id: string) {
    try {
      const res = await fetch(`${BACKEND}/api/shop/${id}`);
      const data = await res.json();

      if (!data.ok) {
        router.push("/dashboard/settings");
        return;
      }

      if (!data.shop.subscriptionActive) {
        setActive(false);
      } else {
        setActive(true);
      }

      setLoading(false);
    } catch (err) {
      router.push("/dashboard/settings");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Yükleniyor...
      </div>
    );
  }

  if (!active) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <h2 className="text-3xl font-bold mb-3">🔒 Link & QR Kilitli</h2>
        <p className="opacity-90 text-lg mb-6">
          Bu bölümü açmak için abonelik satın almalısınız.
        </p>

        <button
          onClick={() => router.push("/dashboard/settings")}
          className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-xl font-medium"
        >
          💳 Ödeme Yap ve Aktifleştir
        </button>
      </div>
    );
  }

  // ABONELİK AKTİFSE BURAYI GÖSTER
  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;
  const aiUrl = `https://flowai.app/${shopId}`;

  async function copyLink() {
    await navigator.clipboard.writeText(aiUrl);
    alert("🔗 Link panoya kopyalandı!");
  }

  function downloadQR() {
    window.open(qrUrl, "_blank");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white p-12">

      <h1 className="text-4xl font-bold mb-2">🔗 AI Link & QR Kod</h1>
      <p className="opacity-80 text-lg mb-8">
        Mağaza müşterileriniz yapay zekaya buradan ulaşabilir 🎯
      </p>

      <div className="grid grid-cols-2 gap-10 max-w-6xl">

        {/* LEFT CARD */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/10 flex flex-col shadow-md">
          <h2 className="text-2xl font-semibold mb-4">📌 Özel AI Link</h2>

          <div className="bg-black/40 px-4 py-3 rounded break-all mb-5 text-lg border border-white/10">
            {aiUrl}
          </div>

          <button
            onClick={copyLink}
            className="bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium text-lg"
          >
            📋 Linki Kopyala
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/10 flex flex-col items-center shadow-md">
          <h2 className="text-2xl font-semibold mb-4">🖼 QR Kod</h2>

          <img
            src={qrUrl}
            alt="QR Code"
            className="w-72 h-72 rounded-lg bg-white p-3 shadow-lg mb-5"
          />

          <button
            onClick={downloadQR}
            className="bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded-lg font-medium text-lg"
          >
            ⬇ QR Kodu İndir
          </button>
        </div>
      </div>

      {/* INFORMATION BOX */}
      <div className="mt-14 bg-white/10 p-8 rounded-xl border border-white/10 shadow-md">
        <h3 className="text-xl font-semibold mb-4">📌 Nereye Koymanız Gerekiyor?</h3>

        <ul className="opacity-95 space-y-2 text-lg">
          <li>✔ Ürün açıklamasına ekleyin</li>
          <li>✔ Mağaza banner bölümüne koyun</li>
          <li>✔ WhatsApp – iletişim linki olarak paylaşın</li>
          <li>✔ Instagram bio / link alanına ekleyin</li>
          <li>✔ Kargo paketleri içine QR kartviziti basın</li>
          <li>✔ Kampanya broşürleri üzerine yapıştırın</li>
        </ul>

        <p className="mt-5 opacity-80">
          Yani; müşterinin görebileceği her yere ekleyin, dönüşüm artacaktır 🚀
        </p>
      </div>
    </div>
  );
}
