"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AIChatPage() {
  const { shopId } = useParams();
  const [loading, setLoading] = useState(true);
  const [shopExists, setShopExists] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Merhaba 👋 Ben FlowAI! Bu mağazanın ürünleri hakkında bilgi isteyebilirsin. Hangi ürünü arıyorsun?"
    }
  ]);
  const [input, setInput] = useState("");

  const BACKEND = "https://ai-shop-backend-2.onrender.com";

  // mağaza kontrol
  async function checkShop() {
    try {
      const res = await fetch(`${BACKEND}/api/public/shop/${shopId}`);
      const data = await res.json();

      if (data?.ok) {
        setShopExists(true);
      } else {
        setShopExists(false);
      }
      
    } catch {
      setShopExists(false);
    }
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const msg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput("");

    try {
      const res = await fetch(`${BACKEND}/api/public/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shopId,
          message: msg
        })
      });

      const data = await res.json();

      if (data?.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Şu anda cevap veremiyorum, tekrar dener misiniz?" }]);
      }

    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Bağlantı hatası ❌ Daha sonra tekrar dene." }]);
    }
  }

  useEffect(() => {
    checkShop();
  }, []);

  // Yükleniyor ekranı
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Yükleniyor...
      </div>
    );
  }

  if (!shopExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white text-center gap-4">
        <h1 className="text-3xl font-bold">❌ Mağaza bulunamadı</h1>
        <p>Bu mağaza aktif olmayabilir veya henüz tanımlanmamış olabilir.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06071A] to-[#120022] text-white flex flex-col">

      {/* Mesaj alanı */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
              msg.role === "assistant"
                ? "bg-[#25104A] text-purple-200"
                : "bg-blue-600 text-white ml-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Mesaj Input */}
      <div className="p-4 border-t border-white/10 bg-black/30 flex gap-3">
        <input
          type="text"
          value={input}
          placeholder="Mesaj yaz..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-semibold"
        >
          Gönder 🚀
        </button>
      </div>
    </div>
  );
}
