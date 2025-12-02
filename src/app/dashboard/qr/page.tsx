"use client";

import { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";

export default function QRPage() {
  const API_URL = "https://flowai.com.tr/ai";
  const [shopId, setShopId] = useState<string | null>(null);
  const [finalQrUrl, setFinalQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = localStorage.getItem("shopId");
    setShopId(id);

    if (id) {
      generateQR(`${API_URL}?shopId=${id}`);
    }
  }, []);

  // -----------------------------------------------------
  // 🔥 QR + ALT YAZI PNG ÜRET (KÜÇÜLTÜLMÜŞ)
  // -----------------------------------------------------
  async function generateQR(text: string) {
    const qrCanvas = document.createElement("canvas");
    await QRCode.toCanvas(qrCanvas, text, {
      width: 380,       // küçültülmüş QR
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" }
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 380;
    const height = 550;
    canvas.width = width;
    canvas.height = height;

    // Arka plan
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // QR Çiz
    ctx.drawImage(qrCanvas, 0, 0, width, width);

    // Yazılar
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial"; // küçültüldü
    ctx.textAlign = "center";

    ctx.fillText(
      "QR’ı okutarak veya açıklamadaki linke",
      width / 2,
      420
    );

    ctx.fillText(
      "tıklayarak AI asistanını kullanabilirsiniz",
      width / 2,
      455
    );

    const pngUrl = canvas.toDataURL("image/png");
    setFinalQrUrl(pngUrl);
  }

  function downloadQR() {
    const a = document.createElement("a");
    a.href = finalQrUrl;
    a.download = "flowai-qr.png";
    a.click();
  }

  return (
    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        📌 AI Link & QR Kod
      </h1>

      <p className="text-gray-700 mb-6">
        Bu QR kod ve link, müşterilerin mağazanızın AI asistanına hızlıca
        ulaşmasını sağlar. Her mağazaya özel tek bir link ve QR üretilir.
      </p>

      {/* QR ALANI */}
      <div className="bg-white p-6 rounded-xl border border-gray-300 shadow mb-6 text-center">
        <canvas ref={canvasRef} className="hidden" />

        {finalQrUrl ? (
          <>
            <img src={finalQrUrl} className="mx-auto mb-4 w-[380px]" />
            <button
              onClick={downloadQR}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              📥 QR Kodu İndir
            </button>
          </>
        ) : (
          <p className="text-gray-700">QR hazırlanıyor...</p>
        )}
      </div>

      {/* AI LİNK */}
      <label className="text-gray-900 font-semibold block mb-2">
        AI Asistan Linki
      </label>

      <input
        type="text"
        readOnly
        value={`${API_URL}?shopId=${shopId}`}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 mb-8"
      />

      {/* KULLANIM TALİMATLARI */}
<div className="bg-gray-100 p-6 rounded-xl border border-gray-300">
  <h2 className="text-xl font-bold text-gray-900 mb-3">
    📝 QR Kod ve Link Nasıl Kullanılmalı?
  </h2>

  <ul className="list-disc ml-6 text-gray-800 space-y-2">

    <li>
      <strong>QR kodunu ürün fotoğraflarının en sonuna ekleyin.</strong><br />
      Aşağıdaki tüm e-ticaret sitelerinde kullanılabilir:
      Trendyol, Hepsiburada, N11, Shopier, Shopify, İkas,
      ÇiçekSepeti, IdeaSoft.
    </li>

    <li>
      <strong>Alt yazı dahil üretilen PNG görselini yükleyin.</strong><br />
      Müşteri QR’ı okuttuğunda doğrudan mağaza AI asistanınıza yönlendirilir.
    </li>

    <li>
      <strong>Ürün açıklaması (description) kısmına AI linkini ekleyin:</strong><br />
      <span className="font-mono bg-white px-2 py-1 rounded border">
        {`${API_URL}?shopId=${shopId}`}
      </span>
    </li>

    <li>
      AI asistanı müşterilere ürün önerisi, kombin önerisi,
      uygun ürün bulma, şikayet çözme, boya – hırdavat – elektronik teknik rehberi sağlar.
    </li>

    <li>
      <strong>QR ve link tamamen mağazanıza özeldir.</strong><br />
      Her müşteri kendi mağazanızın AI asistanına gider, mağazalar karışmaz.
    </li>
        </ul>
      </div>
    </div>
  );
}
