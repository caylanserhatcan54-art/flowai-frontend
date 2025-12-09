// app/legal/terms/page.tsx
import DashboardShell from "@/components/DashboardShell";

export default function TermsPage() {
  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto text-sm space-y-4">
        <h1 className="text-2xl font-semibold mb-2">Kullanıcı Sözleşmesi</h1>
        <p className="text-white/70">
          Buraya FlowAI hizmet koşullarını yazacağız: üyelik, iptal,
          sorumluluklar, ödeme, iade politikası gibi başlıklar.
        </p>
        <p className="text-xs text-white/50">
          İstersen bir sonraki adımda sana tam bir Türkçe Kullanıcı Sözleşmesi
          taslağı yazabilirim.
        </p>
      </div>
    </DashboardShell>
  );
}
