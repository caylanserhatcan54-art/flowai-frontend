// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowAI Panel",
  description: "FlowAI E-Ticaret Satış Asistanı Yönetim Paneli",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_#7A00FF33_0,_#050816_55%,_#050816_100%)] text-white">
        {children}
      </body>
    </html>
  );
}
