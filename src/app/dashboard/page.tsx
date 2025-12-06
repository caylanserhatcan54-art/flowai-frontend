"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      setShopName(decoded.shopName || "");
    } catch {
      router.push("/login");
    }
  }, []);

  function logout() {
    localStorage.removeItem("shopToken");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-10">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Merhaba {shopName} 🎉
        </h1>

        <p className="text-gray-600 mb-8">
          FlowAI mağaza yönetim paneline hoş geldin.  
          AI asistanını aktif etmek için gerekli alanları tamamla.
        </p>

        <div className="space-y-4">
          <a
            href="/settings"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold shadow-md"
          >
            🛠️ Mağaza Ayarları
          </a>

          <a
            href="/chrome-extension"
            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-semibold shadow-md"
          >
            ➕ Chrome Eklentisini Kur
          </a>

          <a
            href="/qr"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-semibold shadow-md"
          >
            🔗 QR Kod & Akıllı Linkim
          </a>

          <a
            href="/pricing"
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg font-semibold shadow-md"
          >
            💳 Abonelik & Ödeme Planı
          </a>

          <button
            onClick={logout}
            className="block w-full text-center bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg font-semibold shadow-md"
          >
            🚪 Çıkış Yap
          </button>
        </div>

        <div className="mt-10 text-sm text-gray-500 text-center">
          FlowAI © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
