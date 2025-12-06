"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ChatsPage() {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<any[]>([]);

  const shopId =
    typeof window !== "undefined" ? localStorage.getItem("shopId") : null;

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-shop-backend-1-um67.onrender.com/api";

  useEffect(() => {
    async function loadChats() {
      if (!shopId) return;

      const res = await fetch(
        `${API_URL}/chats/list?shopId=${shopId}`,
        {
          method: "GET",
          cache: "no-store"
        }
      );

      const data = await res.json();

      if (data.success) {
        setChats(data.chats);
      }

      setLoading(false);
    }

    loadChats();
  }, [shopId, API_URL]);

  if (loading) {
    return (
      <div className="text-gray-700 text-lg p-6">Sohbetler yükleniyor...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sohbetler</h1>

      {chats.length === 0 && (
        <p className="text-gray-600">Henüz sohbet yok.</p>
      )}

      <div className="space-y-3">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/dashboard/chats/${chat.id}`}
            className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">
              {chat.lastMessage || "Yeni Sohbet"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(chat.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
