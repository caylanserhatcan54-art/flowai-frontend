// lib/auth.ts
"use client";

export function saveAuth(auth: { token: string; shopId: string; email: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem("flowai_auth", JSON.stringify(auth));
}

export function loadAuth():
  | { token: string; shopId: string; email: string }
  | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("flowai_auth");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("flowai_auth");
}
