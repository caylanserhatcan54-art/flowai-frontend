import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-shop-backend-1-um67.onrender.com";

export default function RegisterPage() {
  const [shopName, setShopName] = useState("Serhat Store");
  const [email, setEmail] = useState("serhat@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${API_URL}/auth/register_shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shopName, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Kayıt başarısız");
      }

      setSuccess("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          FlowAI Mağaza Kaydı
        </h1>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mağaza Adı
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Örn: Serhat Moda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@magaza.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Şifre</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 disabled:opacity-60"
          >
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </button>
        </form>
      </div>
    </main>
  );
}
