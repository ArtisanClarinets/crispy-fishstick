export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";
import { parsePaginationParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tenantId: z.string().min(1, "Tenant is required"),
  status: z.enum(["active", "completed", "archived"]).default("active"),
});

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["projects.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    // Parse filters manually
    const status = searchParams.get("status") as "active" | "completed" | "archived" | null;
    const tenantId = searchParams.get("tenantId") || undefined;
    const search = searchParams.get("search") || undefined;

    const where = {
      ...tenantWhere(user),
      deletedAt: null,
      ...(status && { status }),
      ...(tenantId && { tenantId }),
      ...(search && {
        name: { contains: search, mode: "insensitive" as const },
      }),
    };

    const [projects] = await Promise.all([
      prisma.project.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { createdAt: "desc" },
        include: {
          Tenant: true,
          _count: {
            select: { Assignment: true, TimeEntry: true },
          },
        },
      }),
    ]);

    return buildPaginationResult(projects, pagination);
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(
    req,
    { permissions: ["projects.write"], audit: { action: "create_project", resource: "project" } },
    async (user, body) => {
      const validatedData = createProjectSchema.parse(body);

      // Verify tenant exists and user has access
      const tenant = await prisma.tenant.findFirst({
        where: {
          id: validatedData.tenantId,
          deletedAt: null,
          ...(user.tenantId && { id: user.tenantId }),
        },
      });

      if (!tenant) {
        return { error: "Tenant not found or access denied", status: 403 };
      }

      const project = await prisma.project.create({
        data: validatedData,
        include: {
          Tenant: true,
          _count: {
            select: { Assignment: true, TimeEntry: true },
          },
        },
      });

      return { data: project, status: 201 };
    }
  );
}
