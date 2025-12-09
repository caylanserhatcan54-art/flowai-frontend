// app/billing/page.tsx
"use client";

import DashboardShell from "@/components/DashboardShell";

export default function BillingPage() {
  const plans = [
    {
      name: "⭐ Standart Plan",
      price: "499 TL / ay",
      highlight: false,
      badge: "",
      features: [
        "Sadece 1 platform seçebilirsin (Shopier, Trendyol, Hepsiburada veya Shopify)",
        "AI Chat & Ürün Analizi",
        "Sepete yönlendirme algoritması",
        "Chrome uzantısı ile ürün içe aktarma",
        "AI Try-On (Temel)",
        "Tek platform ürün öneri sistemi",
      ],
    },
    {
      name: "🔥 Premium Plan",
      price: "899 TL / ay",
      highlight: true,
      badge: "En Popüler",
      features: [
        "Tüm platformları aynı anda kullanabilirsin",
        "Çoklu platform ürün havuzu",
        "AI Try-On (Gelişmiş motor)",
        "Çapraz öneri desteği",
        "Gelişmiş satış analizi & raporlama",
        "7/24 AI destek sistemi",
      ],
    },
  ];

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1">Ödeme & Paketler</h1>
        <p className="text-sm text-white/60 mb-6">
          Mağazana uygun paketi seçerek FlowAI hizmetini aktif hale getirebilirsin.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-flowCard/80 border rounded-2xl p-6 flex flex-col gap-4 transition ${
                plan.highlight
                  ? "border-flowPrimary/70 shadow-[0_0_22px_rgba(78,243,255,0.35)] scale-[1.02]"
                  : "border-white/10"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-4 text-[10px] px-2 py-0.5 rounded-full bg-flowPrimary text-black font-bold">
                  {plan.badge}
                </div>
              )}

              <h2 className="text-lg font-bold">{plan.name}</h2>
              <div className="text-xl font-bold text-flowPrimary">{plan.price}</div>

              <ul className="text-xs text-white/75 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-flowPrimary">✔</span> {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-4 w-full py-2 text-sm rounded-lg transition font-medium ${
                  plan.highlight
                    ? "bg-gradient-to-r from-flowAccent to-flowPrimary text-black"
                    : "bg-white/10 hover:bg-white/15"
                }`}
                // TODO: iyzico ödeme linki buraya
              >
                Bu planı seç
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-white/50 leading-relaxed">
          Ödeme işlemleri Türkiye içi <strong>iyzico</strong> altyapısıyla güvenli şekilde gerçekleştirilir.
          Abonelik yenilemeleri otomatik olarak yapılır.
          İptal etmek istediğinde destek ekibi ile iletişime geçebilirsin:{" "}
          <a
            href="mailto:billing@flowai.app"
            className="text-flowPrimary hover:underline"
          >
            billing@flowai.app
          </a>
        </p>
      </div>
    </DashboardShell>
  );
}
