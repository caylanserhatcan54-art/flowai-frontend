"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);
  const [qrImage, setQrImage] = useState("");
  const [publicLink, setPublicLink] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("shopToken");
  if (!token) {
    router.push("/login");
  }
}, []);

  async function loadShop(email: string) {
    try {
      const res = await fetch(`${BACKEND}/auth/get_shop?email=${email}`);
      const data = await res.json();

      if (!data.ok) {
        window.location.href = "/login";
        return;
      }

      setShop(data.shop);

      // QR + Link oluştur
      setQrImage(`${BACKEND}/api/qr-image/${data.shop.shopId}`);
      setPublicLink(`https://flowai.app/${data.shop.shopId}`);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Hoş Geldin, {shop.shopName}
        </h1>

        <p className="text-gray-600 text-lg mb-3">
          Mağazan hazır! Müşteriler QR kodu tarayıp
          ürünler hakkında yapay zeka ile konuşabilir.
        </p>

        <hr className="my-6" />

        {/* PUBLIC LINK */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg font-semibold mb-2">
            Müşteri Linkin
          </p>

          <input
            value={publicLink}
            readOnly
            className="w-full border p-3 rounded bg-gray-50 text-black"
          />
        </div>

        {/* QR CODE */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg font-semibold mb-2">
            Mağazanın QR Kodu
          </p>

          <div className="flex justify-center">
            <img
              src={qrImage}
              alt="QR Code"
              className="border shadow-md rounded-lg p-3 bg-white max-w-xs"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-10">

          <button
            className="w-full bg-blue-600 text-white py-3 text-lg font-semibold rounded hover:bg-blue-700"
          >
            Chrome Uzantısını Aktifleştir
          </button>

          <button
            className="w-full bg-orange-500 text-white py-3 text-lg font-semibold rounded hover:bg-orange-600"
          >
            Mağaza Ürünlerini Senkronize Et
          </button>

          <button
            className="w-full bg-green-600 text-white py-3 text-lg font-semibold rounded hover:bg-green-700"
          >
            Ödeme ve Abonelik Planları
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-3 text-lg font-semibold rounded hover:bg-red-700"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
