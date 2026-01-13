import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin } from "@/lib/security/origin";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const dynamic = "force-dynamic";

const disableMfaSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    // CSRF protection
    assertSameOrigin(req);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }

    const body = await req.json();
    const result = disableMfaSchema.safeParse(body);

    if (!result.success) {
      return new NextResponse("Invalid request data", { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    const { password } = result.data;

    const limitResult = await rateLimit({
      key: `mfa-disable:${session.user.id}`,
      limit: 5,
      windowMs: 60_000,
    });

    if (!limitResult.success) {
      return new NextResponse("Too many requests", { status: 429, headers: { "Cache-Control": "no-store" } });
    }

    // Verify password
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, passwordHash: true },
    });

    if (!user || !user.passwordHash) {
      return new NextResponse("User not found", { status: 404, headers: { "Cache-Control": "no-store" } });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return new NextResponse("Invalid password", { status: 401, headers: { "Cache-Control": "no-store" } });
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
