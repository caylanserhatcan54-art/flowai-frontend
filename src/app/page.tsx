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
            <a href="#features" className="hover:text-white">
              Özellikler
            </a>
            <a href="#platforms" className="hover:text-white">
              Platformlar
            </a>
            <a href="#pricing" className="hover:text-white">
              Fiyatlandırma
            </a>
            <a href="#faq" className="hover:text-white">
              SSS
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-slate-300 hover:text-white"
            >
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
              Mağazana 7/24 çalışan bir yapay zekâ satış temsilcisi ekle;
              müşterileri karşılasın, ürünleri analiz etsin, soruları yanıtlasın
              ve sepete yönlendirsin.  
              <span className="text-amber-400 font-semibold"> AI Try-On (Yakında!) </span>
              ile ürünü müşterinin üzerine otomatik gösterir.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Hemen Başla
              </Link>
              <a
                href="#pricing"
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                Fiyatları Gör
              </a>
            </div>

            <div className="mt-6 text-xs text-slate-400 space-y-1">
              <p>✅ 10 saniyede embed koduyla kurulum</p>
              <p>✅ Tüm konuşmalar yönetim panelinde kayıt altında</p>
              <p>✅ Tüm büyük pazaryerleriyle uyumlu</p>
            </div>
          </div>

          {/* SAĞ TARAFTAKİ GÖRSEL */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl">
              <span className="text-sm font-semibold text-slate-200">
                FlowAI Canlı Sohbet Önizlemesi
              </span>
              <div className="mt-3 text-xs text-slate-400">
                Örnek müşteri sohbeti...
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PLATFORM SECTION */}
      <section id="platforms" className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Desteklenen Platformlar
        </h2>

        <p className="text-slate-300 text-sm md:text-base mb-6">
          FlowAI şu anda Türkiye’de kullanılan en çok tercih edilen e-ticaret platformları ile entegre çalışmaktadır.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          {["Trendyol", "Hepsiburada", "N11", "Amazon TR", "ÇiçekSepeti"].map(
            (name) => (
              <div
                key={name}
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 flex items-center justify-center text-center text-slate-200"
              >
                {name}
              </div>
            )
          )}
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          FlowAI’nin Özellikleri
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
        
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">🪄 AI Try-On <span className="text-amber-400">(Yakında)</span></h3>
            <p className="text-sm text-slate-300">
              Müşteri kendi fotoğrafını yüklediğinde ürün otomatik olarak görüntüsünün üzerine yerleştirilir.
              Elbise, sweatshirt, çanta, kılıf vb ürünlerde kullanılacaktır.
            </p>
          </div>

        </div>
      </section>

      {/* FİYATLANDIRMA */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Fiyatlandırma (Aylık)</h2>

        <div className="grid md:grid-cols-2 gap-6">
        
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-1">⭐⭐ Standart Plan – 499 TL / ay</h3>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside mb-4">
              <li>Tek platform</li>
              <li>Akıllı AI chatbot</li>
              <li>Ürün tavsiye sistemi</li>
              <li>AI Try-On <span className="text-amber-400">(Yakında)</span></li>
            </ul>
            <Link href="/register" className="rounded-lg bg-blue-500 px-4 py-2 text-center mt-auto font-semibold">
              Başlat
            </Link>
          </div>

          <div className="rounded-2xl border border-yellow-400 bg-slate-900 p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-1">🔥 Premium – 899 TL / ay</h3>
            <ul className="text-sm text-slate-200 space-y-1 list-disc list-inside mb-4">
              <li>Tüm platformlar</li>
              <li>Gelişmiş öneri sistemi</li>
              <li>AI Try-On <span className="text-amber-400">(Yakında)</span></li>
            </ul>
            <Link href="/register" className="rounded-lg bg-yellow-300 px-4 py-2 text-slate-800 text-center mt-auto font-bold">
              Premium Başlat
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Sıkça Sorulan Sorular</h2>

        <div className="space-y-4 text-sm md:text-base">
        
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">❓ Try-On herkes için mi?</p>
            <p className="text-slate-300">
              Evet, özelliğimiz devreye alındığında her müşteri kendi fotoğrafını yükleyerek ürünü üzerinde görebilecek.
              <span className="text-amber-400 font-semibold"> (Yakında!)</span>
            </p>
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FlowAI © {new Date().getFullYear()} – Yapay Zeka Satış Asistanı  
        <br />
        <span className="opacity-70 text-[10px]">flowai.com.tr</span>
      </footer>
    </div>
  );
}
