"use client";

import { useEffect, useState } from "react";

export default function ComplaintsPage() {
  const [list, setList] = useState<any[]>([]);
  const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null;

  async function load() {
    const res = await fetch(`/api/complaints?shopId=${shopId}`);
    const data = await res.json();
    if (data.ok) setList(data.complaints);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Şikayetler</h1>

      {list.length === 0 && (
        <p className="text-gray-500">Henüz herhangi bir şikayet bulunmuyor.</p>
      )}

      <div className="space-y-4 mt-4">
        {list.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <p className="text-gray-900 font-semibold">{c.summary}</p>
            <p className="text-gray-700 mt-1">{c.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              Platform: {c.platform || "bilinmiyor"} –{" "}
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
