export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
  status: z.enum(["active", "completed", "archived"]).optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["projects.read"] });
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        Tenant: true,
      },
    });

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(project);
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
    const user = await requireAdmin({ permissions: ["projects.write"] });
    const body = await req.json();
    const validatedData = updateProjectSchema.parse(body);

    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: validatedData,
    });

    await createAuditLog({
      action: "update_project",
      resource: "project",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingProject,
      after: updatedProject,
    });

    return NextResponse.json(updatedProject);
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
    const user = await requireAdmin({ permissions: ["projects.write"] });

    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Check for dependencies? Maybe cascade handles it or we should block if time entries exist?
    // For now, let's assume we can delete.
    // Actually, assignments and time entries might block deletion if foreign keys are restrictive.
    // Let's rely on Prisma to throw if there's a constraint violation.

    await prisma.project.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_project",
      resource: "project",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingProject,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Project delete error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
