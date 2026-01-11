import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { generateRecoveryCode } from "@/lib/security/mfa";
import { assertSameOrigin } from "@/lib/security/origin";

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
      key: `mfa-recovery:${session.user.id}`,
      limit: 3,
      windowMs: 60_000,
    });

    if (!limitResult.success) {
      return new NextResponse("Too many requests", { status: 429, headers: { "Cache-Control": "no-store" } });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404, headers: { "Cache-Control": "no-store" } });
    }

    // Generate new recovery code
    const { code: recoveryCode, hashedCode: hashedRecoveryCode, expiresAt: recoveryCodeExpiresAt } = await generateRecoveryCode();

    // Update user with new recovery code
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        mfaRecoveryCode: hashedRecoveryCode,
        mfaRecoveryCodeExpiresAt: recoveryCodeExpiresAt,
      },
    });

    return NextResponse.json({ 
      success: true, 
      recoveryCode,
      recoveryCodeExpiresAt,
      message: "Recovery code generated successfully. This code will expire in 7 days."
    }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid Origin header") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    console.error("MFA Recovery Error:", error);
    return new NextResponse("Internal Error", { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}