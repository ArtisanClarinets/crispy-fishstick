export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { assertSameOrigin } from "@/lib/security/origin";
import { z } from "zod";

const updateRolesSchema = z.object({
  roleIds: z.array(z.string()),
});

// Safe select to avoid returning passwordHash and mfaSecret
const SAFE_USER_WITH_ROLES_SELECT = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  RoleAssignment: {
    include: {
      Role: true,
    },
  },
};

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // CSRF protection
    try {
      assertSameOrigin(req);
    } catch (_error) {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }

    const adminUser = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();
    const validatedData = updateRolesSchema.parse(body);

    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: { RoleAssignment: true },
    });

    if (!targetUser) {
      return new NextResponse("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
    }

    // Use transaction to update roles
    await prisma.$transaction(async (tx) => {
      // Remove existing roles
      await tx.roleAssignment.deleteMany({
        where: { userId: params.id },
      });

      // Add new roles
      if (validatedData.roleIds.length > 0) {
        // SQLite does not support createMany in this Prisma version
        await Promise.all(
          validatedData.roleIds.map((roleId) =>
            tx.roleAssignment.create({
              data: {
                userId: params.id,
                roleId: roleId,
              },
            })
          )
        );
      }
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: SAFE_USER_WITH_ROLES_SELECT,
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

    return NextResponse.json(updatedUser, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: _error.errors },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (_error instanceof Error && _error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    if (_error instanceof Error && _error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    console.error("Failed to update user roles:", _error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
