import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { jsonNoStore } from "@/lib/security/response";
import { redactForAudit } from "@/lib/security/redact";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin({ permissions: ["audit.read"] });

    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const take = Math.min(parseInt(searchParams.get("take") || "50", 10), 100);

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take,
      ...(cursor ? {
        cursor: { id: cursor },
        skip: 1,
      } : {}),
    });

    // Defense-in-depth: redact again just in case raw strings in DB are sensitive
    const safeLogs = logs.map(log => ({
      ...log,
      before: log.before ? JSON.stringify(redactForAudit(JSON.parse(log.before))) : null,
      after: log.after ? JSON.stringify(redactForAudit(JSON.parse(log.after))) : null,
    }));

    return jsonNoStore(safeLogs);
  } catch (_error) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }
}
