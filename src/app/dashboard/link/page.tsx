"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LinkPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState("");
  const [link, setLink] = useState("");
  const [planActive, setPlanActive] = useState(false);
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      setShopName(decoded.shopName);
      setLink(`https://flowai.link/${decoded.shopId}`);

      // aktif plan var mı?
      setPlanActive(decoded.activePlan ? true : false);

      // QR url hazır!
      setQrImage(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://flowai.link/${decoded.shopId}`);
    } catch {
      router.push("/login");
    }
  }, []);

  function downloadQR() {
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = "flowai-qr.png";
    a.click();
  }

  return (
    <div className="min-h-screen px-16 py-12 text-white bg-gradient-to-br from-[#080A22] to-[#190542]">

      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        🔗 AI Link & QR Kod
      </h1>
      <p className="opacity-80 mb-10 max-w-xl">
        Mağazana özel QR kodu ve linki buradan alabilirsin. Bu kodları mağaza bannerı,
        WhatsApp mesajların, ürün açıklamaları veya promosyon kartlarında kullanabilirsin.
      </p>

      {/* 🟥 ÖDEME YOKSA GÖRÜNEN ALAN */}
      {!planActive && (
        <div className="bg-red-600/20 border border-red-400 p-10 rounded-xl text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-2">🔒 Bu özellik aktif değil</h2>
          <p className="opacity-90 mb-6">
            QR kod ve özel link yalnızca aktif üyeliklerde kullanılabilir.
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

      {planActive && (
        <div className="flex gap-14">

          {/* SOL BLOK */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8 w-[420px]">
            <h2 className="text-xl font-semibold mb-2">🌐 Mağazana Özel Link</h2>

            <div className="bg-black/30 rounded p-4 font-mono text-sm break-all">
              {link}
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(link)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
            >
              📋 Linki Kopyala
            </button>

            <hr className="my-8 opacity-40" />

            <h2 className="text-xl font-semibold mb-4">🧾 QR Kod</h2>

            <img
              src={qrImage}
              className="w-48 h-48 border border-white/20 rounded-lg mx-auto"
            />

            <button
              onClick={downloadQR}
              className="mt-6 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg w-full"
            >
              ⬇ QR Kod İndir
            </button>
          </div>

          {/* SAĞ TARAF BİLGİ KUTUSU */}
          <div className="flex flex-col justify-center max-w-xl leading-relaxed opacity-90 space-y-6">

            <div>
              <h3 className="text-2xl font-semibold mb-2">Bu Linki Nereye Koymalısın?</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Trendyol ürün açıklamasına</li>
                <li>Hepsiburada ürün açıklamasına</li>
                <li>Instagram bio alanına</li>
                <li>WhatsApp otomatik mesajına</li>
                <li>Sipariş teşekkür mesajına</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">QR Kod Nereye Koymalısın?</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Ürün paketlemesine</li>
                <li>Hediye notuna</li>
                <li>Kargo kutusuna</li>
                <li>Teşekkür kartlarına</li>
                <li>Kampanya broşürüne</li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
