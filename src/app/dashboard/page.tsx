export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center pt-24 pb-32 px-6 bg-gradient-to-b from-white to-gray-100">
        <h2 className="text-4xl sm:text-5xl font-bold max-w-3xl leading-tight">
          FlowAI – Mağazanız İçin Yapay Zeka Satış Asistanı
        </h2>

        <p className="text-gray-600 mt-4 text-lg max-w-2xl">
          Shopier ✔ (Shopify, Trendyol, İkas ve Hepsiburada yakında)
          <br />
          Mağazanıza özel yapay zeka tezgahtar ekleyin. Müşterileri karşılar,
          ürünü analiz eder, duygularını anlar, öneri yapar ve satışlarınızı artırır.
        </p>

        <a
          href="/register"
          className="mt-8 px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
        >
          Hemen Kullanmayı Başla
        </a>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-10 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center">Özellikler</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 max-w-6xl mx-auto">
          <div className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold mb-3">Yapay Zeka Sohbet Asistanı</h4>
            <p className="text-gray-600">
              Müşterileri karşılar, soruları yanıtlar, tarzını anlar ve doğru ürünlere yönlendirir.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold mb-3">Akıllı Ürün Önerileri</h4>
            <p className="text-gray-600">
              Müşterinin ihtiyacına, duygusuna, tarzına ve bütçesine göre öneriler sunar.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold mb-3">Profesyonel Ürün Açıklamaları</h4>
            <p className="text-gray-600">
              Ürünlerinizi analiz eder ve otomatik SEO uyumlu açıklamalar oluşturur.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-10 py-20 bg-gray-100">
        <h3 className="text-3xl font-bold text-center">Fiyatlandırma</h3>

        <div className="flex justify-center mt-12 max-w-4xl mx-auto">
          <div className="p-10 bg-white rounded-xl shadow-md text-center border-2 border-blue-600 w-full sm:w-96">
            <h4 className="text-2xl font-bold mb-3 text-blue-600">Standart Paket</h4>

            <p className="text-5xl font-bold">499₺<span className="text-lg text-gray-500">/ay</span></p>

            <ul className="text-gray-600 mt-6 space-y-2 text-left text-sm">
              <li>• 1 Mağaza Bağlantısı</li>
              <li>• Yapay Zeka Müşteri Asistanı</li>
              <li>• Ürün Öneri Motoru</li>
              <li>• Kombin & Stil Önerileri</li>
              <li>• Müşteri Duygu Analizi</li>
              <li>• Profesyonel Ürün Açıklamaları</li>
              <li>• Sınırsız Sohbet</li>
              <li>• Chat Widget Entegrasyonu</li>
              <li>• Admin Panel + Analitik</li>
            </ul>

            <a
              href="/register"
              className="mt-8 inline-block px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
            >
              Hemen Başla
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="px-10 py-20 bg-white border-t border-gray-200">
        <h3 className="text-3xl font-bold text-center">Sıkça Sorulan Sorular</h3>

        <div className="max-w-3xl mx-auto mt-10 space-y-6 text-gray-700">
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">
              FlowAI mağazamda nasıl çalışıyor?
            </summary>
            <p className="mt-2 text-sm">
              Hazır bir kodu mağazana ekliyorsun ve FlowAI müşterilerle sohbet etmeye başlıyor.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">
              Shopier entegrasyonu nasıl?
            </summary>
            <p className="mt-2 text-sm">
              FlowAI ürünlerini otomatik çekiyor ve önerilerde kullanıyor.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">
              İade garantisi gerçekten 7 gün mü?
            </summary>
            <p className="mt-2 text-sm">Evet, memnun kalmazsan koşulsuz iade sağlıyoruz.</p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">
              Kaç mağaza bağlayabilirim?
            </summary>
            <p className="mt-2 text-sm">
              Standart paket 1 mağaza içindir. Çoklu mağaza desteği yakında.
            </p>
          </details>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-14 text-center">
        <p className="text-lg font-semibold">FlowAI © 2025</p>
        <p className="text-gray-400 mt-2">Tüm Hakları Saklıdır.</p>
      </footer>
    </main>
  );
}
