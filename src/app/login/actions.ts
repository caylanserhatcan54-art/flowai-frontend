"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { ok: false, error: "missing_fields" };
  }

  try {
    // Backend login
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await resp.json();

    if (!data.ok) {
      return { ok: false, error: data.error || "login_failed" };
    }

    // ---------------------------------------------------
    // NEXT.JS 16 COOKIE YAZMA DOĞRU YÖNTEM
    // ---------------------------------------------------
    const cookieStore = await cookies(); // async oldu
    cookieStore.set("token", data.token, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    });

    return { ok: true };
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return { ok: false, error: "server_error" };
  }
}
