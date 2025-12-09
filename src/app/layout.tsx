import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowAI – Yapay Zeka Satış Asistanı",
  description:
    "FlowAI ile mağazana 7/24 çalışan yapay zeka satış danışmanı ekle. QR ile yönlendir, sohbet ettir, ürün öner, sepet artır.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
