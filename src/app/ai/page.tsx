"use client";

import { useState, useEffect } from "react";
import { apiFetch, API_URL } from "@/lib/api";

export default function AIChatPage({ searchParams }: any) {
  const shopId = searchParams.shop || "default";

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMsg]);

    const prevMessages = [...messages, newUserMsg];
    setInput("");
    setLoading(true);

    // 🔥 Chat endpoint'i apiFetch ile kullanıyoruz
    const data = await apiFetch("/ai/chat", {
      method: "POST",
      body: JSON.stringify({
        shopId,
        message: newUserMsg.text,
        history: prevMessages,
      }),
    });

    if (!data.ok) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Backend bağlantısı kurulamadı." },
      ]);
      setLoading(false);
      return;
    }

    const aiReply = data.reply || "Boş yanıt döndü.";

    setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg mt-10 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-4 text-lg font-bold">
          FlowAI – Mağaza Asistanı
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[600px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {/* Ürün kartı destekli mesaj */}
              {msg.text.includes("<product-card>")
                ? <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                : msg.text}
            </div>
          ))}

          {loading && (
            <div className="p-3 bg-gray-200 rounded-lg text-gray-600">
              Yazıyor...
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="p-3 border-t flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2"
            value={input}
            placeholder="Mesaj yaz..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
