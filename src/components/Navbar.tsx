"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          FlowAI
        </Link>

        <div className="flex items-center gap-6 text-gray-800 font-medium">
          <Link href="/#features" className="hover:text-blue-600">
            Özellikler
          </Link>
          <Link href="/#pricing" className="hover:text-blue-600">
            Fiyatlandırma
          </Link>
          <Link href="/#faq" className="hover:text-blue-600">
            S.S.S
          </Link>
          <Link href="/integrations" className="hover:text-blue-600">
            Entegrasyonlar
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Giriş Yap
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Kaydol
          </Link>
        </div>
      </div>
    </nav>
  );
}
