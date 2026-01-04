import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin({ permissions: ["audit.read"] });

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100, // Limit to last 100 for now
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
