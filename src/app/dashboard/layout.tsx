"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: any) {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg mb-2 font-semibold ${
        pathname.startsWith(href)
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md p-4 border-r border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">FlowAI Panel</h1>

        {navItem("/dashboard/chat", "Sohbetler")}
        {navItem("/dashboard/products", "Ürünler")}
        {navItem("/dashboard/integrations", "Entegrasyonlar")}
        {navItem("/dashboard/ai-settings", "AI Ayarları")}
        {navItem("/dashboard/qr", "AI Link / QR Kod")}
        {navItem("/dashboard/account", "Hesap Ayarları")}

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="mt-8 block w-full bg-red-500 text-white p-2 rounded-lg"
        >
          Çıkış Yap
        </button>
      </div>

      {/* SAYFA ALANI */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
