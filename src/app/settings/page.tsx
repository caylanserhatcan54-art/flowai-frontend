// app/settings/page.tsx
"use client";

import DashboardShell from "@/components/DashboardShell";
import { useEffect, useState, FormEvent } from "react";
import { getShopSettings, updateShopSettings } from "@/lib/api";
import { loadAuth } from "@/lib/auth";

export default function SettingsPage() {
  const [form, setForm] = useState({
    storeName: "",
    companyName: "",
    taxNumber: "",
    storeUrl: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const auth = loadAuth();
    if (!auth) return;
    (async () => {
      try {
        const res = await getShopSettings(auth.token);
        setForm(res);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const auth = loadAuth();
    if (!auth) return;
    setSaving(true);
    setMessage(null);
    try {
      await updateShopSettings(auth.token, form);
      setMessage("Ayarlar başarıyla kaydedildi ✔");
    } catch {
      setMessage("Ayarlar kaydedilemedi ❌");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 2500);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1">Mağaza Ayarları</h1>
        <p className="text-sm text-white/60 mb-6">
          FlowAI&apos;nin müşteriye kendini tanıtırken kullanacağı bilgileri
          buradan yönetebilirsin.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-flowCard/80 border border-white/10 rounded-2xl p-6 space-y-4 text-sm"
        >
          {loading && (
            <div className="text-xs text-white/60">Yükleniyor...</div>
          )}

          {!loading && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-white/60">
                    Mağaza Adı
                  </label>
                  <input
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                    value={form.storeName}
                    onChange={(e) =>
                      handleChange("storeName", e.target.value)
                    }
                    placeholder="Örn: Serhat Spor"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-white/60">
                    Firma Adı
                  </label>
                  <input
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                    value={form.companyName}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                    placeholder="Örn: Serhat Spor Tekstil Ltd."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-white/60">
                    Vergi No
                  </label>
                  <input
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                    value={form.taxNumber}
                    onChange={(e) =>
                      handleChange("taxNumber", e.target.value)
                    }
                    placeholder="Örn: 1234567890"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-white/60">
                    WhatsApp Numarası
                  </label>
                  <input
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                    value={form.whatsapp}
                    onChange={(e) =>
                      handleChange("whatsapp", e.target.value)
                    }
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-xs text-white/60">
                  Mağaza URL
                </label>
                <input
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flowPrimary/60"
                  value={form.storeUrl}
                  onChange={(e) => handleChange("storeUrl", e.target.value)}
                  placeholder="https://www.magazan.com"
                />
              </div>

              {message && (
                <div className="text-xs text-flowPrimary">{message}</div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-flowAccent to-flowPrimary text-sm font-medium disabled:opacity-60"
                >
                  {saving ? "Kaydediliyor..." : "Ayarları Kaydet"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </DashboardShell>
  );
}
