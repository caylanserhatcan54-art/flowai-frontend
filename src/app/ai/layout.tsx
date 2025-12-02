export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
