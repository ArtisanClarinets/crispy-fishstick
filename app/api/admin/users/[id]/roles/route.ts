export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateRolesSchema = z.object({
  roleIds: z.array(z.string()),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();
    const validatedData = updateRolesSchema.parse(body);

    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: { RoleAssignment: true },
    });

    if (!targetUser) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Use transaction to update roles
    await prisma.$transaction(async (tx) => {
      // Remove existing roles
      await tx.roleAssignment.deleteMany({
        where: { userId: params.id },
      });

      // Add new roles
      if (validatedData.roleIds.length > 0) {
        await tx.roleAssignment.createMany({
          data: validatedData.roleIds.map((roleId) => ({
            userId: params.id,
            roleId: roleId,
          })),
        });
      }
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: { RoleAssignment: true },
    });

    await createAuditLog({
      action: "update_roles",
      resource: "user",
      resourceId: params.id,
      actorId: adminUser.id,
      actorEmail: adminUser.email,
      before: targetUser,
      after: updatedUser,
    });

    return NextResponse.json(updatedUser);
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
    console.error("Failed to update user roles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
