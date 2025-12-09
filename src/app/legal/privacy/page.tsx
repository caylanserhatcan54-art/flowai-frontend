// app/legal/privacy/page.tsx
import DashboardShell from "@/components/DashboardShell";

export default function PrivacyPage() {
  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto text-sm space-y-4">
        <h1 className="text-2xl font-semibold mb-2">Gizlilik Politikası</h1>
        <p className="text-white/70">
          Bu sayfaya FlowAI için hazırladığın KVKK / gizlilik metnini
          yerleştireceksin. Metni daha sonra beraber yazabiliriz.
        </p>
        <p className="text-xs text-white/50">
          Örnek alanlar: hangi veriler tutulur, çerez politikası, loglar,
          üçüncü parti servisler (iyzico vs.).
        </p>
      </div>
    </DashboardShell>
  );
}
