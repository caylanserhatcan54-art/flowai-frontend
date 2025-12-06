"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loginShop(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(
      "https://ai-shop-backend-2.onrender.com/auth/login_shop",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      setError(data.message || "Giriş başarısız");
    }
  }

  return (
    <div className="min-h-screen bg-[#0E1420] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-[#151C29] border border-[#263243] p-10 rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">FlowAI</h1>
          <p className="text-gray-400 text-sm mt-1">
            Mağaza Yönetimi Giriş
          </p>
        </div>

        <form onSubmit={loginShop} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">E-posta</label>
            <input
              type="email"
              placeholder="example@test.com"
              className="w-full mt-1 p-3 rounded-lg bg-[#0E1420] border border-gray-700 text-white focus:border-blue-500 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Şifre</label>
            <input
              type="password"
              placeholder="******"
              className="w-full mt-1 p-3 rounded-lg bg-[#0E1420] border border-gray-700 text-white focus:border-blue-500 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              ❗ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold shadow-md"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Hesabın yok mu?{" "}
            <a href="/register" className="text-blue-400 hover:underline font-semibold">
              Kayıt Ol
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
