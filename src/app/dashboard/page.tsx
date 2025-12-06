"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLanding() {
  const router = useRouter();
  const [shopName, setShopName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      setShopName(decoded.shopName || "");
    } catch {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-600 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Merhaba {shopName}! 🎉
        </h1>

        <p className="text-lg opacity-90 max-w-3xl mx-auto">
          FlowAI mağazan için profesyonel bir yapay zeka satış asistanı oluşturdu.
          Müşterilerini karşılar, ürünlerini analiz eder, tarz ve ihtiyaçlara göre
          ürün önerisi sunar ve satışa dönüştürür. Şimdi mağazana özel entegrasyonları
          tamamlayarak başla! 🚀
        </p>

        {/* ÖZELLİKLER */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          
          <div className="bg-white text-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">💬 Akıllı Mağaza Asistanı</h3>
            <p className="text-gray-700 text-sm">
              Müşteriye hoş geldiniz der, sorularını yanıtlar, kampanya veya ürün bilgilendirmesi yapar.
              Tüm cevapları senin mağazana göre optimize eder.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">🛒 Satış Odaklı Öneri Motoru</h3>
            <p className="text-gray-700 text-sm">
              Müşteri niyetini analiz eder, sepete uygun ürün çıkarır ve satışa yönlendirir.
              Daha yüksek dönüşüm sağlanır.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">📷 Try-On Görsel Önizleme (Yakında)</h3>
            <p className="text-gray-700 text-sm">
              Müşteri fotoğraf yükler, ürün üzerinde nasıl duracağını görür.
              Kıyafet, takı ve aksesuar için benzersiz deneyim.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">🤖 Çoklu Platform Desteği</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Aşağıdaki pazar yerlerine özel yapılandırılmıştır:
              <br/><br/>
              ✔ Trendyol<br/>
              ✔ Hepsiburada<br/>
              ✔ Amazon TR<br/>
              ✔ N11<br/>
              ✔ ÇiçekSepeti<br/><br/>
              Ürün açıklamalarını analiz ederek akıllı tekst üretir.
            </p>
          </div>
        </div>

        {/* HAREKET BUTONLARI */}
        <div className="mt-14 flex flex-col gap-4 sm:flex-row justify-center">
          
          <button
            onClick={() => router.push("/settings")}
            className="bg-white hover:bg-gray-200 text-black font-semibold text-lg px-8 py-4 rounded-lg shadow-md"
          >
            🚀 Kuruluma Başla
          </button>

          <button
            onClick={() => router.push("/panel")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md"
          >
            🏪 Mağaza Yönetim Paneli
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("shopToken");
              router.push("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md"
          >
            Çıkış Yap
          </button>

        </div>

        <p className="text-center opacity-70 text-sm mt-12">
          FlowAI © 2025 – Akıllı Ticaretin Yeni Nesli
        </p>

      </div>
    </div>
  );
}
