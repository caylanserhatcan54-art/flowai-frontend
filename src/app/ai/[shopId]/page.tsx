"use client";

import { useEffect, useState, useRef } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

type Message = {
  role: "user" | "assistant";
  content: string;
  productImage?: string;
  productUrl?: string;
};

export default function ChatPage({ params }: { params: { shopId: string } }) {
  const { shopId } = params;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Merhaba 👋 Ben FlowAI! Bu mağazanın ürünleri hakkında bilgi isteyebilirsin. Hangi ürünü arıyorsun?",
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll aşağı sabit
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(`${BACKEND}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          message: userMsg.content,
          conversationId,
          platform: "public",
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setConversationId(data.conversationId);

        const assistantMsg: Message = {
          role: "assistant",
          content: data.reply,
          productImage: data.productImage,
          productUrl: data.productUrl,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Şu anda cevap veremiyorum, tekrar dener misiniz?",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Bağlantı hatası oluştu.",
        },
      ]);
    }

    setSending(false);
  }

  return (
    <div className="min-h-screen bg-[#05060A] text-white flex flex-col items-center">
      <header className="bg-[#0D101A] border-b border-gray-800 w-full p-4 text-center text-sm tracking-wide">
        FlowAI – Akıllı Mağaza Asistanı
      </header>

      <div
        ref={chatRef}
        className="flex-1 w-full max-w-lg px-4 py-4 overflow-y-auto space-y-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line leading-relaxed shadow-md ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-100"
              }`}
            >
              {m.content}

              {m.productImage && (
                <div className="mt-2">
                  <img
                    src={m.productImage}
                    className="rounded-lg w-full"
                    alt="Ürün"
                  />
                </div>
              )}

              {m.productUrl && (
                <a
                  href={m.productUrl}
                  target="_blank"
                  className="block text-xs underline text-emerald-300 mt-1"
                >
                  Ürüne Git
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 w-full max-w-lg p-3 bg-[#0D101A]">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ürün, beden, fiyat, kargo, kombin… sorabilirsin"
          className="w-full bg-[#12131A] text-sm p-3 rounded-lg border border-gray-700 outline-none resize-none"
        />

        <button
          onClick={sendMessage}
          disabled={sending}
          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 py-3 rounded-lg font-semibold"
        >
          {sending ? "Gönderiliyor..." : "Gönder"}
        </button>
      </div>
    </div>
  );
}
