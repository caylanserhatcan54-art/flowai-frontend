"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

// Dashboard'ta kullanacağımız tipler (frontend tarafı)
type PlatformInfo = {
  key: string;
  name: string;
  connected: boolean;
};

type ShopInfo = {
  shopId: string;
  shopName: string;
  email: string;
  plan: "standard" | "premium";
  renewalDate?: string;
  platforms: PlatformInfo[];
  chatUrl: string;
};

export default function DashboardPage() {
  const [shop, setShop] = useState<ShopInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // localStorage'daki token
  const shopToken =
    typeof window !== "undefined" ? localStorage.getItem("shopToken") : null;

  useEffect(() => {
    async function loadShop() {
      if (!shopToken) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch(`${BACKEND}/auth/shop-info`, {
          headers: {
            Authorization: `Bearer ${shopToken}`,
          },
        });

        const data = await res.json();

        if (!data.ok) {
          localStorage.removeItem("shopToken");
          window.location.href = "/login";
          return;
        }

        // Backend'in döndürdüğü veriyi ShopInfo şekline oturt
        const s: ShopInfo = {
          shopId: data.shop.shopId,
          shopName: data.shop.shopName,
          email: data.shop.email,
          plan: data.shop.plan ?? "standard",
          renewalDate: data.shop.renewalDate,
          platforms:
            data.shop.platforms ??
            [
              { key: "trendyol", name: "Trendyol", connected: false },
              { key: "hepsiburada", name: "Hepsiburada", connected: false },
              { key: "n11", name: "N11", connected: false },
              { key: "amazon_tr", name: "Amazon TR", connected: false },
              { key: "ciceksepeti", name: "ÇiçekSepeti", connected: false },
            ],
          chatUrl: data.shop.chatUrl ?? `https://flowai.app/${data.shop.shopId}`,
        };

        setShop(s);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadShop();
  }, [shopToken]);

  function logout() {
    localStorage.removeItem("shopToken");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <p className="text-lg text-gray-300">Panel yükleniyor...</p>
      </main>
    );
  }

  if (!shop) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <p className="text-lg text-red-400">Mağaza bilgileri alınamadı.</p>
      </main>
    );
  }

  const qrUrl = `${BACKEND}/api/qr-image/${shop.shopId}`;

  // Plan limitleri
  const isStandard = shop.plan === "standard";
  const maxPlatforms = isStandard ? 1 : 5;

  // Chrome uzantısı placeholder (sonra gerçek linki buraya koyarsın)
  const chromeExtensionUrl =
    "https://chrome.google.com/webstore/detail/flowai-shop-assistant/XXXXXXXX";

  // Ödeme linkleri placeholder (Stripe / İyzico vs. ekleyince değiştireceksin)
  const standardCheckoutUrl = `https://pay.flowai.app/checkout?plan=standard&shopId=${shop.shopId}`;
  const premiumCheckoutUrl = `https://pay.flowai.app/checkout?plan=premium&shopId=${shop.shopId}`;

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Üst başlık & logout */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">FlowAI Mağaza Paneli</h1>
            <p className="text-gray-400 mt-1">
              Hoş geldin, <span className="font-semibold">{shop.shopName}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-semibold"
          >
            Çıkış Yap
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* SOL: Plan bilgileri */}
          <section className="lg:col-span-2 space-y-6">
            {/* PLAN KARTI */}
            <div className="bg-[#0B1220] border border-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Abonelik Planı</h2>
                  <p className="text-gray-400 text-sm">
                    Aktif planın:{" "}
                    <span className="font-semibold text-blue-400">
                      {shop.plan === "standard"
                        ? "Standard (1 Platform)"
                        : "Premium (5 Platform)"}
                    </span>
                  </p>
                  {shop.renewalDate && (
                    <p className="text-gray-500 text-xs mt-1">
                      Yenileme tarihi: {shop.renewalDate}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">
                    {shop.plan === "standard" ? "499₺" : "899₺"}
                    <span className="text-sm text-gray-400"> / ay</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-6">
                {/* Standard plan kartı */}
                <div
                  className={`rounded-xl border p-4 ${
                    isStandard
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-700 bg-black/20"
                  }`}
                >
                  <p className="text-sm font-semibold text-blue-400">
                    Standard Plan
                  </p>
                  <p className="mt-1 text-2xl font-bold">499₺ / ay</p>
                  <ul className="text-xs text-gray-400 mt-3 space-y-1">
                    <li>• 1 e-ticaret sitesi</li>
                    <li>• Chrome uzantısı ile ürün aktarımı</li>
                    <li>• Mağazaya özel link + QR</li>
                  </ul>
                  {!isStandard && (
                    <a
                      href={standardCheckoutUrl}
                      className="mt-4 inline-block text-center w-full bg-gray-800 hover:bg-gray-700 text-sm font-semibold py-2 rounded-lg"
                    >
                      Standard&apos;a geç
                    </a>
                  )}
                </div>

                {/* Premium plan kartı */}
                <div
                  className={`rounded-xl border p-4 ${
                    !isStandard
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-700 bg-black/20"
                  }`}
                >
                  <p className="text-sm font-semibold text-purple-400">
                    Premium Plan
                  </p>
                  <p className="mt-1 text-2xl font-bold">899₺ / ay</p>
                  <ul className="text-xs text-gray-400 mt-3 space-y-1">
                    <li>• 5 platforma kadar (Trendyol, Hepsiburada, N11, Amazon TR, ÇiçekSepeti)</li>
                    <li>• Tüm platformlar için tek panel</li>
                    <li>• Tek link + çoklu mağaza desteği (ileride)</li>
                  </ul>
                  {isStandard && (
                    <a
                      href={premiumCheckoutUrl}
                      className="mt-4 inline-block text-center w-full bg-purple-600 hover:bg-purple-700 text-sm font-semibold py-2 rounded-lg"
                    >
                      Premium&apos;a yükselt
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* PLATFORM DURUMU */}
            <div className="bg-[#0B1220] border border-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Bağlı Platformlar</h2>
                <p className="text-xs text-gray-400">
                  Plan limitin:{" "}
                  <span className="font-semibold text-blue-400">
                    {maxPlatforms} platform
                  </span>
                </p>
              </div>

              <p className="text-xs text-gray-400 mb-4">
                Chrome uzantısını kullanarak mağazandaki ürünleri Firestore&apos;a
                aktar. Aşağıdaki listede hangi pazaryerlerinden ürün çektiğini
                göreceksin.
              </p>

              <div className="overflow-hidden rounded-xl border border-gray-800">
                <table className="w-full text-sm">
                  <thead className="bg-black/40">
                    <tr>
                      <th className="text-left px-4 py-3">Platform</th>
                      <th className="text-left px-4 py-3">Durum</th>
                      <th className="text-left px-4 py-3">Not</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shop.platforms.map((p) => (
                      <tr key={p.key} className="border-t border-gray-800/60">
                        <td className="px-4 py-3">{p.name}</td>
                        <td className="px-4 py-3">
                          {p.connected ? (
                            <span className="text-green-400 text-xs font-semibold">
                              Ürünler aktarıldı
                            </span>
                          ) : (
                            <span className="text-yellow-400 text-xs font-semibold">
                              Bekliyor (Chrome uzantısıyla aktarılacak)
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">
                          {p.connected
                            ? "Yapay zeka bu mağazadaki ürünleri kullanıyor."
                            : "Uzantıdan bu mağazayı seçip ürünleri içe aktar."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-[11px] text-gray-500">
                * Standard planda yalnızca 1 platform aktif olmalıdır. Premium
                planda 5 platforma kadar ürün aktarımı yapabilirsiniz.
              </p>
            </div>
          </section>

          {/* SAĞ: Chrome extension + Link & QR */}
          <section className="space-y-6">
            {/* Chrome Uzantısı */}
            <div className="bg-[#0B1220] border border-blue-600/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                1. Chrome Uzantısını Kur
              </h2>
              <p className="text-sm text-gray-300">
                Tüm ürünlerini tek tıkla Firestore&apos;a aktarmak için FlowAI
                Chrome uzantısını kur.
              </p>

              <a
                href={chromeExtensionUrl}
                target="_blank"
                className="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Chrome Uzantısını İndir
              </a>

              <ol className="mt-4 text-xs text-gray-400 list-decimal list-inside space-y-1">
                <li>Uzantıyı Chrome’a ekle.</li>
                <li>E-ticaret paneline gir ve FlowAI uzantısını aç.</li>
                <li>Mağazanı seç ve “Tüm ürünleri aktar” butonuna bas.</li>
              </ol>
            </div>

            {/* Link & QR */}
            <div className="bg-[#0B1220] border border-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                2. Link & QR&apos;yi Mağazana Koy
              </h2>
              <p className="text-xs text-gray-400 mb-3">
                Aşağıdaki link ve QR kod, bu mağaza için özeldir. Ürün
                açıklamalarına veya mağaza banner&apos;ına ekleyebilirsin.
              </p>

              <div className="bg-black/40 rounded-lg p-3 mb-4 text-xs break-all">
                {shop.chatUrl}
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(shop.chatUrl)}
                className="w-full mb-4 bg-gray-800 hover:bg-gray-700 text-xs font-semibold py-2 rounded-lg"
              >
                Linki Kopyala
              </button>

              <div className="flex flex-col items-center gap-3">
                <img
                  src={qrUrl}
                  alt="Mağaza QR Kodu"
                  className="w-40 h-auto rounded-lg border border-gray-700 bg-white"
                />
                <a
                  href={qrUrl}
                  target="_blank"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  QR&apos;yi indir
                </a>
              </div>
            </div>

            {/* Yakında kartı */}
            <div className="bg-[#0B1220] border border-dashed border-gray-700 rounded-2xl p-4 text-xs text-gray-400">
              <p className="font-semibold text-sm mb-1">Yakında:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Sohbet kayıtları & analitik</li>
                <li>Müşteri başına satış dönüşüm oranları</li>
                <li>Ürün bazlı performans raporları</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
