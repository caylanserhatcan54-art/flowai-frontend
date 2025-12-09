// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.ornegin.com";

export type AuthResponse = {
  token: string;
  shopId: string;
  email: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  // TODO: kendi backend'ine göre uyarlayacaksın
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Giriş yapılamadı");
  }

  return res.json();
}

export async function getShopAccessData(token: string) {
  // TODO: Kendi endpoint'ine göre değiştir
  const res = await fetch(`${API_BASE}/shops/me/access`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erişim bilgileri alınamadı");
  }

  return res.json() as Promise<{
    shopId: string;
    chatUrl: string;
    qrPngUrl: string;
    qrPdfUrl: string;
    subscriptionActive: boolean;
  }>;
}

export async function getShopSettings(token: string) {
  const res = await fetch(`${API_BASE}/shops/me/settings`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ayarlar alınamadı");
  return res.json() as Promise<{
    storeName: string;
    companyName: string;
    taxNumber: string;
    storeUrl: string;
    whatsapp: string;
  }>;
}

export async function updateShopSettings(
  token: string,
  payload: {
    storeName: string;
    companyName: string;
    taxNumber: string;
    storeUrl: string;
    whatsapp: string;
  }
) {
  const res = await fetch(`${API_BASE}/shops/me/settings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Ayarlar kaydedilemedi");
  return res.json();
}
