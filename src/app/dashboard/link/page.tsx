"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";
// 🔥 Şimdilik Vercel domainini kullanıyoruz.
// İleride flowai.app bu projeye bağlanınca bunu https://flowai.app/ai/${shopId} yaparız.
const PUBLIC_FRONTEND = "https://ai-shop-site.vercel.app";

export default function LinkPage() {
  const router = useRouter();
  const [shopId, setShopId] = useState<string>("");
  const [shopName, setShopName] = useState("");
  const [membership, setMembership] = useState<"active" | "none">("none");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const m = localStorage.getItem("membership");
    setMembership(m === "active" ? "active" : "none");

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const extractedShopId = decoded.email.split("@")[0];

      setShopName(decoded.shopName || extractedShopId);
      setShopId(extractedShopId);

      // 🔐 Public AI sayfası için kaydediyoruz
      localStorage.setItem("shopId", extractedShopId);
    } catch {
      router.push("/login");
    }
  }, [router]);

  // Üyelik yoksa kilitli ekran
  if (membership !== "active") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F2B] to-[#1C034D] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/10 border border-white/15 rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">🔒 QR & Link Kilitli</h1>
          <p className="text-sm opacity-80 mb-6">
            QR kod ve mağazana özel yapay zeka linki, üyelik aktif olduktan sonra açılacaktır.
          </p>
          <button
            onClick={() => router.push("/dashboard/payment")}
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg font-semibold"
          >
            💳 Üyeliği Aktif Et
          </button>
          <p className="text-[11px] opacity-60 mt-3">
            Ödeme sonrası bu sayfayı yenileyerek QR ve linklerini görebilirsin.
          </p>
        </div>
      </div>
    );
  }

  if (!shopId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        🔄 Yükleniyor...
      </div>
    );
  }

  const aiUrl = `${PUBLIC_FRONTEND}/ai/${shopId}`;
  const qrUrl = `${BACKEND}/api/qr-image/${shopId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(aiUrl);
    alert("🔗 Link kopyalandı!");
  };

  const downloadQR = () => {
    window.open(qrUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F2B] to-[#1C034D] text-white p-10">
      <h1 className="text-3xl font-bold mb-2">🔗 AI Link & QR Kod</h1>
      <p className="opacity-80 mb-8">
        {shopName} mağazası için yapay zekâ asistanı bağlantısı hazır.  
        Müşterilerin bu link veya QR ile doğrudan FlowAI asistanına ulaşacak.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">

        {/* SOL: Link */}
        <div className="bg-white/10 border border-white/15 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">📌 Mağazanıza Özel AI Link</h2>
          <div className="bg-black/40 rounded-lg px-4 py-3 text-sm md:text-base break-all mb-4 border border-white/15">
            {aiUrl}
          </div>
          <button
            onClick={copyLink}
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg font-semibold"
          >
            📋 Linki Kopyala
          </button>

          <div className="mt-6 text-sm opacity-85 space-y-1">
            <p>✔ Ürün açıklamalarına ekleyin</p>
            <p>✔ Mağaza banner’ına koyun</p>
            <p>✔ WhatsApp profil metnine yazın</p>
            <p>✔ Instagram bio veya story swipe-up linki yapın</p>
            <p>✔ Müşteriye DM / mesaj ile gönderin</p>
          </div>
        </div>

        {/* SAĞ: QR */}
        <div className="bg-white/10 border border-white/15 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">🖼 QR Kod</h2>

          <img
            src={qrUrl}
            alt="QR Code"
            className="w-64 h-64 mx-auto bg-white rounded-lg shadow-lg p-3 mb-6"
          />

          <button
            onClick={downloadQR}
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold"
          >
            ⬇ QR Kodu İndir
          </button>

          <div className="mt-6 text-sm opacity-85 space-y-1">
            <p>✔ Ürün görsellerinin arasına ekleyin</p>
            <p>✔ Paket üstüne QR etiketi basın</p>
            <p>✔ Kartvizit ve promosyon broşürlerine koyun</p>
            <p>✔ Mağaza kapak görseline veya banner’a yerleştirin</p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 max-w-4xl">
        <h3 className="text-lg font-semibold mb-3">📌 Önerilen Kullanım</h3>
        <ul className="list-disc list-inside text-sm opacity-85 space-y-1">
          <li>
            <b>QR kodu ürün görsellerine</b> ekleyerek “Ürün hakkında soru sor / kombin iste” şeklinde kullanabilirsin.
          </li>
          <li>
            <b>Linki ürün açıklamasına</b> koyarak, “Bu ürün hakkında soru sormak için tıklayın” notu ekleyebilirsin.
          </li>
          <li>
            <b>Instagram ve WhatsApp’ta</b> sabit link yaparak “Mağaza asistanı ile sohbet et” şeklinde kullanabilirsin.
          </li>
        </ul>
      </div>
    </div>
  );
}
