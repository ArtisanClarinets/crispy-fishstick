import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const updateAssignmentSchema = z.object({
  role: z.string().optional(),
  endDate: z.string().optional(),
  allocationPercentage: z.number().min(0).max(100).optional(),
});

// Get assignment by ID
export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminRead(req, { permissions: ["assignments.read"] }, async (user) => {
    const assignment = await prisma.assignment.findFirst({
      where: { id: params.id },
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Project: {
          select: { id: true, name: true, tenantId: true },
        },
      },
    });

    if (!assignment) {
      return { error: "Assignment not found", status: 404 };
    }

    // Verify user has access to the project
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: assignment.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!hasAccess) {
      return { error: "Access denied", status: 403 };
    }

    return assignment;
  });
}

// Update assignment
export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["assignments.write"] }, async (user, body) => {
    const validatedData = updateAssignmentSchema.parse(body);

    const assignment = await prisma.assignment.findFirst({
      where: { id: params.id },
      include: { Project: true },
    });

    if (!assignment) {
      return { error: "Assignment not found", status: 404 };
    }

    // Verify access
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: assignment.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!hasAccess) {
      return { error: "Access denied", status: 403 };
    }

    const updated = await prisma.assignment.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        ...(validatedData.endDate && { endDate: new Date(validatedData.endDate) }),
      },
    });

    return updated;
  });
}

// Delete assignment
export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["assignments.write"] }, async (user) => {
    const assignment = await prisma.assignment.findFirst({
      where: { id: params.id },
      include: { Project: true },
    });

    if (!assignment) {
      return { error: "Assignment not found", status: 404 };
    }

    // Verify access
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: assignment.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!hasAccess) {
      return { error: "Access denied", status: 403 };
    }

    // Hard delete for assignments (no soft delete in schema)
    await prisma.assignment.delete({
      where: { id: params.id },
    });

    return { success: true };
  });
}
