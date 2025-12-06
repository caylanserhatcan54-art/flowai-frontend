"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-shop-backend-2.onrender.com";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);

  const [mainPlatform, setMainPlatform] = useState("");
  const [platforms, setPlatforms] = useState<any>({});
  const [packageType, setPackageType] = useState("");

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");
    if (!shopId) {
      setLoading(false);
      return;
    }

    fetch(`${API}/shops/get?shopId=${shopId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        console.log("SHOP SETTINGS:", data);

        if (data.ok) {
          setShop(data.shop);
          setPackageType(data.shop.packageType);
          setMainPlatform(data.shop.mainPlatform || "");
          setPlatforms(data.shop.platforms || {});
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Settings fetch error:", err);
        setLoading(false);
      });
  }, []);

  const togglePlatform = (platform: string) => {
    setPlatforms((prev: any) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const saveSettings = () => {
    const shopId = localStorage.getItem("shopId");

    fetch(`${API}/shops/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopId,
        mainPlatform,
        platforms,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) alert("Ayarlar kaydedildi!");
        else alert("Hata: " + d.error);
      })
      .catch((err) => alert("Bağlantı hatası: " + err.message));
  };

  if (loading) return <p className="text-white p-6">Yükleniyor...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Mağaza Ayarları</h1>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <p className="text-lg">
          <strong>Mağaza adı:</strong> {shop?.shopName}
        </p>
        <p className="text-lg mt-2">
          <strong>Paket:</strong>{" "}
          {packageType === "basic" ? "BASIC (499₺)" : "PRO (899₺)"}
        </p>
      </div>

      {packageType === "basic" && (
        <div className="mt-8 bg-slate-900 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Ana Platform</h2>

          <select
            value={mainPlatform}
            onChange={(e) => setMainPlatform(e.target.value)}
            className="bg-slate-800 text-white p-3 w-full rounded"
          >
            <option value="trendyol">Trendyol</option>
            <option value="hepsiburada">Hepsiburada</option>
            <option value="n11">N11</option>
            <option value="amazon">Amazon</option>
            <option value="shopier">Shopier</option>
            <option value="shopify">Shopiy</option>
            <option value="ideasoft">Ideasoft</option>
            <option value="ikas">İkas</option>
            <option value="ciceksepeti">Çiçek Sepeti</option>
            <option value="pttavm">PTTAVM</option>
          </select>
        </div>
      )}

      {packageType === "pro" && (
        <div className="mt-8 bg-slate-900 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold mb-4">
            Platform Erişim İzinleri (PRO)
          </h2>

          {Object.keys(platforms).map((p) => (
            <div key={p} className="flex items-center justify-between py-2">
              <span className="capitalize">{p}</span>
              <input
                type="checkbox"
                checked={platforms[p]}
                onChange={() => togglePlatform(p)}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={saveSettings}
        className="mt-6 bg-blue-600 hover:bg-blue-500 py-3 px-6 rounded font-bold"
      >
        Ayarları Kaydet
      </button>
    </div>
  );
}
