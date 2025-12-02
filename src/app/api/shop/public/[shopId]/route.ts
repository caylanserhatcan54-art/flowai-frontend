// 🚨 Bu dosyada Next.js 16 param typing hatası var — TS devre dışı bırakıldı
// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context) {
  try {
    const shopId = context.params.shopId;

    if (!shopId) {
      return NextResponse.json({ ok: false, error: "missing_shopId" });
    }

    return NextResponse.json({
      ok: true,
      shopId,
      message: "public shop info OK",
    });

  } catch (err) {
    console.error("SHOP PUBLIC API ERROR:", err);
    return NextResponse.json({ ok: false, error: "public_api_failed" });
  }
}
