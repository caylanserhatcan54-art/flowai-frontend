// app/login/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const auth = await login(email, password);
      saveAuth(auth);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        {/* Left info */}
        <div className="hidden md:block">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-1 text-xs text-white/70 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-flowPrimary" />
            FlowAI E-Ticaret Satış Asistanı
          </div>
          <h1 className="text-4xl font-semibold mb-4">
            Mağazana <span className="text-flowPrimary">akıllı satış</span>{" "}
            ekle.
          </h1>
          <p className="text-white/70 mb-6 text-sm leading-relaxed">
            FlowAI, müşterilerinle sen yokken de konuşur, ürün önerir, kombin
            çıkarır ve satın almaya yönlendirir.
          </p>

          <ul className="space-y-2 text-sm text-white/75">
            <li>• Anlık ürün & kombin önerileri</li>
            <li>• Kargo / iade sorularına otomatik yanıt</li>
            <li>• Sepete atmış müşteriyi ikna cümleleri</li>
          </ul>
        </div>

        {/* Right form */}
        <div className="bg-flowCard/80 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40">
          <h2 className="text-xl font-semibold mb-1">FlowAI Panel Girişi</h2>
          <p className="text-xs text-white/60 mb-6">
            Satın aldığın FlowAI hesabınla giriş yap.
          </p>

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
            <div>
              <label className="block mb-1 text-xs text-white/70">Şifre</label>
              <input
                type="password"
                required
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-900/30 border border-red-500/40 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-lg bg-gradient-to-r from-flowAccent to-flowPrimary text-sm font-medium py-2.5 disabled:opacity-60"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>

            <div className="flex items-center justify-between text-[11px] text-white/60 mt-2">
              <Link
                href="/forgot-password"
                className="hover:text-flowPrimary transition"
              >
                Şifremi unuttum
              </Link>
              <a
                href="mailto:support@flowai.app"
                className="hover:text-flowPrimary transition"
              >
                Destek: support@flowai.app
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
