"use client";

import { useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function RegisterPage() {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccess] = useState("");
  const [errorMsg, setError] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${BACKEND}/auth/register_shop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopName, email, password }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError("Kayıt yapılamadı!");
        setLoading(false);
        return;
      }

      setSuccess("Hesap başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.");
    } catch (err) {
      setError("Sunucu hatası oluştu!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Hesap Oluştur
        </h2>

        <input
          type="text"
          placeholder="Mağaza Adı"
          className="w-full p-3 border rounded text-black mb-3"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-posta"
          className="w-full p-3 border rounded text-black mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          className="w-full p-3 border rounded text-black mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-blue-700 hover:bg-blue-800 font-semibold text-white"
        >
          {loading ? "Oluşturuluyor..." : "Kaydet ve Devam Et"}
        </button>

        <p className="text-center mt-4 text-gray-700">
          Zaten hesabın var?
          <a href="/login" className="text-blue-700 font-semibold ml-2">
            Giriş yap
          </a>
        </p>
      </form>
    </div>
  );
}
