"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function SettingsPage() {
  const [plan, setPlan] = useState<string>("standart");
  const [shopId, setShopId] = useState<string>("");
  const [statusMsg, setStatusMsg] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) return;

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      setShopId(decoded.shopId || "");
    } catch {}
  }, []);

  async function startPayment() {
    if (!shopId) {
      alert("Shop ID bulunamadı");
      return;
    }

    setStatusMsg("Ödeme başlatılıyor...");

    const res = await fetch(`${BACKEND}/payment/create-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopId,
        plan,
      }),
    });

    const data = await res.json();
    console.log("Payment start response:", data);

    if (data.ok) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Ödeme başlatılamadı.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white p-16">
      <h1 className="text-4xl font-bold mb-2">🏪 Mağaza Yönetimi</h1>

      <p className="text-lg opacity-80 mb-10">
        Mağaza bilgilerini düzenle, plan seç ve ödeme yaparak sistemi aktif et.
      </p>

      <div className="bg-white/10 border border-white/10 backdrop-blur-md p-10 rounded-2xl max-w-3xl">

        <h2 className="text-2xl font-semibold mb-6">📌 Plan Seçimi</h2>

        {/* PLAN SEÇİMİ */}
        <div className="space-y-3">
          <label>
            <input
              type="radio"
              name="plan"
              value="standart"
              checked={plan === "standart"}
              onChange={() => setPlan("standart")}
            />
            <span className="ml-3 text-lg">Standart Paket — 499₺ / ay</span>
          </label>

          <label>
            <input
              type="radio"
              name="plan"
              value="premium"
              checked={plan === "premium"}
              onChange={() => setPlan("premium")}
            />
            <span className="ml-3 text-lg">Premium Paket — 899₺ / ay</span>
          </label>
        </div>

        {/* SATIN AL BUTONU */}
        <button
          onClick={startPayment}
          className="w-full mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-xl shadow-md text-lg"
        >
          💳 Ödemeyi Başlat
        </button>

        {statusMsg && (
          <p className="text-sm mt-4 opacity-80">{statusMsg}</p>
        )}
      </div>

      <p className="text-center text-sm opacity-60 mt-10">
        Ödeme sonucunda plan otomatik aktif edilecektir.
      </p>
    </div>
  );
}
