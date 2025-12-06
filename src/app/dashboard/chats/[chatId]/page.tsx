"use client";

import { useEffect, useState } from "react";

export default function ChatDetailPage({ params }: any) {
  const { chatId } = params;

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-2.onrender.com";

  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch(
          `${API}/chats/detail?chatId=${chatId}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (data.success) {
          setMessages(data.messages);
        }

        setLoading(false);
      } catch (err) {
        console.error("Chat detail error:", err);
        setLoading(false);
      }
    }

    loadMessages();
  }, [chatId, API]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sohbet Detayı</h1>

      {loading ? (
        <p>Sohbet yükleniyor...</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
