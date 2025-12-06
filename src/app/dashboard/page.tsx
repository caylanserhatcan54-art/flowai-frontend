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
        
        {/* SOL MENÜ */}
        <aside className="w-72 h-screen bg-[#11072A] border-r border-white/10 p-6 space-y-4 sticky top-0">
          <h2 className="font-extrabold text-2xl mb-6 text-white tracking-wide">FlowAI Panel</h2>

          <button
            onClick={() => router.push("/dashboard/setup")}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            ⚡ Kuruluma Başla
          </button>

          <button
            onClick={() => router.push("/dashboard/link")}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold"
          >
            🔗 QR Kod & Akıllı Link
          </button>

          <button
            onClick={() => router.push("/dashboard/settings")}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold"
          >
            🏪 Mağaza Yönetim Paneli
          </button>

          <button
            onClick={logout}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            🚪 Çıkış Yap
          </button>
        </aside>

        {/* ANA SAYFA İÇERİĞİ */}
        <main className="flex-1 p-12">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Merhaba {shopName} 🎉
          </h1>
          <p className="text-lg text-gray-300 mb-10">
            FlowAI mağaza asistanı ile satış gücünü artırmaya hazırsın!
          </p>

          {/* BİLGİ KARTLARI */}
          <div className="grid grid-cols-2 gap-10">

            <div className="p-8 bg-white/10 rounded-xl border border-white/20 shadow-lg backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4">💬 Akıllı Mağaza Asistanı</h3>
              <p className="opacity-90 leading-relaxed text-base">
                Müşteriyi karşılar, ürün detaylarını anlatır, beden uyumu hakkında bilgi verir,
                kampanya veya ek ürün önerisi yapar, marka tonunla konuşur.
                Tarz–konsept–kullanım amacına göre ürün tavsiyesi yapar.
                Gerçek mağaza tezgâhtarı gibi davranır ve ürün satışı odaklı yönlendirir.
              </p>
            </div>

            <div className="p-8 bg-white/10 rounded-xl border border-white/20 shadow-lg backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4">🛒 Satış Odaklı Öneri Motoru</h3>
              <p className="opacity-90 leading-relaxed text-base">
                Müşteri niyetini analiz eder, sepete uygun ürün listesi çıkarır.
                Kazak isteyen müşteriye uyumlu pantolon–çanta–aksesuar önerir.
                Boya yapacak müşteriye eksik malzeme listesi çıkarır (rulo, örtü, bant).
                Cross-sell & upsell yapar ve alışveriş sepetine yönlendirir.
              </p>
            </div>

            <div className="col-span-2 p-8 bg-white/10 rounded-xl border border-white/20 shadow-lg backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4">🌍 Desteklenen Platformlar</h3>

              <div className="grid grid-cols-5 gap-6 text-center mt-4 text-lg font-medium opacity-90">
                <div>🟣 Trendyol</div>
                <div>🟡 Hepsiburada</div>
                <div>🔴 N11</div>
                <div>🟢 Amazon TR</div>
                <div>🌸 Çiçeksepeti</div>
              </div>

              <p className="mt-4 opacity-80">
                Ürünler otomatik aktarılır, tek panelde yönetilir ve yapay zeka hafızasına alınır.
              </p>
            </div>

            <div className="col-span-2 p-8 bg-white/10 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-center">
              <h3 className="text-2xl font-semibold mb-3">🧍‍♀️ Yapay Zeka TRY-ON (Yakında)</h3>
              <p className="opacity-85">
                Müşteri fotoğraf yüklediğinde ürün kendi üzerinde gösterilecek.
                Gerçek deneyimi → satın alıma çevirecek 🚀
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
