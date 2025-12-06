"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

// 🔥 TYPE tanımlıyoruz!
// Artık messages dizisi type-safe!
type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ShopType = {
  name: string;
};

export default function StoreUI({ shopId }: { shopId: string }) {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<ShopType | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
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

    // 🔥 Type uyumlu şekilde ekliyoruz
    setMessages((prev) => [...prev, { role: "user", content: input }]);
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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    }

    setInput("");
    setSending(false);
  }

  if (loading) return <div>Yükleniyor...</div>;
  if (!shop) return <div>Mağaza bulunamadı</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>{shop.name}</h1>

      {/* 🧠 Basit mesaj gösterme */}
      <div style={{ marginTop: 20, padding: 10, background: "#f5f5f5" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ padding: 6 }}>
            <b>{m.role === "user" ? "👤 Müşteri" : "🤖 Asistan"}</b>:
            <span style={{ marginLeft: 8 }}>{m.content}</span>
          </div>
        ))}
      </div>

      {/* ✍ Mesaj Yazma */}
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesaj yaz..."
          style={{ flex: 1, padding: 10, border: "1px solid #ccc" }}
        />

        <button
          onClick={sendMessage}
          disabled={sending}
          style={{
            padding: "10px 20px",
            marginLeft: 10,
            background: sending ? "#aaa" : "#007bff",
            color: "white",
            borderRadius: 6,
          }}
        >
          {sending ? "..." : "Gönder"}
        </button>
      </div>
    </div>
  );
}
