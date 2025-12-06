"use client";

import { useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND}/auth/login_shop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError("Email veya şifre hatalı.");
        setLoading(false);
        return;
      }

      // TOKEN'A YAZILDI
      localStorage.setItem("shopToken", data.token);
      localStorage.setItem("shopEmail", email);

      // DASHBOARD’A GİRİŞ
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Sunucu hatası oluştu!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Giriş Yap
        </h2>

        <input
          type="email"
          placeholder="E-posta"
          className="w-full p-3 border rounded mb-4 text-black placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          className="w-full p-3 border rounded mb-4 text-black placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        <p className="text-center mt-4">
          Hesabın yok mu?
          <a href="/register" className="text-blue-700 font-semibold ml-2">
            Kayıt Ol
          </a>
        </p>
      </form>
    </div>
  );
}
