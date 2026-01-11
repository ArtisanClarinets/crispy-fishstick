
import { NextResponse } from "next/server";
import { issueCsrfCookie } from "@/lib/security/csrf";

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = await issueCsrfCookie();
  return NextResponse.json({ csrfToken: token });
}
