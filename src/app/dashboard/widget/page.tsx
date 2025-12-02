"use client";

import { useState, useEffect } from "react";

export default function WidgetCodePage() {
  const [shopId, setShopId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("shopId");
    setShopId(id || "SHOP_ID_BULUNAMADI");
  }, []);

  const widgetCode = `<script src="https://technologies-share-mistress-eating.trycloudflare.com/widget.js"
  data-shop-id="${shopId}"></script>`;

  return (
    <div className="max-w-4xl mx-auto text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Chat Widget Kodu</h1>

      <p className="text-gray-700 mb-4">
        Aşağıdaki kodu mağazanızın HTML alanına ekleyerek FlowAI sohbet widgetını 
        sitenizde aktif edebilirsiniz.
      </p>

      {/* Kod Kutusu */}
      <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm overflow-x-auto">
{widgetCode}
      </pre>

      <button
        onClick={() => navigator.clipboard.writeText(widgetCode)}
        className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Kodu Kopyala
      </button>

      {/* REHBER */}
      <div className="mt-10 p-6 bg-white rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">🛠 FlowAI Kurulum Rehberi</h2>

        {/* SHOPIER */}
        <h3 className="text-lg font-semibold mt-4 text-gray-900">🟢 Shopier’e Kurulum</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Shopier → Mağaza Ayarları</li>
          <li>Tema / Tasarım Ayarları → Ek HTML Kod Alanı</li>
          <li>Kodu yapıştır → Kaydet</li>
        </ul>

        {/* SHOPIFY */}
        <h3 className="text-lg font-semibold mt-6 text-gray-900">🟧 Shopify’a Kurulum</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Shopify Admin → Online Store → Themes</li>
          <li>Customize → Theme Settings → Edit Code</li>
          <li>"theme.liquid" dosyasını aç</li>
          <li>&lt;/body&gt; etiketinin hemen üstüne widget kodunu yapıştır</li>
        </ul>

        {/* İKAS */}
        <h3 className="text-lg font-semibold mt-6 text-gray-900">🟪 İkas’a Kurulum</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>İkas Yönetim Paneli → Tema Düzenleme</li>
          <li>Ek Kod Alanı → Footer Code</li>
          <li>Kodu yapıştır → Kaydet</li>
        </ul>

        {/* NOT */}
        <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <b>⚠️ ÖNEMLİ:</b> Trendyol ve Hepsiburada mağazalarında HTML ekleme özelliği 
          bazı satıcılarda kapalı olabilir. Bu nedenle widget eklenemeyebilir.
        </div>
      </div>
    </div>
  );
}
