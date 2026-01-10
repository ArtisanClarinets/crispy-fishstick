import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { SAFE_USER_WITH_ROLES_SELECT } from "@/lib/security/safe-user";
import { jsonNoStore } from "@/lib/security/response";
import * as z from "zod";
import { assertSameOrigin } from "@/lib/security/origin";
import bcrypt from "bcryptjs";
import { validatePasswordEnhanced, addToPasswordHistory } from "@/lib/security/password-enhanced";

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  roleIds: z.array(z.string()).optional(),
  password: z.string().min(12, "Password must be at least 12 characters").optional(),
});

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin({ permissions: ["users.read"] });

    console.log('[DEBUG] User GET - params.id:', params.id);
    const user = await prisma.user.findFirst({
      where: {
        id: params.id,
        deletedAt: null, // Filter out soft-deleted users
      },
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
    const { roleIds, password, ...userData } = validatedData;

    // Check if user exists and is not soft-deleted
    const existingUser = await prisma.user.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
      },
    });

    if (!existingUser) {
      return jsonNoStore({ error: "User not found" }, { status: 404 });
    }

    // Handle password change if provided
    if (password) {
      // Enhanced password validation
      const passwordError = await validatePasswordEnhanced(password, params.id);
      if (passwordError) {
        return jsonNoStore({ error: passwordError }, { status: 400 });
      }

      // Hash the new password
      const newPasswordHash = await bcrypt.hash(password, 10);

      // If user already has a password, add it to history before changing
      if (existingUser.passwordHash) {
        await addToPasswordHistory(params.id, existingUser.passwordHash);
      }

      // Add passwordHash to userData
      (userData as any).passwordHash = newPasswordHash;
    }

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

    const where: any = { id: params.id };
    if (actor.tenantId) {
      where.tenantId = actor.tenantId;
    }

    // Get user state before soft deletion for audit
    const userToDelete = await prisma.user.findFirst({
        where,
        select: { id: true, email: true }
    });

    if (!userToDelete) {
        return jsonNoStore({ error: "Not found" }, { status: 404 });
    }

    // Soft delete the user
    await prisma.user.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: actor.id,
        deleteReason: "Soft deleted by admin",
      },
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
