import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

export const dynamic = "force-dynamic";

const updateRoleAssignmentSchema = z.object({
  scopeType: z.enum(["GLOBAL", "TENANT", "PROJECT", "SERVICE", "REGION"]).optional(),
  scopeId: z.string().optional(),
});

// Get role assignment by ID
export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminRead(req, { permissions: ["roles.read"] }, async () => {
    const assignment = await prisma.roleAssignment.findUnique({
      where: { id: params.id },
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Role: {
          select: { id: true, name: true, permissions: true },
        },
      },
    });

    if (!assignment) {
      return { error: "Role assignment not found", status: 404 };
    }

    return assignment;
  });
}

// Update role assignment
export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["roles.write"] }, async (user, body) => {
    const validatedData = updateRoleAssignmentSchema.parse(body);

    const assignment = await prisma.roleAssignment.findUnique({
      where: { id: params.id },
    });

    if (!assignment) {
      return { error: "Role assignment not found", status: 404 };
    }

    const updated = await prisma.roleAssignment.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Role: {
          select: { id: true, name: true, permissions: true },
        },
      },
    });

    return updated;
  });
}

// Delete role assignment
export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["roles.write"] }, async () => {
    const assignment = await prisma.roleAssignment.findUnique({
      where: { id: params.id },
    });

    if (!assignment) {
      return { error: "Role assignment not found", status: 404 };
    }

    await prisma.roleAssignment.delete({
      where: { id: params.id },
    });

    return { success: true };
  });
}
