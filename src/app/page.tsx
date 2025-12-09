"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070622] text-white">
      <header className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 px-2 py-1 rounded-md text-xs">AI</span>
          <h1 className="text-xl font-bold">FlowAI</h1>
        </div>

        <nav className="flex gap-8 text-sm opacity-90">
          <Link href="#">Özellikler</Link>
          <Link href="#">Platformlar</Link>
          <Link href="#prices">Fiyatlandırma</Link>
          <Link href="#faq">SSS</Link>
        </nav>

        <div className="flex gap-4 text-sm">
          <Link
            href="/login"
            className="opacity-80 hover:opacity-100 transition"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Kayıt Ol
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="px-10 mt-10 grid grid-cols-2 gap-14">
        <div>
          <div className="border border-green-500 text-green-400 w-fit px-3 py-1 rounded-full text-sm mb-4">
            🌿 Yeni Nesil AI Satış Asistanı
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            FlowAI – Çoklu Platform{" "}
            <span className="text-blue-400">Yapay Zeka Satış Asistanı</span>
          </h2>

          <p className="mt-6 text-lg opacity-90 leading-relaxed">
            Trendyol, Hepsiburada, N11, Amazon TR, Shopier, Shopify, İkas,
            Ideasoft, Çiçeksepeti ve PttAVM ile uyumlu.
            <br />
            <br />
            Mağazana 7/24 çalışan bir yapay zekâ satış temsilcisi ekle;
            müşterileri karşılasın, ürünleri analiz etsin, soruları
            cevaplasın ve sepete yönlendirsin.
            <br />
            <br />
            AI Try-On ile müşteriler fotoğraf yüklesin, ürünleri kendi
            üzerlerinde canlı olarak görsün!
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
            >
              Hemen Başla
            </Link>

            <a
              href="#prices"
              className="border border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 hover:border-blue-600"
            >
              Fiyatları Gör
            </a>
          </div>

          <ul className="mt-6 text-sm opacity-75 space-y-1">
            <li>✔ 10 saniyede embed koduyla kurulum</li>
            <li>✔ Tüm konuşmalar yönetim panelinde kayıt altında</li>
            <li>✔ Tüm büyük pazar yerleriyle uyumlu</li>
          </ul>
        </div>

        {/* CHAT SIMULATION */}
        <div className="bg-[#0f0c38] rounded-2xl border border-[#29245f] p-4 shadow-xl">
          <p className="text-xs text-right opacity-80">7/24 Aktif · AI</p>
          <div className="bg-[#1c1a48] px-3 py-2 rounded-xl w-fit mt-3 text-sm opacity-90">
            Merhaba 👋 Ben FlowAI. Ne tarz bir ürün arıyorsunuz?
          </div>
          <div className="bg-blue-600 px-3 py-2 rounded-xl w-fit ml-auto mt-3 text-sm">
            Günlük kullanıma uygun, kapüşonlu bir sweatshirt arıyorum.
          </div>
          <div className="bg-[#1c1a48] px-3 py-2 rounded-xl w-fit mt-3 text-sm opacity-90">
            Sizin için Trendyol mağazanızdaki 3 ürünü buldum. Ayrıca isterseniz
            fotoğraf yükleyin, üzerinizde nasıl duracağını gösterebilirim. 👚📸
          </div>
          <p className="text-xs text-center opacity-50 mt-4">
            Bu sadece bir ön izleme. Gerçek sohbetleri panelden takip edebilirsiniz.
          </p>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section className="px-10 mt-24">
        <h2 className="text-3xl font-bold mb-6">Desteklenen Platformlar</h2>

        <div className="grid grid-cols-6 gap-6 text-center text-sm font-medium">
          <div className="bg-[#11103a] p-4 rounded-lg border border-[#26235d]">Trendyol</div>
          <div className="bg-[#11103a] p-4 rounded-lg border border-[#26235d]">Hepsiburada</div>
          <div className="bg-[#11103a] p-4 rounded-lg border border-[#26235d]">N11</div>
          <div className="bg-[#11103a] p-4 rounded-lg border border-[#26235d]">Amazon TR</div>
          <div className="bg-[#11103a] p-4 rounded-lg border border-[#26235d]">ÇiçekSepeti</div>
          <div className="bg-[#11103a] p-4 rounded-lg border border-[#26235d]">Shopier</div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="px-10 mt-24">
        <h2 className="text-3xl font-bold mb-10">Paketler ve Fiyatlandırma</h2>

        <div className="grid grid-cols-2 gap-10">

          {/* STANDARD */}
          <div className="bg-[#131139] border border-[#27245d] rounded-xl p-8">
            <p className="text-2xl font-bold">⭐ Standart Plan</p>
            <p className="text-blue-400 text-4xl font-bold mt-3">499 TL / ay</p>

            <ul className="mt-6 space-y-2 text-sm opacity-80">
              <li>✔ Sadece 1 platform entegrasyonu</li>
              <li>✔ AI Chat & Ürün Analizi</li>
              <li>✔ Sepete yönlendirme</li>
              <li>✔ Chrome uzantısı ile ürün içe aktarma</li>
              <li>✔ AI Try-On desteği</li>
            </ul>

            <Link
              href="/register"
              className="block bg-blue-600 hover:bg-blue-700 mt-8 py-3 rounded-lg text-center font-medium"
            >
              Satın Al
            </Link>
          </div>

          {/* PREMIUM */}
          <div className="bg-[#15114f] border border-[#514cff] rounded-xl p-8 shadow-lg shadow-[#3729ff66]">
            <p className="text-2xl font-bold">🔥 Premium Plan</p>
            <p className="text-blue-400 text-4xl font-bold mt-3">899 TL / ay</p>

            <ul className="mt-6 space-y-2 text-sm opacity-80">
              <li>✔ Tüm platform entegrasyonlarını aynı anda kullan</li>
              <li>✔ Çoklu ürün havuzu yönetimi</li>
              <li>✔ Gelişmiş AI Try-On</li>
              <li>✔ Çapraz ürün öneri sistemi</li>
              <li>✔ Gelişmiş satış analizi raporları</li>
              <li>✔ 7/24 AI destek sistemi</li>
            </ul>

            <Link
              href="/register"
              className="block bg-blue-600 hover:bg-blue-700 mt-8 py-3 rounded-lg text-center font-medium"
            >
              Satın Al
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-10 mt-28 pb-28">
        <h2 className="text-3xl font-bold mb-8">Sıkça Sorulan Sorular</h2>

        <div className="space-y-6 text-sm opacity-90 max-w-[850px]">
          <details className="bg-[#0f0c3a] p-4 rounded-lg border border-[#29265f]">
            <summary className="cursor-pointer font-medium">FlowAI mağazama nasıl kurulur?</summary>
            <p className="mt-3">
              Panelden embed kodunu alıp sitene yapıştırman yeterli. Shopify, Trendyol ve Hepsiburada
              için hazır entegrasyonlarımız mevcut.
            </p>
          </details>

          <details className="bg-[#0f0c3a] p-4 rounded-lg border border-[#29265f]">
            <summary className="cursor-pointer font-medium">AI Try-On nasıl çalışıyor?</summary>
            <p className="mt-3">
              Müşteri fotoğrafını yüklediğinde ürün otomatik olarak üzerine yerleştiriliyor.
              Ürün kategorisine göre otomatik hizalama uygulanır.
            </p>
          </details>

          <details className="bg-[#0f0c3a] p-4 rounded-lg border border-[#29265f]">
            <summary className="cursor-pointer font-medium">Premium’a geçince ne değişiyor?</summary>
            <p className="mt-3">
              Tüm platformlara aynı anda bağlanır, geniş ürün veritabanı yönetimi açılır ve raporlama sağlanır.
            </p>
          </details>

          <details className="bg-[#0f0c3a] p-4 rounded-lg border border-[#29265f]">
            <summary className="cursor-pointer font-medium">Geri ödeme var mı?</summary>
            <p className="mt-3">
              Abonelik iptal edildiğinde gelecek döneme dair ücret kesilmez.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
