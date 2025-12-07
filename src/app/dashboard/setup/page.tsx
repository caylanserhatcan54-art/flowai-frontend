"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
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
      setShopId(decoded.email.split("@")[0]); // emailden shopId
      setShopName(decoded.shopName);
    } catch {
      router.push("/login");
    }
  }, []);

  if (!shopId) {
    return <div className="text-white p-10">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white px-12 py-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-3">🚀 Mağaza Kurulum Rehberi</h1>
      <p className="opacity-80 text-lg mb-12">
        FlowAI asistanını mağazanızda aktif etmek için aşağıdaki adımları takip edin.
      </p>

      {/* STEPS GRID */}
      <div className="grid grid-cols-1 gap-10 max-w-6xl">

        {/* STEP 1 */}
        <div className="bg-white/10 p-8 rounded-xl shadow border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">1️⃣ Chrome Uzantısını Kur</h2>

          <p className="text-lg opacity-90 leading-relaxed mb-6">
            FlowAI Chrome eklentisi mağazanızdaki ürünleri otomatik olarak Firestore’a kaydeder.
            Bu ürünler yapay zekanın hafızası olur.
          </p>

          <button
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-medium text-xl"
          >
            📦 Chrome Uzantısını İndir
          </button>

          <p className="opacity-60 text-sm mt-3">
            (Kurulumdan sonra Trendyol / Hepsiburada paneline giriş yapın)
          </p>
        </div>

        {/* STEP 2 */}
        <div className="bg-white/10 p-8 rounded-xl shadow border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">2️⃣ Ürünleri Firestore'a Aktar</h2>

          <p className="text-lg opacity-90">
            Uzantıya girdikten sonra
            <b className="text-green-400"> "Ürünleri Aktar"</b> butonuna basın.
          </p>

          <ul className="mt-4 text-lg opacity-90 space-y-2">
            <li>✔ Ürün başlığı</li>
            <li>✔ Fiyat</li>
            <li>✔ Görseller</li>
            <li>✔ Teknik özellikler</li>
            <li>✔ Varyantlar</li>
          </ul>

          <p className="text-lg mt-6 opacity-80">
            FlowAI bunları hafızaya alır ve müşteriye özel önerilerde kullanır.
          </p>

        </div>

        {/* STEP 3 */}
        <div className="bg-white/10 p-8 rounded-xl shadow border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">3️⃣ Mağaza Link ve QR Kodunu Al</h2>
          
          <p className="text-lg opacity-90 mb-6">
            Bu link müşterilerin mağazanız için açılan yapay zeka asistanına bağlanmasını sağlar.
          </p>

          <button
            onClick={() => router.push("/dashboard/link")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium text-xl"
          >
            🔗 Link & QR Kod Sayfasına Git
          </button>
        </div>

        {/* STEP 4 */}
        <div className="bg-white/10 p-8 rounded-xl shadow border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">4️⃣ Mağazanıza Ekleyin</h2>
          
          <p className="text-lg opacity-90 mb-4">
            FlowAI linki ve QR kodunu aşağıdaki yerlere koyun:
          </p>

          <ul className="text-lg opacity-95 space-y-2 mb-6">
            <li>✔ Ürün açıklamasına</li>
            <li>✔ Mağaza bannerına</li>
            <li>✔ Whatsapp iletişim satırına</li>
            <li>✔ Instagram bio alanına</li>
            <li>✔ Kargo kutusuna QR sticker olarak</li>
          </ul>

          <p className="opacity-70 text-sm">
            (Bu görünürlük, dönüşüm oranlarınızı ciddi artırır 🚀)
          </p>
        </div>

        {/* STEP 5 */}
        <div className="bg-white/10 p-8 rounded-xl shadow border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">5️⃣ Müşterileriniz Konuşmaya Başlasın 🎉</h2>
          
          <p className="text-lg opacity-90">
            Müşteriler ürünle ilgili soru sorar,
            FlowAI ürünleri hafızadan tarar
            ve satış odaklı şekilde yönlendirir.
          </p>

          <ul className="text-lg mt-4 opacity-90 space-y-2">
            <li>💬 Boy, ölçü, kalıp</li>
            <li>🧵 Kumaş & kalite bilgisi</li>
            <li>👗 Stil kombin önerisi</li>
            <li>🛒 Sepet tamamlama</li>
          </ul>

          <p className="opacity-70 text-sm mt-5">
            Ve bu süreçte siz hiçbir şey yapmazsınız. Asistan çalışır 💰
          </p>
        </div>

      </div>

      <div className="py-16 text-center text-lg opacity-90">
        🧡 FlowAI ile mağazanız şimdi daha güçlü.  
      </div>

    </div>
  );
}
