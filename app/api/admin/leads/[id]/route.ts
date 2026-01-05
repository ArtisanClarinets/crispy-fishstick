import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";

const updateLeadSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email").optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
  assignedTo: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
});

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  void request;
  try {
    await requireAdmin({ permissions: ["leads.read"] });

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (_error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const actor = await requireAdmin({ permissions: ["leads.write"] });
    const body = await req.json();

    const validatedData = updateLeadSchema.parse(body);

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: validatedData,
    });

    await createAuditLog({
      action: "update_lead",
      resource: "lead",
      resourceId: lead.id,
      actorId: actor.id,
      actorEmail: actor.email,
      after: lead,
    });

    return NextResponse.json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  void request;
  try {
    const actor = await requireAdmin({ permissions: ["leads.write"] });

    const lead = await prisma.lead.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_lead",
      resource: "lead",
      resourceId: params.id,
      actorId: actor.id,
      actorEmail: actor.email,
      before: lead,
    });

    return NextResponse.json(lead);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
