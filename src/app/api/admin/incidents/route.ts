export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { tenantWhere } from "@/shared/lib/admin/guards";
import { z } from "zod";

const createIncidentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  severity: z.string().min(1, "Severity is required"),
  status: z.string().default("open"),
  serviceId: z.string().optional().nullable(),
  commanderId: z.string().optional().nullable(),
  summary: z.string().optional(),
});

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["incidents.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    // Filters
    const severity = searchParams.get("severity") || undefined;
    const status = searchParams.get("status") || undefined;
    const showArchived = searchParams.get("showArchived") === "true";

    const where = {
      ...tenantWhere(user),
      ...(severity && { severity }),
      ...(status && { status }),
      ...(!showArchived && { deletedAt: null }),
    };

    const incidents = await prisma.incident.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: pagination.take,
      ...(pagination.cursor && {
        cursor: { id: pagination.cursor },
        skip: 1,
      }),
      include: {
        Service: true,
        User: true,
      },
    });

    return { data: buildPaginationResult(incidents, pagination) };
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["incidents.write"] }, async (user, body) => {
    const validatedData = createIncidentSchema.parse(body);

    const incident = await prisma.incident.create({
      data: {
        title: validatedData.title,
        severity: validatedData.severity,
        status: validatedData.status,
        serviceId: validatedData.serviceId || null,
        commanderId: validatedData.commanderId || null,
        summary: validatedData.summary,
      },
    });

    return { data: incident, status: 201 };
  });
}
