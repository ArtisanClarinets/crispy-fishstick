export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const createIncidentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  severity: z.string().min(1, "Severity is required"),
  status: z.string().default("open"),
  serviceId: z.string().optional().nullable(),
  commanderId: z.string().optional().nullable(),
  summary: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireAdmin({ permissions: ["incidents.write"] });
    const body = await req.json();
    const validatedData = createIncidentSchema.parse(body);

    const incident = await prisma.incident.create({
      data: {
        title: validatedData.title,
        severity: validatedData.severity,
        status: validatedData.status,
        serviceId: validatedData.serviceId || null,
        commanderId: validatedData.commanderId || null,
        summary: validatedData.summary,
      },
    });

    await createAuditLog({
      action: "create_incident",
      resource: "incident",
      resourceId: incident.id,
      actorId: user.id,
      actorEmail: user.email,
      after: incident,
    });

    return NextResponse.json(incident, { status: 201 });
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
    console.error("Failed to create incident:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await requireAdmin({ permissions: ["incidents.read"] });
    
    const incidents = await prisma.incident.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Service: true,
        User: true,
      },
    });
    
    return NextResponse.json(incidents);
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
