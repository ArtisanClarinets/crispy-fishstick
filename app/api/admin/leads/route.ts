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

    return buildPaginationResult(leads, pagination);
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["leads.write"], audit: { action: "create_lead", resource: "lead" } }, async (user, body) => {
    const validatedData = createLeadSchema.parse(body);

    const lead = await createLead({
      ...validatedData,
      message: validatedData.message || "",
      tenantId: user.tenantId || undefined
    });

    return { data: lead, status: 201 };
  });
}
