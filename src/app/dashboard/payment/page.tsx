"use client";

import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  async function activate() {
    // İLERİDE GERÇEK ÖDEMEYE DÖNECEK
    localStorage.setItem("membership", "active");
    alert("🎉 Üyeliğin aktif edildi!");
    router.push("/dashboard/payment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F2B] to-[#1C034D] text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">🎯 FlowAI Üyeliğini Aktif Et</h1>

      <div className="bg-white/10 border border-white/10 rounded-xl max-w-xl w-full p-6">

        <p className="text-lg mb-4 opacity-90">
          FlowAI satış asistanını kullanmaya başlamak için bir plan seç.
        </p>

        <div className="space-y-5">

          <div className="border border-white/20 rounded-lg p-4 hover:bg-white/10 transition cursor-pointer"
            onClick={() => localStorage.setItem("plan", "standard")}
          >
            <h2 className="text-xl font-semibold">⭐ Standart Plan — 499 TL / Ay</h2>
            <ul className="text-sm opacity-90 mt-2 space-y-1">
              <li>✔ Tek e-ticaret platformu</li>
              <li>✔ AI Chat & Analiz</li>
              <li>✔ QR & Akıllı Link</li>
              <li>✔ Kurulum desteği</li>
            </ul>
          </div>

          <div className="border border-yellow-400/40 rounded-lg p-4 hover:bg-yellow-400/20 transition cursor-pointer"
            onClick={() => localStorage.setItem("plan", "premium")}
          >
            <h2 className="text-xl font-semibold text-yellow-300">🔥 Premium Plan — 899 TL / Ay</h2>
            <ul className="text-sm opacity-90 mt-2 space-y-1">
              <li>✔ Tüm platformlarda aktif</li>
              <li>✔ Gelişmiş ürün önerisi</li>
              <li>✔ QR & Akıllı Link</li>
              <li>✔ 7/24 AI destek</li>
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
          7 gün içinde koşulsuz iade garantisi.
        </p>
      </div>
    </div>
  );
}
