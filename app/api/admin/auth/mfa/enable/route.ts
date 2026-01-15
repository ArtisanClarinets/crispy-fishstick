import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verify as verifyOtp } from "otplib";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { encryptSecret, generateBackupCodes, generateRecoveryCode, generateDeviceFingerprint } from "@/lib/security/mfa";
import { assertSameOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

const enableSchema = z.object({
  token: z.string().min(6),
  secret: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // CSRF protection
    assertSameOrigin(req);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }

    const limitResult = await rateLimit({
      key: `mfa-enable:${session.user.id}`,
      limit: 5,
      windowMs: 60_000,
    });

    if (!limitResult.success) {
      return new NextResponse("Too many requests", { status: 429, headers: { "Cache-Control": "no-store" } });
    }

    const body = await req.json();
    const { token, secret } = enableSchema.parse(body);

    const isValid = verifyOtp({
      token,
      secret,
    });

    if (!isValid) {
      return new NextResponse("Invalid token", { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    const encryptedSecret = await encryptSecret(secret);

    // Generate backup codes
    const { codes: backupCodes, hashedCodes: hashedBackupCodes } = await generateBackupCodes();

    // Generate recovery code
    const { code: recoveryCode, hashedCode: hashedRecoveryCode, expiresAt: recoveryCodeExpiresAt } = await generateRecoveryCode();

    // Generate device fingerprint
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const deviceFingerprint = generateDeviceFingerprint(userAgent, ipAddress);

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        mfaSecret: encryptedSecret,
        mfaBackupCodes: JSON.stringify(hashedBackupCodes),
        mfaRecoveryCode: hashedRecoveryCode,
        mfaRecoveryCodeExpiresAt: recoveryCodeExpiresAt,
        mfaDeviceFingerprint: deviceFingerprint
      },
    });

    return NextResponse.json({
      success: true,
      backupCodes,
      recoveryCode,
      recoveryCodeExpiresAt,
      deviceFingerprint
    }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid Origin header") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    console.error("MFA Enable Error:", error);
    return new NextResponse("Internal Error", { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
