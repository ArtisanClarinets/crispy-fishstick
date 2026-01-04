export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateServiceSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  ownerId: z.string().optional().nullable(),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  lifecycle: z.enum(["production", "staging", "development", "deprecated"]).optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["services.read"] });

    const service = await prisma.service.findUnique({
      where: { id: params.id },
      include: {
        User: true,
        Incident: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!service) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["services.write"] });
    const body = await req.json();
    const validatedData = updateServiceSchema.parse(body);

    const existingService = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!existingService) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updatedService = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: validatedData.ownerId,
        repoUrl: validatedData.repoUrl,
        lifecycle: validatedData.lifecycle,
      },
    });

    await createAuditLog({
      action: "update",
      resource: "service",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingService,
      after: updatedService,
    });

    return NextResponse.json(updatedService);
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
    console.error("Failed to update service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["services.write"] });

    const existingService = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!existingService) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await prisma.service.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete",
      resource: "service",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingService,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to delete service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
