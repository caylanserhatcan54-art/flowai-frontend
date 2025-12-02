// src/app/page.tsx
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
              Trendyol, Hepsiburada, N11, Amazon TR, Shopier, Shopify, İkas,
              Ideasoft, ÇiçekSepeti ve PttAVM ile uyumlu. Mağazana 7/24 çalışan
              bir yapay zekâ satış temsilcisi ekle; müşterileri karşılasın,
              ürünleri analiz etsin, soruları yanıtlasın ve sepete yönlendirsin.
              Fotoğraf yükleyen müşteriler için AI Try-On ile ürünü müşterinin
              üzerine otomatik yerleştirir.
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

          {/* RIGHT – simple mockup */}
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
                    Günlük kullanıma uygun, kapüşonlu bir sweatshirt arıyorum.
                  </div>
                </div>
                <div className="w-4/5 rounded-xl bg-slate-800 px-3 py-2 text-slate-100">
                  Sizin için Trendyol mağazanızdaki 3 ürünü buldum. Ayrıca
                  isterseniz fotoğraf yükleyin, üzerinizde nasıl duracağını
                  gösterebilirim. 🧠🧥
                </div>
              </div>
              <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">
                Bu sadece bir önizlemedir. Gerçek sohbetleri panelden takip
                edebilirsiniz.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PLATFORMLAR */}
      <section
        id="platforms"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Desteklenen Platformlar
        </h2>
        <p className="text-slate-300 text-sm md:text-base mb-6">
          FlowAI şu anda Türkiye’de kullanılan tüm büyük e-ticaret altyapıları
          ile tam uyumlu çalışır.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          {[
            "Trendyol",
            "Hepsiburada",
            "N11",
            "Amazon TR",
            "Shopier",
            "Shopify",
            "İkas",
            "Ideasoft",
            "ÇiçekSepeti",
            "PttAVM",
          ].map((name) => (
            <div
              key={name}
              className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 flex items-center justify-center text-center text-slate-200"
            >
              {name}
            </div>
          ))}
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
        <p className="text-slate-300 text-sm md:text-base mb-8">
          2025 versiyonu ile tamamen yenilendi. Hem ürün analizi, hem de
          müşteri deneyimi için uçtan uca AI altyapısı.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">
              🔥 Akıllı Ürün Analizi
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              FlowAI ürün fotoğraflarını analiz ederek:
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Renk, stil, cinsiyet ve kullanım alanını algılar</li>
              <li>Mevsim ve kombin önerileri üretir</li>
              <li>Alternatif ürünler sunar</li>
            </ul>
          </div>

          {/* 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">
              🤝 Müşteri Karşılama & Chat Asistanı
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              Müşterinin tüm sorularına yanıt verir:
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>“Bu ürün kalın mı? Mevsimlik mi?”</li>
              <li>“Bana uygun beden hangisi?”</li>
              <li>“Kargo ne zaman gelir?”</li>
              <li>İade, kargo, stok, kampanya vb. sorular</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">
              🧠 Duygu & Niyet Analizi
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              FlowAI mesaj tonunu analiz ederek:
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Kararsız müşteriye ikna edici öneriler sunar</li>
              <li>Fiyat odaklı müşteriye uygun alternatif listeler</li>
              <li>Şikayet durumunda sorunu yumuşatır</li>
              <li>Alım niyeti olanı sepete ve satın almaya yönlendirir</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">
              🪄 AI Try-On (Fotoğrafa Ürün Giydirme)
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              Müşteri kendi fotoğrafını yüklediğinde:
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Elbiseyi müşterinin üzerine yerleştirir</li>
              <li>Tişört / sweatshirt otomatik giydirilir</li>
              <li>Çantayı elde veya omuzda gösterir</li>
              <li>Telefon kılıfını müşterinin telefonuna göre gösterir</li>
            </ul>
            <p className="text-xs text-emerald-300 mt-2">
              Bu özellik, dönüşüm oranlarını ciddi şekilde artırmak için
              tasarlandı.
            </p>
          </div>

          {/* 5 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">
              🔗 Çoklu Platform Entegrasyonu
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              Mağaza sahibi FlowAI’yi:
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Trendyol</li>
              <li>Hepsiburada</li>
              <li>Amazon TR</li>
              <li>Shopier, Shopify, İkas, Ideasoft, ÇiçekSepeti, PttAVM</li>
            </ul>
            <p className="text-sm text-slate-300 mt-1">
              gibi platformların her birine bağımsız veya birlikte kurabilir.
            </p>
          </div>

          {/* 6 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="font-semibold text-lg mb-2">
              🧩 Otomatik Ürün Toplama (Chrome Uzantısı)
            </h3>
            <p className="text-sm text-slate-300 mb-2">
              Tek tıkla ürünleri paneline aktar:
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li>Görsel, başlık, fiyat, varyantlar</li>
              <li>Renkler ve ürün linki</li>
              <li>Tüm veriler Firestore’da saklanır</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Fiyatlandırma (Aylık)
        </h2>
        <p className="text-slate-300 text-sm md:text-base mb-8">
          Tüm planlar aylık abonelik şeklinde çalışır. İstediğin zaman
          yükseltebilir veya durdurabilirsin.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-1">
              ⭐ Standart Plan – 499 TL / ay
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Sadece 1 e-ticaret platformu seçebilirsin (örneğin sadece
              Trendyol, sadece Hepsiburada veya sadece Shopier gibi).
            </p>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside mb-4">
              <li>Tek platformda kullanım</li>
              <li>AI Chat & Ürün Analizi</li>
              <li>Sepete yönlendirme</li>
              <li>Chrome uzantısı ile ürün içe aktarma</li>
              <li>AI Try-On desteği</li>
              <li>Tek platform ürün öneri sistemi</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Standart Planı Kullan
              </Link>
            </div>
          </div>

          {/* Premium */}
          <div className="rounded-2xl border border-yellow-400/40 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs text-yellow-300 mb-2">
              <span className="px-2 py-0.5 rounded-full border border-yellow-400/40">
                En Popüler
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-1">
              🔥 Premium Plan – 899 TL / ay
            </h3>
            <p className="text-sm text-slate-200 mb-4">
              Tüm platformları aynı anda kullan. Aynı mağaza hem Trendyol’da hem
              Hepsiburada’da hem de Shopify’da FlowAI ile çalışabilir.
            </p>
            <ul className="text-sm text-slate-100 space-y-1 list-disc list-inside mb-4">
              <li>Tüm platform entegrasyonları</li>
              <li>Çoklu platform ürün havuzu</li>
              <li>AI Try-On (Gelişmiş)</li>
              <li>Çapraz öneri desteği (isteğe göre açılır)</li>
              <li>Gelişmiş satış analizi ve raporlar</li>
              <li>7/24 AI destek sistemi</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-yellow-300"
              >
                Premium Planı Kullan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14 border-t border-slate-800"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Sıkça Sorulan Sorular
        </h2>
        <p className="text-slate-300 text-sm md:text-base mb-6">
          Aklına takılan sorular varsa aşağıda en çok merak edilenleri
          listeledik.
        </p>

        <div className="space-y-4 text-sm md:text-base">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">
              ❓ FlowAI hangi platformlarda çalışıyor?
            </p>
            <p className="text-slate-300">
              Trendyol, Hepsiburada, N11, Amazon TR, Shopier, Shopify, İkas,
              Ideasoft, ÇiçekSepeti ve PttAVM ile uyumludur.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">
              ❓ Ürünler mağazadan nasıl çekiliyor?
            </p>
            <p className="text-slate-300">
              Chrome uzantısı ile mağaza sayfanı açıp “Ürünleri Tara” butonuna
              basman yeterli. Tüm ürünler otomatik olarak FlowAI paneline
              aktarılır.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">
              ❓ Try-On özelliği tüm müşteriler için mi?
            </p>
            <p className="text-slate-300">
              Evet, fotoğraf yükleyen her müşteri için ürün otomatik olarak
              görüntünün üzerine yerleştirilir. Elbise, üst giyim, çanta,
              telefon kılıfı gibi ürünler için uygundur.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">
              ❓ Standart ve Premium arasındaki temel fark nedir?
            </p>
            <p className="text-slate-300">
              Standart planda sadece 1 platform seçebilirsin. Premium planda ise
              tüm platformları aynı anda kullanabilir, aynı mağaza için birden
              fazla kanal açabilirsin.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">
              ❓ Kurulum için teknik bilgi gerekiyor mu?
            </p>
            <p className="text-slate-300">
              Hayır. Panelden aldığın embed kodunu mağaza tarafına eklemen
              yeterli. 10 saniyelik bir işlem.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">
              ❓ Ödemeler nasıl alınıyor?
            </p>
            <p className="text-slate-300">
              Aylık abonelik şeklinde çalışır. Standart: 499 TL/ay, Premium: 899
              TL/ay. İstediğin zaman planını değiştirebilirsin.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FlowAI © {new Date().getFullYear()} – Yapay Zeka Satış Asistanı
      </footer>
    </div>
  );
}
