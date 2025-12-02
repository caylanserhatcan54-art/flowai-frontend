"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Giriş başarısız" };
    }

    // Token cookie'ye kaydedilir
    cookies().set("token", data.token, {
      httpOnly: true,
      path: "/",
    });

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Sunucu hatası" };
  }
}
