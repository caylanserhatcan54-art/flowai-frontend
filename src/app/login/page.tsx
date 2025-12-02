"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Giriş hatası");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("shopId", data.shopId);
      localStorage.setItem("shopName", data.shopName);
      localStorage.setItem("email", data.email);

      router.push("/dashboard");
    } catch (e) {
      setError("Sunucu hatası!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      {/* Glow Arka Plan */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-3xl -z-10 animate-pulse"></div>

      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          FlowAI Panel
        </h1>

        {error && (
          <div className="text-red-400 text-center mb-3 text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ornek@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Şifre</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Şifremi unuttum */}
          <div className="flex justify-end">
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Şifremi Unuttum?
            </button>
          </div>

          {/* Giriş butonu */}
          <button
            onClick={handleLogin}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition transform hover:scale-[1.02]"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

          {/* Kayıt Ol */}
          <div className="text-center text-gray-300 mt-4">
            Hesabın yok mu?{" "}
            <button
              className="text-blue-400 hover:text-blue-300"
              onClick={() => router.push("/register")}
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
