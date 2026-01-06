import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { authenticator } from "otplib";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { encryptSecret } from "@/lib/security/mfa";
import { assertSameOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

const enableSchema = z.object({
  token: z.string().min(6),
  secret: z.string(),
});

export async function POST(req: Request) {
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

    const isValid = authenticator.check(token, secret);

    if (!isValid) {
      return new NextResponse("Invalid token", { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    const encryptedSecret = await encryptSecret(secret);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { mfaSecret: encryptedSecret },
    });

    return NextResponse.json({ success: true }, {
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
