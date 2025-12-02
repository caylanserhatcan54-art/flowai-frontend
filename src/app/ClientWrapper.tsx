"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔥 Eğer dashboard içindeysek Navbar gizlenir
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? "" : "pt-20"}>{children}</main>
    </>
  );
}
