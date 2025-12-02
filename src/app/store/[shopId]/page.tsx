"use client";

import { useEffect, useState } from "react";

export default function StorePage({ params }: { params: { shopId: string } }) {
  const { shopId } = params;

  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function fetchShop() {
      try {
        const res = await fetch(`/api/shop/public/${shopId}`);
        const data = await res.json();

        if (data.ok) {
          setShop(data.shop);
          setPlatforms(data.platforms || []);
        }
      } catch (err) {
        console.error("SHOP_LOAD_ERROR", err);
      }

      setLoading(false);
    }

    fetchShop();
  }, [shopId]);

  async function sendMessage() {
    if (!input.trim()) return;
    if (!shopId) return;

    setSending(true);

    const userMsg = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          conversationId,
          message: input,
          platform: "public",
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setConversationId(data.conversationId);

        const botMsg = {
          role: "assistant",
          content: data.reply,
        };

        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error("SEND_MESSAGE_ERROR", err);
    }

    setInput("");
    setSending(false);
  }

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-700">
        Yükleniyor...
      </div>
    );

  if (!shop)
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-red-600">
        Mağaza bulunamadı.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full max-w-3xl bg-white shadow-sm px-6 py-4 mt-6 rounded-xl flex items-center gap-4">
        {shop.logoUrl ? (
          <img
            src={shop.logoUrl}
            className="h-14 w-14 rounded-lg object-cover border"
          />
        ) : (
          <div className="h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
            🛍️
          </div>
        )}

        <div>
          <h1 className="text-xl font-bold">{shop.name}</h1>
          <p className="text-sm text-gray-500">
            FlowAI - Akıllı Satış Asistanı
          </p>
        </div>
      </div>

      {/* ÜRÜNLER ALANI */}
      <div className="w-full max-w-3xl mt-4">
        <h2 className="text-lg font-semibold mb-2">Popüler Ürünler</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {platforms.flatMap((p) => p.products).slice(0, 6).map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-3"
            >
              <img
                src={product.image}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
              <p className="text-xs text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT ALANI */}
      <div className="w-full max-w-3xl mt-6 bg-white rounded-xl shadow p-4 mb-10">

        <h2 className="text-lg font-semibold">Yapay Zeka Asistanı</h2>

        <div className="mt-4 h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>

        {/* MESAJ + FOTO */}
        <div className="mt-4 flex items-center gap-2">
          <label className="px-3 py-2 bg-gray-200 rounded-lg cursor-pointer">
            📷
            <input type="file" className="hidden" />
          </label>

          <input
            className="flex-1 px-3 py-2 border rounded-lg"
            placeholder="Mesajınızı yazın..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={sending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
