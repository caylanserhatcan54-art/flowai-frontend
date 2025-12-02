import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { shopId: string } }
) {
  try {
    const shopId = context.params.shopId;

    if (!shopId) {
      return NextResponse.json({ ok: false, error: "missing_shopId" });
    }

    // Burada sen Firestore’dan mağaza bilgisi çekiyorsun
    // Backend API’n varsa ona istekte bulunabilirsin.

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
