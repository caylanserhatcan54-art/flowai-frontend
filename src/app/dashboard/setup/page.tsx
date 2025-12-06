"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [planActive, setPlanActive] = useState(false);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      setShopName(decoded.shopName);
      setLink(`https://flowai.link/${decoded.shopId}`);
      setPlanActive(decoded.activePlan ? true : false);
    } catch {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080A22] to-[#190542] text-white px-16 py-14">

      <h1 className="text-4xl font-bold mb-2">🚀 Kuruluma Başla</h1>

      <p className="opacity-80 text-lg mb-12">
        {shopName} mağazan için aşağıdaki adımları takip ederek yapay zeka asistanını aktif hale getirebilirsin.
      </p>

      {/* ÖDEME YOKSA BİLGİ KUTUSU */}
      {!planActive && (
        <div className="bg-red-600/20 border border-red-400 p-8 rounded-xl text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">🔒 Önce abonelik başlat</h2>
          <p className="opacity-90 mb-6">
            Yapay zeka aktif olmadan QR Kod, Link ve Chrome Uzantısı kullanılamaz.
          </p>

          <a
            href="/dashboard/settings"
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg"
          >
            💳 Üyeliği Aktif Et
          </a>

          <p className="text-sm opacity-70 mt-4">
            7 gün içinde koşulsuz iptal & iade garantisi 💙
          </p>
        </div>
      )}

      {/* PLAN AKTİFSE ADIMLAR */}
      {planActive && (
        <div className="space-y-10 max-w-3xl">

          {/* 1. ADIM */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-3">1️⃣ Chrome Uzantısını Kur</h2>
            <p className="opacity-90 mb-4">
              Mağazandaki tüm ürünleri yapay zekaya aktarmak için tarayıcı eklentisini kur.
            </p>

            <a
              href="https://chrome.google.com/webstore/category/extensions"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg inline-block"
            >
              🧩 Chrome Eklentisini Aç
            </a>
          </div>

          {/* 2. ADIM */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-3">2️⃣ Ürünlerini Aktar</h2>
            <p className="opacity-90">
              Eklentiyi açtıktan sonra “Ürünleri Aktar” butonuna tıkla.<br/>
              Sistem ürünlerini Firestore'a kaydedecek ve AI bu ürünlerden beslenmeye başlayacak.
            </p>
          </div>

          {/* 3. ADIM */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-3">3️⃣ Link ve QR Kodunu Al</h2>
            <p className="opacity-90 mb-5">
              Müşterilerin AI asistanına erişmesi için aşağıdaki link senin mağazana özel oluşturuldu:
            </p>

            <div className="bg-black/30 rounded p-4 font-mono break-all text-sm">
              {link}
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(link)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg"
            >
              📋 Linki Kopyala
            </button>
          </div>

          {/* 4. ADIM */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-3">4️⃣ Sitenize Koyun</h2>

            <p className="opacity-90 leading-relaxed">
              🟣 Trendyol – Ürün açıklamalarının en altına koy.<br />
              🟡 Hepsiburada – Ürün açıklamasına ekle.<br />
              🟠 Instagram – Bio kısmına ekle.<br />
              🟢 WhatsApp – Otomatik mesajına ekle “Sorunuz için tıklayın” şeklinde.<br />
              🟡 Kargo kutusu içine QR koy <br />
              🟣 Kartvizite QR bas <br />
              🧾 Teşekkür notlarının üzerine ekle <br />
            </p>

            <p className="mt-6 text-md opacity-90 font-semibold">
              👉 Müşteri QR okuttuğunda yapay zekanın olduğu sayfa açılır.  
              Doğrudan soru sorar ve ürün satışı başlar! 🚀🔥
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
