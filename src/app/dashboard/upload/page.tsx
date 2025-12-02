"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const shopId = "demo-dükkanı";

  async function handleImage(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    // önizleme
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

    // base64 çevir
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1];
      await analyze(base64);
    };
    reader.readAsDataURL(file);
  }

  async function analyze(base64: string) {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/vision/analyze",
        {
          shopId,
          imageBase64: base64,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Ürün Yükleme</h1>

      <input type="file" accept="image/*" onChange={handleImage} />

      {preview && (
        <img
          src={preview}
          className="w-48 mt-4 border rounded shadow"
        />
      )}

      {loading && <p className="mt-4">Analiz ediliyor...</p>}

      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
