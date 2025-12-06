"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin() {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND}/auth/login_shop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setErrorMsg("E-mail veya şifre yanlış!");
        setLoading(false);
        return;
      }

      localStorage.setItem("flowai_token", data.token);

      router.push("/dashboard");
    } catch (err) {
      setErrorMsg("Sunucu bağlantı hatası!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#040269] to-purple-700 text-white px-6">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
        
        <h2 className="text-3xl font-bold text-center mb-7">
          FlowAI Giriş Yap
        </h2>

        {errorMsg !== "" && (
          <div className="bg-red-500/70 text-white py-2 px-4 rounded-md mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <label className="block text-sm mb-2">E-mail</label>
        <input
          type="email"
          placeholder="E-mail adresiniz"
          className="w-full p-3 rounded-md text-black outline-none mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm mb-2">Şifre</label>
        <input
          type="password"
          placeholder="Şifreniz"
          className="w-full p-3 rounded-md text-black outline-none mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-blue-900 font-semibold py-3 rounded-md mt-2 hover:bg-gray-200 transition"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        <button
          onClick={() => alert("Şifre sıfırlama yakında eklenecek.")}
          className="block text-center w-full text-white mt-4 underline text-sm"
        >
          Şifremi unuttum
        </button>

        <div className="mt-6 text-center text-sm">
          Hesabın yok mu?
          <a href="/register" className="underline font-semibold ml-1">
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}
