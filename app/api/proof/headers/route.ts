import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const res = NextResponse.json(
    { ok: true, ts: new Date().toISOString() },
    { status: 200 }
  );
  res.headers.set("Cache-Control", "no-store");
  return res;
}
