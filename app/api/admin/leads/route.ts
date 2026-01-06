import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { assertSameOrigin } from "@/lib/security/origin";
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

export async function GET() {
  try {
    await requireAdmin({ permissions: ["leads.read"] });

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(leads, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    // CSRF protection
    try {
      assertSameOrigin(req);
    } catch (_error) {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }

    const user = await requireAdmin({ permissions: ["leads.write"] });
    const body = await req.json();

    const validatedData = createLeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: validatedData,
    });

    await createAuditLog({
      action: "create_lead",
      resource: "lead",
      resourceId: lead.id,
      actorId: user.id,
      actorEmail: user.email,
      after: lead,
    });

    return NextResponse.json(lead, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return NextResponse.json(
        { error: _error.errors },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
