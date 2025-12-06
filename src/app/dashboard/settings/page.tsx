"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function SettingsPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [activePlan, setActivePlan] = useState("none");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("shopToken");
    if (!t) return router.push("/login");
    setToken(t);

    fetch(`${BACKEND}/auth/me?token=${t}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setActivePlan(data.activePlan);
          setExpiresAt(data.planExpiresAt || null);
        }
      });
  }, []);

  async function startPayment(plan: "standard" | "premium") {
    alert(plan + " ödemesi başlatılıyor…");

    // Normalde iyzico link açılacak
    // test linkini açıyoruz
    window.open("https://checkout.iyzico.com/mock-payment-test", "_blank");
  }

  async function activatePlan(planType: "standard" | "premium") {
    const res = await fetch(`${BACKEND}/auth/activate_plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        planType,
        paymentReference: "TEST-REF"
      })
    });

    const data = await res.json();
    if (data.ok) {
      alert("Plan aktif edildi 🚀");
      window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080A22] to-[#190542] text-white p-14">

      <h1 className="text-4xl font-bold mb-4">🏪 Mağaza Yönetim Paneli</h1>

      {activePlan === "none" && (
        <>
          <h2 className="text-2xl font-semibold mb-4">📌 Henüz bir plana sahip değilsin.</h2>

          <div className="grid grid-cols-2 gap-8">

            {/* STANDARD PLAN */}
            <div className="bg-white/10 p-8 rounded-xl border border-white/20">
              <h3 className="text-3xl font-bold mb-2">Standard Plan</h3>
              <p className="opacity-90 mb-4">Tek platformda kullan</p>
              <div className="text-4xl font-bold mb-6">499₺</div>

              <button
                className="bg-yellow-300 text-black w-full py-3 rounded-lg"
                onClick={() => startPayment("standard")}
              >
                💳 Satın Al
              </button>

              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg"
                onClick={() => activatePlan("standard")}
              >
                Test Aktifleştir
              </button>
            </div>

            {/* PREMIUM PLAN */}
            <div className="bg-white/10 p-8 rounded-xl border border-white/20">
              <h3 className="text-3xl font-bold mb-2">Premium Plan</h3>
              <p className="opacity-90 mb-4">5 platform destekli</p>
              <div className="text-4xl font-bold mb-6">899₺</div>

              <button
                className="bg-yellow-300 text-black w-full py-3 rounded-lg"
                onClick={() => startPayment("premium")}
              >
                💳 Satın Al
              </button>

              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg"
                onClick={() => activatePlan("premium")}
              >
                Test Aktifleştir
              </button>
            </div>

          </div>

        </>
      )}

      {activePlan !== "none" && (
        <div className="mt-10 bg-green-600/20 border border-green-400 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Aktif Plan: {activePlan.toUpperCase()}</h2>
          <p className="text-lg opacity-90">
            Yenileme tarihi: {expiresAt ? new Date(expiresAt).toLocaleDateString() : ""}
          </p>
        </div>
      )}
    </div>
  );
}
