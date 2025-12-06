"use client";

export default function LinkPage() {
  return (
    <div className="min-h-screen p-12 text-white bg-gradient-to-br from-[#0A0E27] to-[#1C034C]">

      <h1 className="text-4xl font-bold mb-4">🔗 AI Link & QR Kod</h1>

      <p className="text-lg opacity-80 mb-10 max-w-xl">
        Mağazana özel QR kodu ve linki buradan alabilirsin.  
        Bu kodları mağaza bannerı, ürün açıklamaları, sosyal medya ve destek alanlarında paylaşabilirsin.
      </p>

      <div className="bg-white/10 rounded-xl border border-white/20 p-10 max-w-lg shadow-xl backdrop-blur-md">
        <p className="text-lg font-semibold mb-4">🎯 Mağazana Özel Link</p>
        <div className="w-full p-4 bg-black/30 rounded-lg font-mono">
          https://flowai.link/magaza-id-gelecek
        </div>

        <p className="text-lg font-semibold mt-8 mb-4">🧾 QR Kod</p>
        <div className="w-52 h-52 bg-white rounded-lg mx-auto mb-4 border border-black" />

        <button className="mt-4 bg-blue-600 rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition">
          📥 QR Kod İndir
        </button>

      </div>
    </div>
  );
}
