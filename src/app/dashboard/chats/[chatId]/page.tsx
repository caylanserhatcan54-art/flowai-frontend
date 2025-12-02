"use client";

import { useEffect, useState } from "react";

export default function ChatDetailPage({ params }: any) {
  const { chatId } = params;

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const res = await fetch(
        `http://localhost:4000/chats/detail?chatId=${chatId}`
      );

      const data = await res.json();
      if (data.success) setMessages(data.messages);

      setLoading(false);
    }

    loadMessages();
  }, [chatId]);

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
