import { NextRequest } from "next/server";
import { adminRead } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

/**
 * Global search across multiple entities
 * GET /api/admin/search?q=searchterm&entities=projects,leads,users
 */
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["admin.search"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const entitiesParam = searchParams.get("entities") || "all";
    const limit = parseInt(searchParams.get("limit") || "5");

    if (!query || query.length < 2) {
      return { error: "Search query must be at least 2 characters", status: 400 };
    }

    const searchFilter = {
      contains: query,
      mode: "insensitive" as const,
    };

    const entities = entitiesParam === "all" 
      ? ["projects", "leads", "users", "tenants", "services"]
      : entitiesParam.split(",");

    const results: any = {};

    // Search projects
    if (entities.includes("projects")) {
      results.projects = await prisma.project.findMany({
        where: {
          ...tenantWhere(user),
          deletedAt: null,
          name: searchFilter,
        },
        take: limit,
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
        },
      });
    }

    // Search leads
    if (entities.includes("leads")) {
      results.leads = await prisma.lead.findMany({
        where: {
          ...tenantWhere(user),
          deletedAt: null,
          OR: [
            { name: searchFilter },
            { email: searchFilter },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
        },
      });
    }

    // Search users
    if (entities.includes("users")) {
      results.users = await prisma.user.findMany({
        where: {
          ...tenantWhere(user),
          OR: [
            { name: searchFilter },
            { email: searchFilter },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });
    }

    // Search tenants (superadmin only)
    if (entities.includes("tenants") && !user.tenantId) {
      results.tenants = await prisma.tenant.findMany({
        where: {
          deletedAt: null,
          OR: [
            { name: searchFilter },
            { slug: searchFilter },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
        },
      });
    }

    // Search services
    if (entities.includes("services")) {
      results.services = await prisma.service.findMany({
        where: {
          deletedAt: null,
          name: searchFilter,
        },
        take: limit,
        select: {
          id: true,
          name: true,
          lifecycle: true,
          createdAt: true,
        },
      });
    }

    return {
      query,
      results,
      total: Object.values(results).reduce((sum: number, arr: any) => sum + arr.length, 0),
    };
  });
}
