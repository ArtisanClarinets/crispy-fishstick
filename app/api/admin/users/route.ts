import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SAFE_USER_WITH_ROLES_SELECT } from "@/lib/security/safe-user";
import { jsonNoStore } from "@/lib/security/response";
import { assertSameOrigin } from "@/lib/security/origin";
import { validatePassword } from "@/lib/security/password";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().optional(),
  roleIds: z.array(z.string()).optional(), // Array of Role IDs
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin({ permissions: ["users.read"] });

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    return jsonNoStore(users);
  } catch (_error) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    // @ts-ignore - req type mismatch between next/server and built-in Request, but it works at runtime
    assertSameOrigin(req);

    const user = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();

    const validatedData = createUserSchema.parse(body);
    const { roleIds, password, ...userData } = validatedData;

    let passwordHash: string | undefined;

    if (password) {
      // Phase 7: Strict password policy
      const passwordError = validatePassword(password);
      if (passwordError) {
        return jsonNoStore({ error: passwordError }, { status: 400 });
      }
      passwordHash = await bcrypt.hash(password, 10);
    }

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
        RoleAssignment: roleIds ? {
          create: roleIds.map((roleId) => ({
            Role: { connect: { id: roleId } },
          })),
        } : undefined,
      },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    await createAuditLog({
      action: "create_user",
      resource: "user",
      resourceId: newUser.id,
      actorId: user.id,
      actorEmail: user.email,
      after: newUser,
    });

    return jsonNoStore(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonNoStore({ error: error.errors }, { status: 400 });
    }
    // Check for Origin/Referer error
    if (error instanceof Error && (error.message.includes("Origin") || error.message.includes("Referer"))) {
        return jsonNoStore({ error: error.message }, { status: 403 });
    }
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}
