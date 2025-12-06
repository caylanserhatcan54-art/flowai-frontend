"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) router.push("/login");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white p-12">
      <h1 className="text-4xl font-bold mb-6">🚀 Kuruluma Başla</h1>

      <p className="opacity-90 text-lg max-w-2xl mb-10">
        FlowAI mağaza asistanını aktif etmek için aşağıdaki adımları sırayla uygulayın.
        Kurulum sadece 2–3 dakika sürer.
      </p>

      <div className="space-y-8 max-w-3xl">

        {/* STEP 1 */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/10">
          <h3 className="text-2xl font-semibold mb-2">1️⃣ Chrome Uzantısını İndir</h3>
          <p className="opacity-80 mb-4">
            Ürünleri otomatik çekmek ve mağazanızı yapay zekaya öğretmek için uzantıyı yükleyin.
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            🔽 Chrome Uzantısını İndir
          </button>
        </div>

        {/* STEP 2 */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/10">
          <h3 className="text-2xl font-semibold mb-2">2️⃣ Ürünleri Aktarın</h3>
          <p className="opacity-80 mb-4">
            Uzantı içerisinden “Tüm Ürünlerini Kaydet” butonuna basın.
            Firestore’a aktarım otomatik gerçekleşecek.
          </p>

          <div className="bg-black/50 text-green-400 p-3 rounded">
            Durum: Bekleniyor ⏳
          </div>
        </div>

        {/* STEP 3 */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/10">
          <h3 className="text-2xl font-semibold mb-2">3️⃣ QR & Link Al</h3>
          <p className="opacity-80 mb-4">
            Ürünler yüklendikten sonra mağazan için özel QR kodu ve link oluşacak.
            Müşteriler bu link ile yapay zeka asistanına ulaşabilir.
          </p>

          <button
            onClick={() => router.push("/dashboard/link")}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium"
          >
            🔗 QR & Link Sayfasına Git
          </button>
        </div>

        {/* STEP 4 */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/10">
          <h3 className="text-2xl font-semibold mb-2">4️⃣ Sitenize Koyun</h3>
          <p className="opacity-80">
            Alacağınız linki ürün açıklamanıza veya mağaza banner'ına ekleyin.
            QR kodu mağaza sayfanızda paylaşın.
          </p>
        </div>
      </div>
    </div>
  );
}
