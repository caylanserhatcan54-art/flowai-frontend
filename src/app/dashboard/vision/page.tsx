"use client";

import { useState } from "react";
import { CheckCircle, Loader2, UploadCloud } from "lucide-react";

export default function VisionUploadPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleFileSelect(e: any) {
    const file = e.target.files?.[0];

    if (!file) {
      console.warn("⚠️ Dosya seçilmedi");
      return;
    }

    // ✔ Dosya adı hatası giderildi
    console.log("Yüklenen dosya:", file.name);

    // Normal preview oluştur
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Base64'e çevir
    const base64 = await convertToBase64(file);

    // Backend'e gönder
    await sendToBackend(base64);
  }

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };

      reader.onerror = (error) => reject(error);
    });
  }

  async function sendToBackend(base64: string) {
    setLoading(true);
    setResult(null);

    try {
      const shopId = localStorage.getItem("shopId");

      const res = await fetch("http://localhost:4000/api/vision/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId, imageBase64: base64 }),
      });

      const data = await res.json();
      console.log("AI RESULT:", data);

      setResult(data);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ürün Fotoğrafı Yükle</h1>

      <label className="border-2 border-dashed border-gray-500 rounded-xl p-10 flex flex-col items-center cursor-pointer hover:bg-gray-800/40 transition">
        <UploadCloud className="w-10 h-10 text-gray-300" />
        <span className="mt-3 text-gray-300">Fotoğraf yüklemek için tıklayın</span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>

      {imagePreview && (
        <div className="mt-6">
          <img
            src={imagePreview}
            className="rounded-lg border border-gray-800"
          />
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 mt-6 text-blue-400">
          <Loader2 className="animate-spin" /> Görsel analiz ediliyor...
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <h2 className="text-lg font-bold text-green-400 flex items-center gap-2">
            <CheckCircle /> Ürün Tespit Edildi
          </h2>

          <pre className="text-sm mt-2 text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(result.product, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
