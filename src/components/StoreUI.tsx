"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-1-um67.onrender.com";

export default function StoreUI({ shopId }: { shopId: string }) {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);
  const [platforms, setPlatforms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function loadShop() {
      const res = await fetch(`${BACKEND}/api/public/shop/${shopId}`);
      const data = await res.json();

      if (data.ok) {
        setShop(data.shop);
        setPlatforms(data.platforms || []);
      }
      setLoading(false);
    }

    loadShop();
  }, [shopId]);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setSending(true);

    const res = await fetch(`${BACKEND}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopId,
        conversationId,
        message: input,
        platform: "public",
      }),
    });

    const data = await res.json();

    if (data.ok) {
      setConversationId(data.conversationId);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    }

    setInput("");
    setSending(false);
  }

  if (loading) return <div>Yükleniyor...</div>;
  if (!shop) return <div>Mağaza bulunamadı</div>;

  return (
    <div>
      <h1>{shop.name}</h1>
      {/* Buraya ürün listesi + chat UI koyacağız */}
    </div>
  );
}
