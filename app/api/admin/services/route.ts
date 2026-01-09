export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ownerId: z.string().optional().nullable(),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  lifecycle: z.enum(["production", "staging", "development", "deprecated"]).default("production"),
});

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["services.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    // Filters
    const lifecycle = searchParams.get("lifecycle") || undefined;
    const showArchived = searchParams.get("showArchived") === "true";

    const where = {
      ...tenantWhere(user),
      ...(lifecycle && { lifecycle }),
      ...(!showArchived && { deletedAt: null }),
    };

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: pagination.take,
      ...(pagination.cursor && {
        cursor: { id: pagination.cursor },
        skip: 1,
      }),
      include: {
        User: true,
        _count: {
          select: { Incident: true },
        },
      },
    });

    return { data: buildPaginationResult(services, pagination) };
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["services.write"] }, async (user, body) => {
    const validatedData = createServiceSchema.parse(body);

    const service = await prisma.service.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: validatedData.ownerId || null,
        repoUrl: validatedData.repoUrl || null,
        lifecycle: validatedData.lifecycle,
      },
    });

    return { data: service, status: 201 };
  });
}
