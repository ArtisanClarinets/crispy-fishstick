import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { authenticator } from "otplib";
import { rateLimit } from "@/shared/lib/rate-limit";
import { assertSameOrigin } from "@/shared/lib/security/origin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // CSRF protection
    assertSameOrigin(req);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }

    const limitResult = await rateLimit({
      key: `mfa-generate:${session.user.id}`,
      limit: 5,
      windowMs: 60_000,
    });

    if (!limitResult.success) {
      return new NextResponse("Too many requests", { status: 429, headers: { "Cache-Control": "no-store" } });
    }

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(
      session.user.email,
      "Vantus Systems",
      secret
    );

    return NextResponse.json({ secret, otpauth }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid Origin header") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    console.error("MFA generate error:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
