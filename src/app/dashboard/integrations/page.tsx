"use client";

import { useEffect, useState } from "react";

export default function IntegrationsPage() {
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-1-um67.onrender.com/api";

  const platforms = [
    { id: "trendyol", name: "Trendyol" },
    { id: "hepsiburada", name: "Hepsiburada" },
    { id: "n11", name: "N11" },
    { id: "amazon", name: "Amazon" },
    { id: "shopier", name: "Shopier" },
    { id: "shopify", name: "Shopify" },
    { id: "ideasoft", name: "Ideasoft" },
    { id: "ikas", name: "İkas" },
    { id: "ciceksepeti", name: "ÇiçekSepeti" },
    { id: "pttavm", name: "PTTAVM" }
  ];

  useEffect(() => {
    async function loadShop() {
      const shopId = localStorage.getItem("shopId");
      if (!shopId) {
        setLoading(false);
        setShop(null);
        return;
      }

      try {
        const res = await fetch(
          `${API}/shop/get?shopId=${shopId}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setShop(data.shop || null);
      } catch (err) {
        console.error("Shop fetch error:", err);
        setShop(null);
      }

      setLoading(false);
    }

    loadShop();
  }, []); // sadece 1 kere çalışır

  if (loading)
    return (
      <div className="text-gray-800 p-6 text-lg font-medium">
        Mağaza bilgileri yükleniyor...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Entegrasyonlar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {platforms.map((p) => {
          const isActive = shop?.activePlatforms?.includes(p.id);

          return (
            <div
              key={p.id}
              className="border bg-white shadow-sm rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.id}.com</p>
              </div>

              {isActive ? (
                <div className="text-green-600 text-2xl font-bold">✔</div>
              ) : (
                <div className="text-red-500 text-2xl font-bold">✖</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
