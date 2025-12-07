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
            <Link
              href="/register"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
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
              FlowAI, mağazana 7/24 çalışan bir yapay zekâ satış temsilcisi sağlar.
              Müşteriyi karşılar, ürün detaylarını anlatır, beden ve uyum bilgisi verir,
              güven oluşturur ve sepete yönlendirir. Yakında TRY-ON ile müşteri kendi
              fotoğrafını yükleyip ürünü üzerinde görebilecek 🤖🛍️.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
                Hemen Başla
              </Link>

              <a href="#pricing" className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500">
                Fiyatları Gör
              </a>
            </div>
          </div>

          {/* RIGHT – CHAT MOCKUP */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-200">
                  Canlı Sohbet – FlowAI
                </span>
                <span className="text-[10px] text-emerald-400">
                  7/24 Aktif • AI
                </span>
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
                  Sizin için Trendyol mağazanızdaki 3 ürünü buldum. Ayrıca dilerseniz
                  fotoğraf yükleyin üzerinizde nasıl duracağını gösterebilirim 🧠🧥
                </div>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">
                Bu bir önizlemedir. Gerçek konuşmalar panelinizde görüntülenebilir.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-800">
        <h2 className="text-3xl font-bold mb-4">Sıkça Sorulan Sorular</h2>

        <div className="space-y-5 text-sm">
          <FAQItem
            q="FlowAI nasıl çalışır?"
            a="Mağazanızı Chrome uzantısıyla tarayıp ürünleri içeri aktarıyorsunuz. Sonrasında müşteriler QR kod veya özel link ile chatbot’a bağlanıyor. AI tüm cevapları ürünleriniz üzerinden verir."
          />

          <FAQItem
            q="QR ve bağlantı linki nereye eklenebilir?"
            a="Ürün açıklamasına, mağaza banner’ına, sosyal medya linklerinize, WhatsApp kanallarınıza ve paket içi kartvizitlere ekleyebilirsiniz."
          />

          <FAQItem
            q="Chrome uzantısı ne işe yarar?"
            a="Mağaza sayfanızı açıp ‘Ürünleri Tara’ diyerek ürün başlıklarını, görsellerini, fiyatını ve varyant bilgilerini Firestore’a aktarır."
          />

          <FAQItem
            q="Ürünler değişirse otomatik güncellenir mi?"
            a="Şu an için manuel güncelleme ile ekleniyor, yakında tam otomatik güncelleme desteği eklenecek."
          />

          <FAQItem
            q="AI Try-On çalışıyor mu?"
            a="Yakında aktif olacak 🎉 Müşteri kendi fotoğrafını yükleyip ürünü üzerinde görebilecek."
          />
        </div>
      </section>


      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FlowAI © {new Date().getFullYear()} — Yapay Zeka Satış Asistanı
      </footer>
    </div>
  );
}


// FAQ item component
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
      <p className="font-semibold">{q}</p>
      <p className="text-slate-300 mt-1">{a}</p>
    </div>
  );
}
