"use client";

import { useEffect, useState } from "react";

const BACKEND = "https://ai-shop-backend-2.onrender.com";

type Product = {
  id?: string;
  platform: string;
  title: string;
  price: string;
  image: string;
  url: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function PublicShopPage({
  params,
}: {
  params: { shopId: string };
}) {
  const { shopId } = params;

  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Merhaba 👋 Ben FlowAI. Bu mağazanın ürünleri hakkında sorularınızı cevaplayabilirim. Ne arıyorsunuz?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    async function loadShop() {
      try {
        const res = await fetch(`${BACKEND}/api/public/shop/${shopId}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.ok) {
          setShop(data.shop);

          const flat: Product[] = [];
          for (const p of data.platforms || []) {
            for (const pr of p.products || []) {
              flat.push({
                platform: p.platform,
                title: pr.title,
                price: pr.price,
                image: pr.image,
                url: pr.url,
              });
            }
          }

          setProducts(flat);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadShop();
  }, [shopId]);

  async function sendMessage() {
    if (!input.trim() || sending) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
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
          { role: "assistant", content: data.reply ?? "..." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Şu anda bir sorun oluştu, lütfen tekrar dener misiniz?",
          },
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Bağlantı hatası oluştu. Lütfen tekrar deneyin.",
        },
      ]);
    } finally {
      setInput("");
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        Mağaza bulunamadı.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">FlowAI • Akıllı Mağaza Asistanı</p>
            <h1 className="text-lg font-semibold">
              {shop.id} için Yapay Zeka Asistanı
            </h1>
          </div>
          <div className="text-xs text-slate-400">
            Bu sayfa gerçek müşteriler için hazırlanmıştır.
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        {/* ÜRÜNLER */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-200 mb-2">
            Mağazadan Öne Çıkan Ürünler
          </h2>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {products.slice(0, 20).map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-2 hover:border-blue-500/70 transition"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-16 h-16 rounded object-cover bg-slate-800"
                />
                <div className="text-xs">
                  <p className="font-semibold text-slate-100 line-clamp-2">
                    {p.title}
                  </p>
                  <p className="text-emerald-400 mt-1">{p.price}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Platform: {p.platform}
                  </p>
                </div>
              </a>
            ))}

            {products.length === 0 && (
              <p className="text-sm text-slate-400">
                Bu mağaza için henüz ürün bulunamadı.
              </p>
            )}
          </div>
        </section>

        {/* CHAT */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 flex flex-col h-[70vh]">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Canlı Sohbet</p>
              <p className="text-sm font-semibold text-slate-100">
                FlowAI Mağaza Asistanı
              </p>
            </div>
            <span className="text-[10px] text-emerald-400">7/24 Aktif • AI</span>
          </div>

          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-blue-600 text-slate-50"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 px-4 py-3 space-y-2">
            <textarea
              rows={2}
              className="w-full rounded-lg bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Ürün, kombin, beden, kargo veya sipariş hakkında her şeyi sorabilirsin..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={sending}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 py-2 text-sm font-semibold"
            >
              {sending ? "Gönderiliyor..." : "Gönder"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
