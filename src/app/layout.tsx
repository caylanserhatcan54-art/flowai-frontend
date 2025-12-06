import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowAI",
  description: "AI Shop Assistant Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}
