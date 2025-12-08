"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

export default function ShopPage({ params }: { params: any }) {
  const { shopId } = params;
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${BACKEND}/api/public/shop/${shopId}`);
        const json = await res.json();
        const list = json?.platforms?.[0]?.products || [];
        setProducts(list);
      } catch (err) {
        console.log("Ürün çekilemedi", err);
      }
      setLoadingProducts(false);
    }

    loadProducts();
  }, [shopId]);

  async function sendMessage() {
    if (!input.trim()) return;

    const myMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, myMsg]);
    setInput("");

    try {
      const res = await fetch(`${BACKEND}/api/public/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: myMsg.text, shopId }),
      });

      const json = await res.json();

      const aiMsg = { role: "ai", text: json.reply || "Cevap alınamadı" };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.log("Chat API error", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Şuan yardımcı olamıyorum ☹️" },
      ]);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070B24] to-[#1A0050] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🛍 FlowAI Mağaza Asistanı</h1>

      {/* PRODUCT LIST */}
      <div className="bg-white/10 p-6 rounded-xl border border-white/10 mb-10">
        <h2 className="text-xl font-semibold mb-4">Mağazadaki Ürünler</h2>

        {loadingProducts ? (
          <p>⏳ Ürünler yükleniyor...</p>
        ) : products.length === 0 ? (
          <p>❌ Mağazada ürün bulunamadı</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                className="bg-black/30 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition"
              >
                <img src={p.image} className="w-full h-40 object-cover" />
                <div className="p-3 text-sm">
                  <p className="font-medium line-clamp-2">{p.title}</p>
                  <p className="text-green-400 font-semibold mt-1">{p.price}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* AI CHAT SECTION */}
      <div className="bg-white/10 p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">💬 FlowAI Asistan</h2>

        <div className="h-72 overflow-y-auto flex flex-col gap-3 p-3 bg-black/20 rounded-lg border border-white/10">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-xl max-w-[70%] whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-blue-600 ml-auto text-right"
                  : "bg-slate-800 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* MESSAGE INPUT */}
        <div className="flex gap-3 mt-4">
          <input
            className="flex-1 bg-black/30 border border-white/30 rounded-lg px-4 py-3 outline-none"
            placeholder="Bir şey yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-600 px-6 rounded-lg text-black font-semibold"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
