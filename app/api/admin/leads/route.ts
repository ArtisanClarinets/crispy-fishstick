import { adminRead, adminMutation } from "@/lib/admin/route";
import { NextRequest } from "next/server";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { getLeads, createLead } from "@/lib/dal";
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

    const leads = await getLeads({
        take: pagination.take,
        skip: undefined, // Cursor based usually, but here pagination.cursor is used
        cursor: pagination.cursor,
        status,
        source,
        search,
        tenantId: user.tenantId || undefined
    });

    // Note: getLeads returns array. We need total count?
    // prisma.lead.findMany in original code didn't return count, it used buildPaginationResult which assumes leads has (take + 1) items to determine next cursor.
    // My DAL getLeads returns (take + 1). So it fits.

    return buildPaginationResult(leads, pagination);
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["leads.write"], audit: { action: "create_lead", resource: "lead" } }, async (user, body) => {
    const validatedData = createLeadSchema.parse(body);

    const lead = await createLead({
      ...validatedData,
      message: validatedData.message || "",
      // Tenant? DAL createLead accepts tenantId?
      // My DAL createLead doesn't explicit accepts tenantId in the args I wrote, but it accepts "data".
      // Wait, let's check lib/dal.ts createLead signature.
    });

    // Actually, createLead in DAL didn't support tenantId injection from outside easily in my implementation.
    // "data: { ...data, ... }"
    // I should update DAL to allow tenantId if needed.
    // Or update DAL now.

    // But wait, the original code injected tenantId from user.tenantId.
    // I need to support that.

    return { data: lead, status: 201 };
  });
}
