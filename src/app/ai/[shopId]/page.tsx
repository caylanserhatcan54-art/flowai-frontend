"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function AIChatPage() {
  const { shopId } = useParams();
  const [loading, setLoading] = useState(true);
  const [shopExists, setShopExists] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Merhaba 👋 Ben FlowAI! Bu mağazanın ürünleri hakkında bilgi isteyebilirsin. Hangi ürünü arıyorsun?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // Mağaza var mı kontrol et
  useEffect(() => {
    async function checkShop() {
      try {
        const res = await fetch(`${BACKEND}/api/public/shop/${shopId}`);
        const data = await res.json();

        if (data?.ok) {
          setShopExists(true);
        } else {
          setShopExists(false);
        }
      } catch (e) {
        setShopExists(false);
      } finally {
        setLoading(false);
      }
    }

    checkShop();
  }, [shopId]);

  async function sendMessage() {
    if (!input.trim() || sending) return;

    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);

    try {
      // 🔥 DOĞRU ENDPOINT: /api/ai/chat
      const res = await fetch(`${BACKEND}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopId,              // hangi mağaza?
          message: text,       // müşterinin mesajı
          platform: "public",  // public widget/chat
        }),
      });

      const data = await res.json();

      if (data?.ok && data?.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply as string },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Şu anda yanıt veremiyorum, lütfen biraz sonra tekrar dene. ❌",
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Bağlantı hatası ❌ Lütfen daha sonra tekrar dene.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06071A] text-white text-xl">
        Yükleniyor...
      </div>
    );
  }

  if (!shopExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#06071A] text-white text-center gap-4 px-4">
        <h1 className="text-3xl font-bold">❌ Mağaza bulunamadı</h1>
        <p>
          Bu AI linkine bağlı mağaza pasif olabilir veya henüz oluşturulmamış
          olabilir.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06071A] to-[#120022] text-white flex flex-col">
      {/* HEADER */}
      <header className="px-4 py-3 border-b border-white/10 bg-black/30 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
          AI
        </div>
        <div>
          <p className="text-sm font-semibold">FlowAI Asistan</p>
          <p className="text-[11px] text-emerald-300">Bu mağaza için özelleştirildi</p>
        </div>
      </header>

      {/* MESAJLAR */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-[#241036] text-purple-100 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ürün, tarz veya soru yaz..."
          className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={sending}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm font-semibold disabled:opacity-60"
        >
          Gönder 🚀
        </button>
      </div>
    </div>
  );
}
