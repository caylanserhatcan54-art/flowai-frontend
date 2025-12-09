// app/forgot-password/page.tsx
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: backend endpoint: /auth/forgot-password
    // await fetch(...);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-flowCard/80 border border-white/10 rounded-2xl p-6 md:p-8">
        <h1 className="text-xl font-semibold mb-2">Şifremi Unuttum</h1>
        <p className="text-xs text-white/60 mb-5">
          Kayıtlı e-posta adresini yaz, sana şifre sıfırlama bağlantısı
          gönderelim.
        </p>

        {sent ? (
          <div className="text-sm text-flowPrimary">
            ✉ Şifre sıfırlama bağlantısı (örnek) e-posta adresine gönderildi.  
            Gelen kutunu ve spam klasörünü kontrol et.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block mb-1 text-xs text-white/70">
                E-posta
              </label>
              <input
                type="email"
                required
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@magaza.com"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-flowAccent to-flowPrimary text-sm font-medium py-2.5"
            >
              Bağlantı Gönder
            </button>
          </form>
        )}

        <div className="mt-5 text-xs text-white/60">
          <Link href="/login" className="hover:text-flowPrimary">
            ← Giriş ekranına dön
          </Link>
        </div>
      </div>
    </div>
  );
}
