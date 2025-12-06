"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending:", { email, password });

      const res = await fetch(`${BACKEND}/auth/login_shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.ok) {
        localStorage.setItem("shopToken", data.token);
        router.push("/dashboard");
      } else {
        setError(data.error || "Giriş hatası");
      }
    } catch (err) {
      setError("Sunucuya ulaşılamıyor!");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          FlowAI Giriş Yap
        </h1>

        <p className="text-center text-gray-600 mt-2 font-medium">
          Mağaza yönetim paneline erişin
        </p>

        <form onSubmit={handleLogin} className="mt-10 space-y-6">
          <div>
            <label className="font-semibold text-gray-800 block mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-4 focus:ring-purple-300 text-gray-900"
              placeholder="mail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800 block mb-2">
              Şifre
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-4 focus:ring-purple-300 text-gray-900"
              placeholder="Şifreniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-center text-red-600 font-semibold text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white rounded-xl text-lg font-bold shadow-lg"
          >
            🚀 Giriş Yap
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Hesabın yok mu?
          <a href="/register" className="text-purple-700 font-bold ml-2">
            Kayıt ol
          </a>
        </p>

        <p className="mt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} FlowAI – Tüm Hakları Saklıdır
        </p>
      </div>
    </div>
  );
}
