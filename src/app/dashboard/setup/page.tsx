"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SetupPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setShopName(decoded.shopName || "");
    } catch {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#110025] via-[#13002f] to-[#0a0030] px-6 py-10 text-white">
      
      <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl border border-white/20 shadow-lg p-10 backdrop-blur">
        
        <h1 className="text-4xl font-bold mb-2">
          Hoş geldin {shopName} 🎉
        </h1>

        <p className="text-gray-300 mb-8 text-lg">
          FlowAI yapay zeka tezgahtarını aktif etmek için aşağıdaki adımları takip et.
        </p>

        {/* --- ADIM 1 --- */}
        <div className="mb-7">
          <h3 className="text-xl font-semibold flex gap-2 items-center">
            1️⃣ Chrome Uzantısını Yükle
          </h3>
          
          <p className="text-gray-300 text-sm mt-1">
            Mağaza ürünlerini çekmek ve yapay zekaya aktarmak için zorunlu.
          </p>

          <button
            onClick={() => alert("Chrome uzantısını en son ekleyeceğiz!")}
            className="mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            🔗 Uzantıyı İndir
          </button>
        </div>

        {/* --- ADIM 2 --- */}
        <div className="mb-7">
          <h3 className="text-xl font-semibold flex gap-2 items-center">
            2️⃣ Ürünleri İçeri Aktar
          </h3>

          <p className="text-gray-300 text-sm mt-1">
            Trendyol, Hepsiburada, N11, Çiçeksepeti sayfalarına girerek ürünleri çekebilirsin.
          </p>

          <button
            onClick={() => router.push("/dashboard/products")}
            className="mt-3 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            📦 Ürünleri Görüntüle
          </button>
        </div>

        {/* --- ADIM 3 --- */}
        <div className="mb-7">
          <h3 className="text-xl font-semibold flex gap-2 items-center">
            3️⃣ Yapay Zeka Linkini Mağazana Ekle
          </h3>

          <p className="text-gray-300 text-sm mt-1">
            İstersen ürün açıklamasına ekle, istersen mağaza sayfana.
          </p>

          <button
            onClick={() => router.push("/dashboard/link")}
            className="mt-3 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            🔗 Link ve QR Oluştur
          </button>
        </div>

        {/* --- ADIM 4 --- */}
        <div>
          <h3 className="text-xl font-semibold flex gap-2 items-center">
            4️⃣ Müşterilere Sunmaya Başla 🚀
          </h3>

          <p className="text-gray-300 text-sm mt-1">
            Link aktif olduğunda müşteri sorar, yapay zeka cevap verir ve yönlendirir.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-3 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold"
          >
            🏪 Yönetim Paneline Git
          </button>
        </div>

      </div>
    </div>
  );
}
