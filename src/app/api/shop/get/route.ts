// FILE: src/app/api/shop/get/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const { searchParams } = new URL(request.url);
  const shopId = searchParams.get("shopId");

  if (!shopId) {
    return NextResponse.json({ error: "shopId gerekli" }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/shops/${shopId}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
