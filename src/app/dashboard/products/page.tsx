"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-shop-backend-1-um67.onrender.com/api";

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

  useEffect(() => {
    const storedShopId = localStorage.getItem("shopId");
    if (storedShopId) setShopId(storedShopId);
  }, []);

  // -----------------------------
  // ÜRÜN LİSTELEME
  // -----------------------------
  const fetchProducts = async () => {
    if (!shopId) {
      setError("Geçerli bir shopId bulunamadı. Lütfen tekrar giriş yap.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API}/products/list?shopId=${shopId}&platform=${platform}`;

      console.log("👉 Ürün listeleme isteği:", url);

      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Backend ürün listeleme hata cevabı:", text);
        throw new Error("Backend ürün listeleme hatası");
      }

      const data = await res.json();
      setProducts(data.products || []);
    } catch (err: any) {
      console.error("❌ Fetch ürün error:", err);
      setError(err.message || "Ürünler alınamadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shopId) fetchProducts();
  }, [shopId, platform]);

  // -----------------------------
  // AI ENDPOINTLERİ
  // -----------------------------
  const callAi = async (mode: AiMode, product: Product) => {
    if (!mode) return;

    setAiLoading(mode);
    setAiResult(null);
    setAiTargetProduct(product);

    try {
      let endpoint = "";
      let title = "";

      if (mode === "description") {
        endpoint = "/ai/description";
        title = "AI Ürün Açıklaması";
      } else if (mode === "title") {
        endpoint = "/ai/title";
        title = "AI SEO Başlık Önerileri";
      } else if (mode === "tags") {
        endpoint = "/ai/tags";
        title = "AI SEO Etiket Önerileri";
      }

      setAiResultTitle(title);

      const body: any = {
        title: product.title || product.name || "",
        description: product.description || "",
        platform: product.platform || platform,
      };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

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

  // -----------------------------
  // ÜRÜN SİLME
  // -----------------------------
  const deleteProduct = async (productId: string) => {
    if (!shopId) return;

    const confirmDelete = window.confirm(
      "Bu ürünü silmek istediğine emin misin?"
    );

    if (!confirmDelete) return;

    try {
      const url = `${API}/products/${shopId}/${productId}`;
      const res = await fetch(url, { method: "DELETE" });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || "Ürün silme başarısız");
      }

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: any) {
      alert("Ürün silinirken bir hata oluştu: " + err.message);
    }
  };

  // ---------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
      {/* ... Gerisi aynı ... */}
    </div>
  );
}
