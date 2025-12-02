"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:4000";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, shopName }),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (!data.success) {
        setError(data.error || "Kayıt başarısız.");
        setLoading(false);
        return;
      }

      // kullanıcı oluşturulduktan sonra login yönlendirme
      router.push("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError("Sunucu hatası");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center">
      <div className="w-full max-w-md px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Kayıt Ol</h1>

        <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mağaza Adı"
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2"
            onChange={(e) => setShopName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Şifre"
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 rounded-md py-2"
          >
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </button>
        </div>
      </div>
    </div>
  );
}
