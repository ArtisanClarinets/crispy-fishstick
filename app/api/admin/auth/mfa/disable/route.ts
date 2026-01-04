import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const limitResult = await rateLimit({
    key: `mfa-disable:${session.user.id}`,
    limit: 5,
    windowMs: 60_000,
  });

  if (!limitResult.success) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { mfaSecret: null },
  });

  return NextResponse.json({ success: true });
}
