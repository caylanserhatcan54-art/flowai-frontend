// app/dashboard/page.tsx
"use client";

import DashboardShell from "@/components/DashboardShell";
import { useEffect, useState } from "react";
import { getShopAccessData } from "@/lib/api";
import { loadAuth } from "@/lib/auth";

type AccessData = {
  shopId: string;
  chatUrl: string;
  qrPngUrl: string;
  qrPdfUrl: string;
  subscriptionActive: boolean;
};

export default function DashboardPage() {
  const [data, setData] = useState<AccessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  useEffect(() => {
    const auth = loadAuth();
    if (!auth) return;
    (async () => {
      try {
        const res = await getShopAccessData(auth.token);
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMsg("Kopyalandı ✅");
    setTimeout(() => setCopyMsg(null), 2000);
  };

  const embedCode = data
    ? `<script src="https://flowai.app/widget.js" data-shop="${data.shopId}"></script>`
    : "";

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold mb-1">FlowAI Panel</h1>
            <p className="text-sm text-white/60">
              Buradan mağazana özel QR, link ve embed kodunu alabilirsin.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                data?.subscriptionActive ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {data?.subscriptionActive ? (
              <span className="text-emerald-400">Abonelik aktif</span>
            ) : (
              <span className="text-red-400">
                Abonelik pasif – lütfen plan satın al
              </span>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-sm text-white/60">Yükleniyor...</div>
        )}

        {!loading && data && (
          <div className="grid md:grid-cols-2 gap-5">
            {/* QR Card */}
            <div className="bg-flowCard/80 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  📱 Mağaza QR Kodu
                </h2>
                <p className="text-xs text-white/60">
                  Bu QR&apos;ı kasaya, mağaza duvarına veya paketlere koy. Müşteri
                  okuttuğunda FlowAI sohbet ekranı açılır.
                </p>
              </div>

              <div className="flex items-center justify-center">
                {data.qrPngUrl ? (
                  <img
                    src={data.qrPngUrl}
                    alt="FlowAI QR"
                    className="h-40 w-40 rounded-xl bg-white p-2"
                  />
                ) : (
                  <div className="h-40 w-40 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-xs text-white/50">
                    QR henüz üretilmedi
                  </div>
                )}
              </div>

              <div className="flex gap-3 text-xs">
                <a
                  href={data.qrPngUrl}
                  download
                  className="flex-1 text-center rounded-lg border border-flowPrimary/60 text-flowPrimary py-2 hover:bg-flowPrimary/10"
                >
                  PNG olarak indir
                </a>
                <a
                  href={data.qrPdfUrl}
                  download
                  className="flex-1 text-center rounded-lg border border-white/20 py-2 hover:bg-white/5"
                >
                  PDF olarak indir
                </a>
              </div>
            </div>

            {/* Link + embed */}
            <div className="flex flex-col gap-4">
              <div className="bg-flowCard/80 border border-white/10 rounded-2xl p-5 space-y-3">
                <div>
                  <h2 className="text-sm font-semibold mb-1">
                    🔗 Mağaza Sohbet Linki
                  </h2>
                  <p className="text-xs text-white/60">
                    Bunu Instagram bio, WhatsApp durumu veya web sitene
                    koyabilirsin.
                  </p>
                </div>
                <div className="bg-black/40 border border-white/15 rounded-xl px-3 py-3 text-xs break-all">
                  {data.chatUrl}
                </div>
                <button
                  onClick={() => handleCopy(data.chatUrl)}
                  className="text-xs rounded-lg bg-flowPrimary/10 border border-flowPrimary/50 px-3 py-2 hover:bg-flowPrimary/20"
                >
                  Linki kopyala
                </button>
              </div>

              <div className="bg-flowCard/80 border border-white/10 rounded-2xl p-5 space-y-3">
                <div>
                  <h2 className="text-sm font-semibold mb-1">
                    🧩 Web Site Embed Kodu
                  </h2>
                  <p className="text-xs text-white/60">
                    Bu kodu sitenin <code>&lt;body&gt;</code> altına ekle. Sağ
                    altta baloncuk şeklinde FlowAI çıkar.
                  </p>
                </div>
                <pre className="bg-black/60 border border-white/15 rounded-xl px-3 py-3 text-[11px] overflow-x-auto">
                  {embedCode}
                </pre>
                <button
                  onClick={() => handleCopy(embedCode)}
                  className="text-xs rounded-lg bg-white/5 border border-white/20 px-3 py-2 hover:bg-white/10"
                >
                  Embed kodu kopyala
                </button>
              </div>
            </div>
          </div>
        )}

        {copyMsg && (
          <div className="text-xs text-flowPrimary mt-2">{copyMsg}</div>
        )}
      </div>
    </DashboardShell>
  );
}
