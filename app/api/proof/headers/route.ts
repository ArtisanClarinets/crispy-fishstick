import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({
    ok: true,
    issuedAt: new Date().toISOString(),
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
