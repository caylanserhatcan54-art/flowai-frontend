export const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://ai-shop-backend-2.onrender.com";

export async function apiFetch(path: string, options: any = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    return { ok: false, error: "fetch_failed" };
  }
}
