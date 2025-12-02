// src/app/layout.tsx
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

export default function RootLayout({ children }: any) {
  return (
    <html lang="tr">
      <body className="bg-white text-gray-900">
        {/* 🔥 Dashboard tarafında localStorage erişimi için client wrapper ZORUNLU */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
