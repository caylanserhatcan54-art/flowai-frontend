"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      setShopName(decoded.shopName);
    } catch {
      router.push("/login");
    }
  }, []);

  function logout() {
    localStorage.removeItem("shopToken");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white">
      
      <div className="flex">
        {/* LEFT MENU */}
        <aside className="w-72 h-screen bg-[#11072A] border-r border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-xl mb-6">FlowAI Panel</h2>

          <button
            onClick={() => router.push("/dashboard/install")}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            🚀 Kuruluma Başla
          </button>

          <button
            onClick={() => router.push("/dashboard/qr")}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-medium"
          >
            🔗 QR Kod & Akıllı Link
          </button>

          <button
            onClick={() => router.push("/dashboard/settings")}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-medium"
          >
            🏪 Mağaza Yönetim Paneli
          </button>

          <button
            onClick={logout}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium"
          >
            🚪 Çıkış Yap
          </button>
        </aside>

        {/* RIGHT SIDE CONTENT */}
        <main className="flex-1 p-12">
          <h1 className="text-4xl font-bold mb-2">Merhaba {shopName} 🎉</h1>
          <p className="text-lg opacity-80 mb-12">
            FlowAI mağaza asistanı ile satış gücünü artırmaya hazırsın!
          </p>

          {/* BENIFITS GRID */}
          <div className="grid grid-cols-2 gap-10">

            {/* AI Assistant */}
            <div className="p-8 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-3">💬 Akıllı Mağaza Asistanı</h3>
              <p className="opacity-90 leading-relaxed text-base">
                Müşteriye hoş geldiniz der, ürün detaylarını anlatır,
                beden-kalıp uyumları hakkında konuşur ve güven oluşturur.
                Tarz, konsept ve kullanım amacına göre ürün tavsiyesi yapar.
                Ayrıca mağaza tonunu öğrenir ve aynı marka diliyle konuşur.
                Gerçek mağaza tezgâhtarı gibi davranır.
              </p>
            </div>

            {/* AI SALE BOOST */}
            <div className="p-8 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-3">🛒 Satış Odaklı Öneri Motoru</h3>
              <p className="opacity-90 leading-relaxed text-base">
                Müşteri niyetini analiz eder, sepete uygun ürünleri listeler ve satın almaya yönlendirir.
                Bir kazak sorulduğunda uyumlu pantolon, aksesuar, ayakkabı ve katılım ürünlerini tamamlar.
                Eksik ürün listesi çıkarır (ör. boya yapacak müşteriye fırça-rulo-örtü önerir) ve sepete taşır.
                Gerçek satışçı gibi upsell & cross-sell yapar.
              </p>
            </div>

            {/* MULTI PLATFORM */}
            <div className="p-8 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm col-span-2">
              <h3 className="text-2xl font-semibold mb-3">🌍 Desteklenen Platformlar</h3>

              <div className="grid grid-cols-5 gap-4 text-center mt-4 opacity-90">
                <div>🟣 Trendyol</div>
                <div>🟡 Hepsiburada</div>
                <div>🔴 N11</div>
                <div>🟢 Amazon TR</div>
                <div>🌸 Çiçeksepeti</div>
              </div>

              <p className="mt-4 text-base opacity-80">
                Hepsi tek panelde yönetilir, ürünler otomatik çekilir ve yapay zekanın hafızasına aktarılır.
              </p>
            </div>

            {/* TRY-ON COMING SOON */}
            <div className="col-span-2 p-8 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm text-center">
              <h3 className="text-2xl font-semibold mb-3">🧍‍♀️ Yapay Zeka TRY-ON (Yakında)</h3>
              <p className="opacity-80 leading-relaxed">
                Müşteri görsel yüklediğinde ürünler kendi üzerinde gösterilecek.  
                Ürün deneyimi satışa dönüşecek 🚀
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
