import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { jsonNoStore } from "@/lib/security/response";
import { assertSameOrigin } from "@/lib/security/origin";
import { validatePasswordEnhanced, addToPasswordHistory } from "@/lib/security/password-enhanced";
import { revokeAllUserSessions } from "@/lib/security/session";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(12, "New password must be at least 12 characters"),
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    // @ts-ignore - req type mismatch between next/server and built-in Request, but it works at runtime
    assertSameOrigin(req);

    const actor = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();

    const validatedData = changePasswordSchema.parse(body);
    const { currentPassword, newPassword } = validatedData;

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { id: actor.id },
    });

    if (!user || !user.passwordHash) {
      return jsonNoStore({ error: "User not found or password not set" }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return jsonNoStore({ error: "Current password is incorrect" }, { status: 400 });
    }

    // Enhanced password validation
    const passwordError = await validatePasswordEnhanced(newPassword, actor.id);
    if (passwordError) {
      return jsonNoStore({ error: passwordError }, { status: 400 });
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Revoke all existing sessions before changing password
    await revokeAllUserSessions(actor.id, 'PASSWORD_CHANGED');

    // Update user password
    await prisma.user.update({
      where: { id: actor.id },
      data: { passwordHash: newPasswordHash },
    });

    // Add the old password to history
    await addToPasswordHistory(actor.id, user.passwordHash);

    await createAuditLog({
      action: "change_password",
      resource: "user",
      resourceId: actor.id,
      actorId: actor.id,
      actorEmail: actor.email,
      after: { message: "Password changed successfully" },
    });

    return jsonNoStore({ success: true, message: "Password changed successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonNoStore({ error: error.errors }, { status: 400 });
    }
    // Check for Origin/Referer error
    if (error instanceof Error && (error.message.includes("Origin") || error.message.includes("Referer"))) {
        return jsonNoStore({ error: error.message }, { status: 403 });
    }
    console.error("Password change error:", error);
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}