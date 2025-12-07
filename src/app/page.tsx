"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <header className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <span className="font-semibold text-lg">FlowAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Özellikler</a>
            <a href="#platforms" className="hover:text-white">Platformlar</a>
            <a href="#pricing" className="hover:text-white">Fiyatlandırma</a>
            <a href="#faq" className="hover:text-white">SSS</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-300 hover:text-white">
              Giriş Yap
            </Link>
            <Link href="/register" className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
              Kayıt Ol
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 mb-4">
              🚀 Yeni Nesil AI Satış Asistanı
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              FlowAI – Çoklu Platform
              <span className="text-blue-400"> Yapay Zeka Satış Asistanı</span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
              Trendyol, Hepsiburada, N11, Amazon TR ve ÇiçekSepeti ile uyumlu.
              Mağazana 7/24 çalışan yapay zekâ satış temsilcisi ekle. Müşterileri karşılasın,
              ürünleri analiz etsin, soruları yanıtlasın ve sepete yönlendirsin.
              AI Try-On (Yakında) ile müşterinin fotoğrafı üzerine ürünü otomatik yerleştirir.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
                Hemen Başla
              </Link>
              <a href="#pricing" className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500">
                Fiyatları Gör
              </a>
            </div>

            <div className="mt-6 text-xs text-slate-400 space-y-1">
              <p>✅ 10 saniyede embed koduyla kurulum</p>
              <p>✅ Tüm konuşmalar panelde kayıt altında</p>
              <p>✅ Çoklu platform uyumu</p>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-200">Canlı Sohbet – FlowAI</span>
                <span className="text-[10px] text-emerald-400">7/24 Aktif • AI</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="w-4/5 rounded-xl bg-slate-800 px-3 py-2 text-slate-100">
                  Merhaba 👋 Ben FlowAI. Ne tarz bir ürün arıyorsunuz?
                </div>

                <div className="flex justify-end">
                  <div className="w-3/4 rounded-xl bg-blue-600 px-3 py-2 text-right text-slate-50">
                    Günlük kullanıma uygun bir sweatshirt arıyorum.
                  </div>
                </div>

                <div className="w-4/5 rounded-xl bg-slate-800 px-3 py-2 text-slate-100">
                  Sizin için mağazanızdaki 3 ürünü buldum. Ayrıca isterseniz fotoğraf yükleyin,
                  üzerinizde nasıl duracağını gösterebilirim. 🧠🧥
                </div>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">
                Bu sadece bir önizlemedir. Gerçek sohbetleri panelden takip edebilirsiniz.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PLATFORMLAR */}
      <section id="platforms" className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Desteklenen Platformlar</h2>
        <p className="text-slate-300 text-sm md:text-base mb-6">
          FlowAI Türkiye’deki büyük pazaryerleriyle tam uyumludur.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          {["Trendyol", "Hepsiburada", "N11", "Amazon TR", "ÇiçekSepeti"].map((name) => (
            <div key={name} className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 flex items-center justify-center text-center text-slate-200">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">FlowAI’nin Özellikleri</h2>

        <p className="text-slate-300 text-sm md:text-base mb-8">
          FlowAI, mağazanın satış oranını artırmak için hem analiz hem de müşteri deneyimi odaklı çalışır.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* ÜRÜN ANALİZİ */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🔥 Akıllı Ürün Analizi</h3>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Ürün görsellerinden stil, mevsim ve kullanım alanı çıkarımı</li>
              <li>Benzer ürün önerileri</li>
              <li>Renk, doku, kumaş analizi</li>
            </ul>
          </div>

          {/* CHAT ASİSTANI */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🤝 AI Chat Asistanı</h3>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Müşteriyi karşılar ve yönlendirir</li>
              <li>Beden & ölçü önerisi</li>
              <li>Kargo, iade, teslimat bilgisi</li>
              <li>Kampanya duyuruları</li>
            </ul>
          </div>

          {/* NİYET ANALİZİ */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🧠 Niyet & Duygu Analizi</h3>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Kararsız müşteriyi ikna edici öneriler</li>
              <li>Fiyat odaklı müşteriye uygun alternatifler</li>
              <li>Satın alma niyeti olan kullanıcıyı sepete yönlendirme</li>
            </ul>
          </div>

          {/* TRY-ON */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🪄 AI Try-On (Yakında)</h3>
            <p className="text-sm text-slate-300 mb-2">Müşteri fotoğraf yüklediğinde:</p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Ürünü otomatik olarak görüntü üzerine yerleştirir</li>
              <li>Tişört, elbise, sweatshirt uyumu gösterilir</li>
              <li>Telefon kılıfı modeli telefona göre konumlandırılır</li>
            </ul>
          </div>

          {/* CHROME EXTENSION */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🧩 Chrome Uzantısı</h3>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Tek tıkla ürünleri Firestore’a aktarır</li>
              <li>Fotoğraf, fiyat, varyant, renk otomatik çekilir</li>
            </ul>
          </div>

          {/* PLATFORM ENTEGRASYONU */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🔗 Çoklu Platform Entegrasyonu</h3>
            <p className="text-sm text-slate-300">
              FlowAI aynı anda tüm platformlarda çalışabilir:
            </p>
            <ul className="text-sm text-slate-300 list-disc list-inside mt-2">
              <li>Trendyol</li>
              <li>Hepsiburada</li>
              <li>N11</li>
              <li>Amazon TR</li>
              <li>ÇiçekSepeti</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FİYATLANDIRMA */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Fiyatlandırma (Aylık)</h2>

        <p className="text-slate-300 text-sm md:text-base mb-8">
          Aşağıdan ihtiyacına uygun planı seçebilirsin. Aboneliğini istediğin zaman değiştirebilirsin.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Standart Plan */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-1">⭐ Standart Plan – 499 TL / ay</h3>
            <p className="text-sm text-slate-300 mb-4">
              Sadece 1 adet e-ticaret platformu için kullanım hakkı.
            </p>

            <ul className="text-sm text-slate-300 list-disc list-inside space-y-1 mb-4">
              <li>1 platform entegrasyonu</li>
              <li>AI Chat Asistanı</li>
              <li>Akıllı Ürün Analizi</li>
              <li>Sepet önerileri</li>
              <li>Chrome ürün içe aktarma</li>
              <li>AI Try-On (Yakında)</li>
            </ul>

            <div className="mt-auto">
              <Link href="/register" className="w-full inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
                Standart Planı Kullan
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="rounded-2xl border border-yellow-400/40 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs text-yellow-300 mb-2">
              <span className="px-2 py-0.5 rounded-full border border-yellow-400/40">En Popüler</span>
            </div>

            <h3 className="text-xl font-semibold mb-1">🔥 Premium Plan – 899 TL / ay</h3>

            <p className="text-sm text-slate-200 mb-4">
              Tüm e-ticaret platformlarını aynı anda kullanabilirsin.
            </p>

            <ul className="text-sm text-slate-100 list-disc list-inside space-y-1 mb-4">
              <li>Tüm platform entegrasyonları</li>
              <li>Çoklu ürün havuzu</li>
              <li>Gelişmiş AI Try-On (Yakında)</li>
              <li>Çapraz platform önerileri</li>
              <li>7/24 AI destek sistemi</li>
              <li>Gelişmiş satış analizleri</li>
            </ul>

            <div className="mt-auto">
              <Link href="/register" className="w-full inline-flex items-center justify-center rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-yellow-300">
                Premium Planı Kullan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SSS – Sıkça Sorulan Sorular */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Sıkça Sorulan Sorular</h2>

        <div className="space-y-4 text-sm md:text-base">

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">❓ FlowAI nasıl çalışıyor?</p>
            <p className="text-slate-300">
              FlowAI, mağaza ürünlerini analiz eder ve müşterilerle canlı sohbet ederek yönlendirme yapar.
              Sepete yönlendirme, soru cevaplama, ürün önerisi ve analiz gibi işlemleri otomatik gerçekleştirir.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">❓ QR Kod & Link nereye eklenebilir?</p>
            <p className="text-slate-300">
              Ürün açıklamalarına, mağaza banner’ına, WhatsApp profilinize, Instagram bio’ya ve paket gönderim kartlarına
              QR kodu ekleyebilirsiniz. Müşteriler direkt AI asistana ulaşır.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">❓ Chrome uzantısı ne işe yarar?</p>
            <p className="text-slate-300">
              Tek tıkla mağaza sayfanızdaki tüm ürünleri Firestore’a aktarır. Başlık, görsel, fiyat, varyant gibi tüm bilgiler otomatik eklenir.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">❓ Try-On özelliği ne zaman gelir?</p>
            <p className="text-slate-300">
              Try-On özelliği şu anda geliştirme aşamasındadır. Yakında Premium ve Standart plan kullanıcıları için aktif olacaktır.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">❓ Ödemeleri nasıl yapacağım?</p>
            <p className="text-slate-300">
              Üyeliğinizi Stripe/İyzico ile güvenli şekilde ödeyebilirsiniz. 7 gün içinde koşulsuz iptal garantisi vardır.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FlowAI © {new Date().getFullYear()} – Yapay Zeka Satış Asistanı
      </footer>
    </div>
  );
}
