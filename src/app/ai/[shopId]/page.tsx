"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function AiChatPage() {
  const { shopId } = useParams(); // 🔥 BURADAN ALIYORUZ
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!shopId) return;

    setMessages([
      {
        role: "assistant",
        content:
          `Merhaba 👋 Ben FlowAI! '${shopId}' mağazasına özel ürün tavsiyesi yapabilirim. Ne arıyorsun?`,
      },
    ]);
  }, [shopId]);

  async function sendMessage() {
    if (!input.trim()) return;

    if (!shopId) {
      alert("Shop ID alınamadı!");
      return;
    }

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,     // 🔥 Kesin gidiyor
          messages: newMessages,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "Şu an cevap üretemiyorum.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Bağlantı hatası, tekrar dene.",
        },
      ]);
    }

    setInput("");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0A0F2B] text-white flex flex-col">
      <div className="p-4 text-center border-b border-white/10 text-lg font-semibold">
        FlowAI Chat – {(shopId as string)?.toUpperCase()}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <div className="bg-blue-600 p-2 rounded-md ml-auto w-fit">
                {m.content}
              </div>
            ) : (
              <div className="bg-white/20 p-2 rounded-md w-fit whitespace-pre-line">
                {m.content}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-sm opacity-50 animate-pulse">AI yazıyor...</div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 flex gap-2">
        <input
          className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2"
          placeholder="Ürün, kategori veya ihtiyacını yaz..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 px-4 py-2 rounded-md"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
