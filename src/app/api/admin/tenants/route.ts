export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { parseCommonFilters, buildDeletedFilter } from "@/shared/lib/api/filters/common";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { z } from "zod";

const createTenantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  contactEmail: z.string().email().optional(),
});



/**
 * GET /api/admin/tenants
 * List tenants with pagination
 */
export const GET = adminRead(
  { permissions: ["tenants.read"] },
  async (req, { user }) => {
    const { searchParams } = req.nextUrl;
    const pagination = parsePaginationParams(searchParams);
    const filters = parseCommonFilters(searchParams);
    
    // Scoping: if user is tenant-scoped, they can only see their own tenant
    const where: any = {
      ...buildDeletedFilter(filters.includeDeleted),
    };

    if (user.tenantId) {
      where.id = user.tenantId;
    }
    
    if (filters.q) {
      where.OR = [
        { name: { contains: filters.q, mode: "insensitive" } },
        { slug: { contains: filters.q, mode: "insensitive" } },
        { contactEmail: { contains: filters.q, mode: "insensitive" } },
      ];
    }
    
    const prismaParams = getPrismaParams(pagination);
    const tenants = await prisma.tenant.findMany({
      where,
      ...prismaParams,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            Project: true,
            Invoice: true,
            Contract: true,
          },
        },
      },
    });
    
    const result = buildPaginationResult(tenants, pagination);
    return NextResponse.json(result);
  }
);

/**
 * POST /api/admin/tenants
 * Create new tenant
 */
export const POST = adminMutation(
  {
    permissions: ["tenants.write"],
    audit: { resource: "tenant", action: "create" },
    rateLimitKey: "tenant:create",
    rateLimitMax: 20,
  },
  async (req) => {
    const body = await req.json();
    const validatedData = createTenantSchema.parse(body);
    
    // Check for duplicate slug
    const existing = await prisma.tenant.findUnique({
      where: { slug: validatedData.slug },
    });
    
    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }
    
    const tenant = await prisma.tenant.create({
      data: validatedData,
    });
    
    return NextResponse.json(tenant, { status: 201 });
  }
);
