"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const bgPattern = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
  <rect width='140' height='140' fill='transparent'/>
  <text x='10' y='28' fill='#38bdf8' font-size='14' font-family='Arial'>FlowAI</text>
  <text x='70' y='90' fill='#a855f7' font-size='14' font-family='Arial'>FlowAI</text>
  <circle cx='110' cy='25' r='3' fill='#22c55e' />
  <circle cx='30' cy='100' r='2' fill='#f97316' />
</svg>
`);

export default function AiPage() {
  const searchParams = useSearchParams();
  const [shopId, setShopId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Merhaba, ben FlowAI mağaza asistanıyım. Size nasıl yardımcı olabilirim?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const urlId = searchParams.get("shopId");
    const stored = localStorage.getItem("shopId");

    if (urlId) {
      setShopId(urlId);
      localStorage.setItem("shopId", urlId);
    } else if (stored) {
      setShopId(stored);
    }
  }, [searchParams]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || !shopId) return;

    const msg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId, message: msg }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.result || "Şu an yardımcı olamıyorum.",
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Bağlantı hatası. Lütfen tekrar deneyin.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: "#050816",
        backgroundImage: `url("data:image/svg+xml,${bgPattern}")`,
        backgroundSize: "140px 140px",
      }}
    >
      <div className="w-full max-w-2xl h-[90vh] bg-black/60 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col">
        
        <div className="p-5 border-b border-white/10 text-white">
          <div className="text-sm uppercase tracking-widest text-emerald-400">
            FlowAI
          </div>
          <div className="text-xl font-semibold">Mağaza Yapay Zekâ Asistanı</div>
          {shopId && <div className="text-xs text-gray-400">Mağaza ID: {shopId}</div>}
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-3">
          {messages.map((m, index) => (
            <div key={index} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-emerald-500 text-black"
                    : "bg-white/10 text-white border border-white/10"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-xs text-gray-400">FlowAI yazıyor...</div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <textarea
              className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl p-3 resize-none"
              rows={2}
              placeholder="Bir şey sorabilirsiniz..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={sendMessage}
              className="px-5 py-3 bg-emerald-500 text-black font-semibold rounded-xl"
            >
              Gönder
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
