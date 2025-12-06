"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setTokenChecked(true);
  }, []);

  if (!tokenChecked)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">🏪 Dashboard</h1>

      <p className="mt-6">Başarıyla giriş yapıldı 🎯</p>
    </main>
  );
}
