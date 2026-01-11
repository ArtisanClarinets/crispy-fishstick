import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["active", "completed", "archived"]).optional(),
});

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminRead(req, { permissions: ["projects.read"] }, async (user) => {
    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
        ...tenantWhere(user),
      },
      include: {
        Tenant: true,
        _count: {
          select: { Assignment: true, TimeEntry: true },
        },
      },
    });

    if (!project) {
      return { error: "Project not found", status: 404 };
    }

    return { data: project };
  });
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(
    req,
    {
      permissions: ["projects.write"],
      audit: { action: "update_project", resource: "project", resourceId: params.id },
    },
    async (user, body) => {
      const validatedData = updateProjectSchema.parse(body);

      const project = await prisma.project.updateMany({
        where: {
          id: params.id,
          deletedAt: null,
          ...tenantWhere(user),
        },
        data: validatedData,
      });

      if (project.count === 0) {
        return { error: "Project not found or already deleted", status: 404 };
      }

      const updated = await prisma.project.findUniqueOrThrow({
        where: { id: params.id },
        include: { Tenant: true },
      });

      return { data: updated };
    }
  );
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(
    req,
    {
      permissions: ["projects.write"],
      audit: { action: "delete_project", resource: "project", resourceId: params.id },
    },
    async (user) => {
      const deleteReason = req.headers.get("X-Delete-Reason") || "Deleted by admin";

      const project = await prisma.project.updateMany({
        where: {
          id: params.id,
          deletedAt: null,
          ...tenantWhere(user),
        },
        data: {
          deletedAt: new Date(),
          deletedBy: user.id,
          deleteReason,
        },
      });

      if (project.count === 0) {
        return { error: "Project not found or already deleted", status: 404 };
      }

      return { data: { success: true, message: "Project soft deleted" } };
    }
  );
}
