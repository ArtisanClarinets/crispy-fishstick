import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // CSRF protection
    assertSameOrigin(req);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }

    const limitResult = await rateLimit({
      key: `mfa-disable:${session.user.id}`,
      limit: 5,
      windowMs: 60_000,
    });

    if (!limitResult.success) {
      return new NextResponse("Too many requests", { status: 429, headers: { "Cache-Control": "no-store" } });
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: { mfaSecret: null },
    });

    return NextResponse.json({ success: true }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid Origin header") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    console.error("MFA Disable Error:", error);
    return new NextResponse("Internal Error", { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
