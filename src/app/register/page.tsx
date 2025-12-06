"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const API_URL = "https://ai-shop-backend-2.onrender.com";

  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/auth/register_shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shopName, email, password }),
      });

      const data = await res.json();

      if (!data.ok) {
        setErrorMsg(data.message || "Kayıt başarısız");
        setLoading(false);
        return;
      }

      setSuccessMsg("Hesap başarıyla oluşturuldu! Yönlendiriliyorsunuz...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err: any) {
      setErrorMsg("Sunucu hatası!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white border rounded-lg shadow p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Hemen Kaydol
        </h2>

        <input
          className="w-full p-3 border rounded mb-4"
          type="text"
          placeholder="Mağaza Adı"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-4"
          type="email"
          placeholder="E-posta adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-4"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && (
          <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 text-sm mb-4">{successMsg}</p>
        )}

        <button
          disabled={loading}
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
        >
          {loading ? "Kaydediliyor..." : "Hesap Oluştur"}
        </button>

        <p className="text-center mt-4 text-sm">
          Zaten hesabın var mı?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            Giriş yap
          </a>
        </p>
      </div>
    </div>
  );
}
