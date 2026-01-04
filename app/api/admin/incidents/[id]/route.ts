export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateIncidentSchema = z.object({
  title: z.string().min(1).optional(),
  severity: z.string().min(1).optional(),
  status: z.string().optional(),
  serviceId: z.string().nullable().optional(),
  commanderId: z.string().nullable().optional(),
  summary: z.string().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["incidents.read"] });
    const incident = await prisma.incident.findUnique({
      where: { id: params.id },
      include: {
        Service: true,
        User: true,
      },
    });

    if (!incident) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(incident);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["incidents.write"] });
    const body = await req.json();
    const validatedData = updateIncidentSchema.parse(body);

    const existingIncident = await prisma.incident.findUnique({
      where: { id: params.id },
    });

    if (!existingIncident) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id: params.id },
      data: validatedData,
    });

    await createAuditLog({
      action: "update_incident",
      resource: "incident",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingIncident,
      after: updatedIncident,
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["incidents.write"] });

    const existingIncident = await prisma.incident.findUnique({
      where: { id: params.id },
    });

    if (!existingIncident) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await prisma.incident.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_incident",
      resource: "incident",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingIncident,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
