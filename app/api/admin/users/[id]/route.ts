import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { SAFE_USER_WITH_ROLES_SELECT } from "@/lib/security/safe-user";
import { jsonNoStore } from "@/lib/security/response";
import * as z from "zod";
import { assertSameOrigin } from "@/lib/security/origin";

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  roleIds: z.array(z.string()).optional(),
});

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin({ permissions: ["users.read"] });

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    if (!user) {
      return jsonNoStore({ error: "Not found" }, { status: 404 });
    }

    return jsonNoStore(user);
  } catch (_error) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    // @ts-ignore
    assertSameOrigin(req);

    const actor = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();

    const validatedData = updateUserSchema.parse(body);
    const { roleIds, ...userData } = validatedData;

    // Handle role updates if provided
    if (roleIds) {
      // Phase 7: Role changes must be transactional
      await prisma.$transaction(async (tx) => {
        await tx.roleAssignment.deleteMany({
          where: { userId: params.id },
        });
        
        for (const roleId of roleIds) {
            await tx.roleAssignment.create({
                data: {
                    userId: params.id,
                    roleId: roleId
                }
            });
        }
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: userData,
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    await createAuditLog({
      action: "update_user",
      resource: "user",
      resourceId: updatedUser.id,
      actorId: actor.id,
      actorEmail: actor.email,
      after: updatedUser,
    });

    return jsonNoStore(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonNoStore({ error: error.errors }, { status: 400 });
    }
    if (error instanceof Error && (error.message.includes("Origin") || error.message.includes("Referer"))) {
        return jsonNoStore({ error: error.message }, { status: 403 });
    }
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    // @ts-ignore
    assertSameOrigin(request);

    const actor = await requireAdmin({ permissions: ["users.write"] });
    
    // Prevent deleting yourself
    if (actor.id === params.id) {
      return jsonNoStore({ error: "Cannot delete yourself" }, { status: 400 });
    }

    // Get user state before deletion for audit
    const userToDelete = await prisma.user.findUnique({
        where: { id: params.id },
        select: { id: true, email: true } 
    });

    if (!userToDelete) {
        return jsonNoStore({ error: "Not found" }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_user",
      resource: "user",
      resourceId: params.id,
      actorId: actor.id,
      actorEmail: actor.email,
      before: userToDelete,
    });

    return jsonNoStore({ success: true });
  } catch (error) {
    if (error instanceof Error && (error.message.includes("Origin") || error.message.includes("Referer"))) {
        return jsonNoStore({ error: error.message }, { status: 403 });
    }
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}
