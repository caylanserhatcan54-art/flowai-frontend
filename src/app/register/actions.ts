"use server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-shop-backend-2.onrender.com";

export async function registerAction(formData: FormData) {
  const shopName = formData.get("shopName");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopName, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Kayıt başarısız" };
    }

    return { success: true, shopId: data.shopId };
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Sunucu hatası" };
  }
}
