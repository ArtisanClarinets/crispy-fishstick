export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tenantId: z.string().min(1, "Tenant is required"),
  status: z.enum(["active", "completed", "archived"]).default("active"),
});

export async function GET() {
  try {
    await requireAdmin({ permissions: ["projects.read"] });

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Tenant: true,
        _count: {
          select: { Assignment: true, TimeEntry: true },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin({ permissions: ["projects.write"] });

    const body = await req.json();
    const validatedData = createProjectSchema.parse(body);

    const project = await prisma.project.create({
      data: validatedData,
    });

    await createAuditLog({
      action: "create",
      resource: "project",
      resourceId: project.id,
      actorId: user.id,
      actorEmail: user.email,
      after: project,
    });

    return NextResponse.json(project, { status: 201 });
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
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
