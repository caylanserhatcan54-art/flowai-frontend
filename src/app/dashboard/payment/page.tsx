"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("standard");

  function choosePlan(plan: string) {
    setSelectedPlan(plan);
  }

  async function activate() {
    localStorage.setItem("membership", "active");
    localStorage.setItem("plan", selectedPlan);

    alert("🎉 Üyeliğin aktif edildi!");
    router.push("/dashboard/qr");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F2B] to-[#1C034D] text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">🎯 FlowAI Üyeliğini Aktif Et</h1>

      <div className="bg-white/10 border border-white/10 rounded-xl max-w-xl w-full p-6">

        <p className="text-lg mb-4 opacity-90">
          FlowAI satış asistanını kullanmaya başlamak için bir plan seç.
        </p>

        <div className="space-y-5">

          {/* STANDARD */}
          <div
            onClick={() => choosePlan("standard")}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedPlan === "standard"
                ? "border-blue-400 bg-blue-500/10"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            <h2 className="text-xl font-semibold">⭐ Standart — 499 TL/Ay</h2>
            <ul className="text-sm opacity-90 mt-2 space-y-1">
              <li>✔ Sadece 1 e-ticaret platformu</li>
              <li>✔ AI Chat & Analiz</li>
              <li>✔ QR & Akıllı Link</li>
              <li>✔ Chrome Uzantısı</li>
            </ul>
          </div>

          {/* PREMIUM */}
          <div
            onClick={() => choosePlan("premium")}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedPlan === "premium"
                ? "border-yellow-300 bg-yellow-500/10"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            <h2 className="text-xl font-semibold text-yellow-300">🔥 Premium — 899 TL/Ay</h2>
            <ul className="text-sm opacity-90 mt-2 space-y-1">
              <li>✔ Tüm platformlarda aktif</li>
              <li>✔ Gelişmiş öneri sistemi</li>
              <li>✔ QR & Akıllı Link</li>
              <li>✔ 7/24 destek</li>
            </ul>
          </div>

        </div>

        <button
          onClick={activate}
          className="mt-7 w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold"
        >
          🎉 Üyeliğimi Aktif Et
        </button>

        <p className="text-xs text-center mt-3 opacity-70">
          7 gün içinde koşulsuz iade garantisi 💙
        </p>
      </div>
    </div>
  );
}
