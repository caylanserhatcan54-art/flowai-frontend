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
      const requestBody = JSON.stringify({
        email,
        password
      });

      console.log("Sending:", requestBody);

      const res = await fetch(`${BACKEND}/auth/login_shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const data = await res.json();

      console.log("Response:", data);

      if (!data.ok) {
        setError("E-posta veya şifre hatalı");
        return;
      }

      // ⭐ TOKEN’I LOCALSTORAGE’A KAYDEDİYORUZ
      localStorage.setItem("shopToken", data.token);

      // ⭐ BAŞARILI GİRİŞ → YÖNLENDİR
      router.push("/dashboard");

    } catch (err) {
      console.log(err);
      setError("Sunucuya bağlanılamadı");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">

      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md border">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Mağaza Girişi
        </h2>

        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md text-center mb-4">
            {error}
          </div>
        )}

        <label className="text-gray-700 font-semibold">E-posta Adresi</label>
        <input
          className="w-full mt-2 mb-4 p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          type="email"
          placeholder="mail@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-gray-700 font-semibold">Şifre</label>
        <input
          className="w-full mt-2 mb-6 p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          type="password"
          placeholder="••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
        >
          Giriş Yap
        </button>

        <p className="text-center mt-4 text-sm">
          Şifremi unuttum
        </p>
      </form>
    </div>
  );
}
