import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SAFE_USER_WITH_ROLES_SELECT } from "@/lib/security/safe-user";
import { jsonNoStore } from "@/lib/security/response";
import { assertSameOrigin } from "@/lib/security/origin";
import { verifyCsrfToken } from "@/lib/security/csrf";
import { validatePasswordEnhanced } from "@/lib/security/password-enhanced";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(12, "Password must be at least 12 characters"),
  roleIds: z.array(z.string()).optional(), // Array of Role IDs
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAdmin({ permissions: ["users.read"] });

    const where: any = {
      deletedAt: null, // Filter out soft-deleted users
    };
    if (user.tenantId) {
      where.tenantId = user.tenantId;
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    return jsonNoStore(users);
  } catch (error: any) {
    if (error?.message === "Forbidden") {
      return jsonNoStore({ error: "Forbidden" }, { status: 403 });
    }
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    assertSameOrigin(req);
    await verifyCsrfToken(req);

    const actor = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();

    const validatedData = createUserSchema.parse(body);
    const { roleIds, password, ...userData } = validatedData;

    let passwordHash: string;

    // Enhanced password validation with entropy, breach detection, and history prevention
    const passwordError = await validatePasswordEnhanced(password);
    if (passwordError) {
      return jsonNoStore({ error: passwordError }, { status: 400 });
    }
    passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
        tenantId: actor.tenantId || null,
        RoleAssignment: roleIds ? {
          create: roleIds.map((roleId) => ({
            Role: { connect: { id: roleId } },
          })),
        } : undefined,
        // Add initial password to history
        passwordHistory: {
          create: {
            passwordHash: passwordHash,
          }
        }
      },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    await createAuditLog({
      action: "create_user",
      resource: "user",
      resourceId: newUser.id,
      actorId: actor.id,
      actorEmail: actor.email,
      after: newUser,
    });

    return jsonNoStore(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonNoStore({ error: error.errors }, { status: 400 });
    }
    // Check for Origin/Referer/CSRF error
    if (error instanceof Error && (
        error.message.includes("Origin") ||
        error.message.includes("Referer") ||
        error.message.includes("CSRF")
    )) {
        return jsonNoStore({ error: error.message }, { status: 403 });
    }
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}
