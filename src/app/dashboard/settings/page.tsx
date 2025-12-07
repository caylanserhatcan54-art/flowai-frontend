"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState("");
  const [planActive, setPlanActive] = useState(false); // ödeme aktif değil

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1C034C] text-white p-14">

      <h1 className="text-4xl font-bold mb-3">🏪 Mağaza Yönetimi</h1>
      <p className="opacity-80 mb-10 text-lg">
        Mağaza bilgilerini düzenle, planını görüntüle ve abonelik durumunu kontrol et.
      </p>


      <div className="max-w-4xl space-y-8">

        {/* SUBSCRIPTION INFO */}
        <section className="bg-white/10 rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">💳 Abonelik Durumu</h2>

          {!planActive ? (
            <div className="bg-red-900/40 p-6 rounded-lg border border-red-400">
              <p className="text-lg font-medium mb-3">❌ Üyeliğin aktif değil</p>
              <p className="opacity-80 mb-6">
                AI link & QR kod, ürün öneri sistemi ve müşteri yanıtları şu an kapalı.
              </p>

              <button
                onClick={() => router.push("/dashboard/settings/payment")}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium"
              >
                ⭐ Üyeliği Aktif Et
              </button>

              <p className="text-sm opacity-70 mt-3">
                İlk 7 gün içinde koşulsuz iptal hakkı 💙
              </p>
            </div>
          ) : (
            <div className="bg-green-900/40 p-6 rounded-lg border border-green-400">
              <p className="text-lg font-medium mb-3">✔ Üyelik aktif</p>
              <p className="opacity-80 mb-2">Plan: Standart</p>
              <p className="opacity-80 mb-2">Sonraki ödeme: 30 gün sonra</p>

              <button className="bg-red-500 hover:bg-red-600 mt-4 px-6 py-3 rounded-lg font-medium">
                İptal Et
              </button>
            </div>
          )}
        </section>


        {/* SHOP INFO SECTION */}
        <section className="bg-white/10 rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">📌 Mağaza Bilgileri</h2>

          <div className="space-y-2 text-lg">
            <p>Mağaza Adı: <span className="opacity-80">{shopName}</span></p>
            <p>E-Posta: <span className="opacity-80">test@mail.com</span></p>
            <p>Bağlı Platformlar:</p>

            <ul className="opacity-90 pl-6 list-disc">
              <li>Trendyol</li>
              <li>Hepsiburada</li>
              <li>N11</li>
              <li>Amazon TR</li>
              <li>Çiçeksepeti</li>
            </ul>
          </div>
        </section>


        {/* BILLING FAKE DATA */}
        <section className="bg-white/10 rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">🧾 Fatura Bilgileri (Yakında)</h2>

          <p className="opacity-80">
            Bu alan yakında otomatik olarak doldurulabilecek.
            Şimdilik bir işlem yapmana gerek yok.
          </p>
        </section>

      </div>

    </div>
  );
}
