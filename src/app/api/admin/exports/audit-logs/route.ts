import { NextRequest, NextResponse } from "next/server";
import { adminRead } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Export audit logs as CSV
 * GET /api/admin/exports/audit-logs?startDate=2024-01-01&endDate=2024-12-31
 */
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["audit.export"] }, async (_user) => {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "10000");

    const where: any = {};

    if (startDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(startDate) };
    }

    if (endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(endDate) };
    }

    const logs = await prisma.auditLog.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Convert to CSV
    const headers = ["ID", "Action", "Resource", "Resource ID", "Actor ID", "Actor Email", "IP", "Created At"];
    const rows = logs.map((log) => [
      log.id,
      log.action,
      log.resource,
      log.resourceId || "",
      log.actorId || "",
      log.actorEmail || "",
      log.ip || "",
      log.createdAt.toISOString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="audit-logs-${new Date().toISOString()}.csv"`,
      },
    });
  });
}
