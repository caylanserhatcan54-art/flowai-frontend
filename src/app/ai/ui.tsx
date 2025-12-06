"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatUI() {
  const params = useSearchParams();
  const shopId = params.get("shopId") || "default";

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);

    const resp = await fetch(
      "https://ai-shop-backend-2.onrender.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          message: input,
        }),
      }
    );

    const data = await resp.json();

    const botMsg = {
      role: "assistant",
      content: data.reply || "Yanıt alınamadı...",
    };

    setMessages((m) => [...m, botMsg]);
    setInput("");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">FlowAI Asistan</h1>
        <p className="text-gray-600 mb-4">Mağaza ID: {shopId}</p>

        <div className="h-96 overflow-y-auto border p-4 rounded bg-gray-50 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-3"
            placeholder="Mesaj yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-xl"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
