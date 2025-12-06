"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${BACKEND}/auth/login_shop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!data.ok) {
      setError("Giriş hatalı");
      return;
    }

    localStorage.setItem("token", data.token);

    router.push("/dashboard");
  }

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Giriş Yap</h1>

      <form className="flex flex-col gap-5" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          className="border p-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          className="border p-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
