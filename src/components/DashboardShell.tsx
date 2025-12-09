// components/DashboardShell.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { loadAuth, clearAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Panel" },
  { href: "/settings", label: "Mağaza Ayarları" },
  { href: "/billing", label: "Ödeme & Plan" },
  { href: "/legal/privacy", label: "Gizlilik" },
  { href: "/legal/terms", label: "Kullanıcı Sözleşmesi" },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = loadAuth();
    if (!auth) {
      router.push("/login");
    } else {
      setEmail(auth.email);
    }
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-[#050816]/80 backdrop-blur">
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-flowAccent to-flowPrimary flex items-center justify-center font-bold">
            F
          </div>
          <div>
            <div className="font-semibold tracking-wide">FlowAI Panel</div>
            <div className="text-xs text-white/60">E-Ticaret Asistanı</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition 
                ${
                  active
                    ? "bg-flowAccent/20 text-flowPrimary"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 text-xs text-white/60">
          {email && <div className="mb-1 truncate">{email}</div>}
          <button
            onClick={handleLogout}
            className="text-[11px] text-red-400 hover:text-red-300"
          >
            Çıkış yap
          </button>
          <div className="mt-3 text-[10px] text-white/40">
            FlowAI © {new Date().getFullYear()}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050816]/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-flowAccent to-flowPrimary flex items-center justify-center font-bold">
              F
            </div>
            <span className="font-semibold">FlowAI Panel</span>
          </div>
          {email && <span className="text-xs text-white/60">{email}</span>}
        </header>

        <div className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
