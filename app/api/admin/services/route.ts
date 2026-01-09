export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ownerId: z.string().optional().nullable(),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  lifecycle: z.enum(["production", "staging", "development", "deprecated"]).default("production"),
});

export async function GET() {
  try {
    await requireAdmin({ permissions: ["services.read"] });

    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        User: true,
        _count: {
          select: { Incident: true },
        },
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch services:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAdmin({ permissions: ["services.write"] });
    const body = await req.json();

    const validatedData = createServiceSchema.parse(body);

    const service = await prisma.service.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: validatedData.ownerId || null,
        repoUrl: validatedData.repoUrl || null,
        lifecycle: validatedData.lifecycle,
      },
    });

    await createAuditLog({
      action: "create",
      resource: "service",
      resourceId: service.id,
      actorId: user.id,
      actorEmail: user.email,
      after: service,
    });

    return NextResponse.json(service, { status: 201 });
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
    console.error("Failed to create service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
