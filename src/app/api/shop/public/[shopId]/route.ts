// src/app/api/shop/public/[shopId]/route.ts
import { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function GET(
  req: NextRequest,
  { params }: { params: { shopId: string } }
) {
  const { shopId } = params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/shops/public/${shopId}`, {
      method: "GET",
    });

      const data = await res.json();
      return Response.json(data, { status: res.status });
  } catch (err) {
    console.error("FRONT_PUBLIC_SHOP_ERROR", err);
    return Response.json(
      { ok: false, error: "frontend_public_shop_failed" },
      { status: 500 }
    );
  }
}
