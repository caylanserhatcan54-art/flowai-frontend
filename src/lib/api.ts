export const API_URL = "https://ai-shop-backend-2.onrender.com";

/**
 * Backend fetch function
 */
export async function apiFetch(path: string, options: any = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    console.log("API Error:", res.status);
    throw new Error("API Request Failed");
  }

  return res.json();
}

/**
 * Login request
 */
export async function login(email: string, password: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Shop Settings Retrieve
 */
export async function getShopSettings(shopId: string) {
  return apiFetch(`/shop/settings/${shopId}`);
}

/**
 * Shop Settings Update
 */
export async function updateShopSettings(shopId: string, data: any) {
  return apiFetch(`/shop/settings/${shopId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Shop Access Panel
 */
export async function getShopAccessData(shopId: string) {
  return apiFetch(`/shop/access/${shopId}`);
}
