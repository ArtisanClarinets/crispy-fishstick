import { adminRead, adminMutation } from "@/lib/admin/route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import * as z from "zod";

const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["leads.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    // Parse filters manually
    const status = searchParams.get("status") || undefined;
    const source = searchParams.get("source") || undefined;
    const search = searchParams.get("search") || undefined;

    // Build where clause with tenant scoping and soft delete filter
    const where = {
      ...tenantWhere(user),
      deletedAt: null,
      ...(status && { status }),
      ...(source && { source }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { message: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [leads] = await Promise.all([
      prisma.lead.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return buildPaginationResult(leads, pagination);
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["leads.write"], audit: { action: "create_lead", resource: "lead" } }, async (user, body) => {
    const validatedData = createLeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        ...(user.tenantId && { tenantId: user.tenantId }),
      },
    });

    return { data: lead, status: 201 };
  });
}
