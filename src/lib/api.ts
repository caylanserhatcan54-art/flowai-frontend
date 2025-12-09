export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://ai-shop-backend-2.onrender.com";

/**
 * Backend API Fetch Helper
 */
export async function apiFetch(
  path: string,
  options: {
    method?: string;
    body?: any;
    headers?: any;
  } = {}
) {
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("❌ API ERROR:", await res.text());
    throw new Error("API request failed");
  }

  const json = await res.json();
  return json;
}

/**
 * Kullanıcı AI panel erişim bilgisi
 */
export async function getShopAccessData(shopId: string) {
  return apiFetch(`/shop/access?shop=${shopId}`);
}

/**
 * AI Mesaj Gönderimi
 */
export async function sendMessage(shopId: string, message: string) {
  return apiFetch(`/assistant/message`, {
    method: "POST",
    body: { shopId, message },
  });
}
