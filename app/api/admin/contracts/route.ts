export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const createContractSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tenantId: z.string().min(1, "Tenant is required"),
  status: z.string().default("draft"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
  value: z.number().min(0).default(0),
  content: z.string().optional(),
});

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["contracts.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    // Filters
    const status = searchParams.get("status") || undefined;
    const showArchived = searchParams.get("showArchived") === "true";

    const where = {
      ...tenantWhere(user),
      ...(status && { status }),
      ...(!showArchived && { deletedAt: null }),
    };

    const contracts = await prisma.contract.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: pagination.take,
      ...(pagination.cursor && {
        cursor: { id: pagination.cursor },
        skip: 1,
      }),
      include: {
        Tenant: true,
      },
    });

    return { data: buildPaginationResult(contracts, pagination) };
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["contracts.write"] }, async (user, body) => {
    const validatedData = createContractSchema.parse(body);

    // Validate tenant
    const tenant = await prisma.tenant.findUnique({
      where: { id: validatedData.tenantId, deletedAt: null },
    });
    if (!tenant) {
      return { error: "Invalid tenant", status: 400 };
    }

    const contract = await prisma.contract.create({
      data: {
        ...validatedData,
        version: 1, // Initial version
      },
    });

    return { data: contract, status: 201 };
  });
}
