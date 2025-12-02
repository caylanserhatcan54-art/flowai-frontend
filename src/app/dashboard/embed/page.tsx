"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function EmbedPage() {
  const shopId = "demo-dükkanı";

  const script = `<script src="https://returned-freelance-mails-logo.trycloudflare.com/chat-widget.js" data-shop-id="${shopId}"></script>`;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chatbot Embed Kodun</h1>

      <p className="mb-2">Bu kodu sitene ekle:</p>

      <textarea
        readOnly
        className="w-full p-3 border rounded bg-gray-100"
        rows={4}
        value={script}
      />

      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigator.clipboard.writeText(script)}
      >
        Kopyala
      </button>

      <h2 className="text-xl font-semibold mt-6">QR Kod</h2>

      <QRCodeCanvas
        value={`https://yourdomain.com/chat?shop=${shopId}`}
        size={160}
        className="mt-3"
      />
    </div>
  );
}
