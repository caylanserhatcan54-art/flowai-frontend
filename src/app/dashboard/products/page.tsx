"use client";

import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type Product = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number | string;
  platform?: string;
  [key: string]: any;
};

type AiMode = "description" | "title" | "tags" | null;

export default function DashboardProductsPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [shopId, setShopId] = useState("");
  const [platform, setPlatform] = useState("trendyol");
  const [error, setError] = useState<string | null>(null);

  const [aiLoading, setAiLoading] = useState<AiMode>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiResultTitle, setAiResultTitle] = useState<string>("AI Sonucu");
  const [aiTargetProduct, setAiTargetProduct] = useState<Product | null>(null);

  const PLATFORMS = [
    { value: "trendyol", label: "Trendyol" },
    { value: "hepsiburada", label: "Hepsiburada" },
    { value: "n11", label: "N11" },
    { value: "shopier", label: "Shopier" },
    { value: "shopify", label: "Shopify" },
    { value: "amazon", label: "Amazon TR" },
    { value: "ikas", label: "İkas" },
    { value: "ciceksepeti", label: "Çiçeksepeti" },
    { value: "ideasoft", label: "IdeaSoft" },
  ];

  // LOGIN SONRASI KAYDEDİLEN shopId'yi çek
  useEffect(() => {
    const storedShopId = typeof window !== "undefined"
      ? window.localStorage.getItem("shopId")
      : null;
    if (storedShopId) setShopId(storedShopId);
  }, []);

  // ÜRÜN LİSTELEME
  const fetchProducts = async () => {
    if (!shopId) {
      setError("Geçerli bir shopId bulunamadı. Lütfen tekrar giriş yap.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/products/list?shopId=${shopId}&platform=${platform}`;

      console.log("👉 Ürün listeleme isteği:", url);

      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Backend ürün listeleme hata cevabı:", text);
        throw new Error("Backend ürün listeleme hatası");
      }

      const data = await res.json();
      console.log("📦 Backend ürün response:", data);

      setProducts(data.products || []);
    } catch (err: any) {
      console.error("❌ Fetch ürün error:", err);
      setError(err.message || "Ürünler alınamadı");
    } finally {
      setLoading(false);
    }
  };

  // shopId veya platform değişince otomatik yenile
  useEffect(() => {
    if (shopId) fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, platform]);

  // ORTAK AI İSTEK FONKSİYONU
  const callAi = async (mode: AiMode, product: Product) => {
    if (!mode) return;

    setAiLoading(mode);
    setAiResult(null);
    setAiTargetProduct(product);

    try {
      let endpoint = "";
      let title = "";

      if (mode === "description") {
        endpoint = "/api/ai/description";
        title = "AI Ürün Açıklaması";
      } else if (mode === "title") {
        endpoint = "/api/ai/title";
        title = "AI SEO Başlık Önerileri";
      } else if (mode === "tags") {
        endpoint = "/api/ai/tags";
        title = "AI SEO Etiket Önerileri";
      }

      setAiResultTitle(title);

      const body: any = {
        title: product.title || product.name || "",
        description: product.description || "",
        platform: product.platform || platform,
      };

      // title endpoint'i description’a ihtiyaç duymuyor ama göndersek de sorun değil
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("🤖 AI response:", data);

      if (!data.ok) {
        throw new Error(data.error || "AI isteği başarısız");
      }

      setAiResult(data.result || "Boş yanıt döndü.");
    } catch (err: any) {
      console.error("❌ AI error:", err);
      setAiResult("AI isteği sırasında bir hata oluştu: " + err.message);
    } finally {
      setAiLoading(null);
    }
  };

  // ÜRÜN SİLME
  const deleteProduct = async (productId: string) => {
    if (!shopId) return;
    const confirmDelete = window.confirm("Bu ürünü silmek istediğine emin misin?");
    if (!confirmDelete) return;

    try {
      const url = `${API_BASE_URL}/products/${shopId}/${productId}`;
      const res = await fetch(url, { method: "DELETE" });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Ürün silme hata cevabı:", text);
        throw new Error("Ürün silinemedi");
      }

      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.error || "Ürün silme başarısız");
      }

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: any) {
      console.error("❌ Delete error:", err);
      alert("Ürün silinirken bir hata oluştu: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Ürün Yönetimi</h1>
            <p className="text-sm text-slate-400">
              Tüm platformlardaki ürünlerini görüntüle ve AI ile optimize et.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Shop ID:{" "}
              <span className="font-mono">
                {shopId || "Bulunamadı (tekrar giriş yap)"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300">Platform:</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-md text-sm"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchProducts}
              className="px-4 py-2 rounded-md bg-indigo-600 text-sm font-medium hover:bg-indigo-500"
            >
              Yenile
            </button>
          </div>
        </header>

        {/* HATA MESAJI */}
        {error && (
          <div className="rounded-md bg-red-900/40 border border-red-700 px-4 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        {/* YÜKLENME DURUMU */}
        {loading && (
          <div className="text-sm text-slate-400">Ürünler yükleniyor...</div>
        )}

        {/* ÜRÜN YOKSA */}
        {!loading && products.length === 0 && (
          <div className="text-sm text-slate-400">
            Bu mağaza ve platform için henüz ürün bulunamadı.
            <br />
            Chrome eklentisiyle ürün import ettikten sonra burada görünecek.
          </div>
        )}

        {/* ÜRÜN LİSTESİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => {
            const title = p.title || p.name || "Başlıksız Ürün";
            const desc = p.description || "";
            const plt = p.platform || platform;

            return (
              <div
                key={p.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex justify-between gap-2">
                  <div>
                    <h2 className="font-semibold text-sm line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-3">
                      {desc || "Açıklama bulunmuyor."}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Sil
                  </button>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Fiyat: {p.price ?? "-"}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800/80">
                    {plt}
                  </span>
                </div>

                {/* AI BUTONLARI */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => callAi("description", p)}
                    className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
                    disabled={!!aiLoading}
                  >
                    {aiLoading === "description"
                      ? "AI Açıklama…"
                      : "AI Açıklama"}
                  </button>
                  <button
                    onClick={() => callAi("title", p)}
                    className="text-xs px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-50"
                    disabled={!!aiLoading}
                  >
                    {aiLoading === "title"
                      ? "AI Başlık…"
                      : "AI Başlık"}
                  </button>
                  <button
                    onClick={() => callAi("tags", p)}
                    className="text-xs px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
                    disabled={!!aiLoading}
                  >
                    {aiLoading === "tags"
                      ? "AI Etiketler…"
                      : "AI Etiketler"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI MODAL */}
      {aiResult && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full mx-4 p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{aiResultTitle}</h2>
                {aiTargetProduct && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    Hedef Ürün:{" "}
                    {aiTargetProduct.title ||
                      aiTargetProduct.name ||
                      aiTargetProduct.id}
                  </p>
                )}
              </div>
              <button
                onClick={() => setAiResult(null)}
                className="text-sm text-slate-300 hover:text-white"
              >
                Kapat ✕
              </button>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 max-h-[60vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-100">
                {aiResult}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setAiResult(null)}
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-sm"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
