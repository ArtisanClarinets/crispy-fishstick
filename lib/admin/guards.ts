import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export type AdminUserContext = {
  id: string;
  email: string;
  name: string | null;
  roles: string[];
  permissions: string[];
  tenantId: string | null;
};

export async function getSessionUser(): Promise<AdminUserContext | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  // Always re-fetch from DB to ensure latest permissions/roles/JIT
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      RoleAssignment: {
        include: {
          Role: true,
        },
      },
      JitAccessRequest: {
        where: {
          status: "approved",
          expiresAt: {
            gt: new Date(),
          },
        },
      },
    },
  });

  if (!user) return null;

  // SQLite Refactor: Parse permissions string
  const rolePermissions = user.RoleAssignment.flatMap((r) => {
    try {
      return JSON.parse(r.Role.permissions);
    } catch {
      return [];
    }
  });
  
  // JIT permissions
  const jitRoleIds = user.JitAccessRequest.map(j => j.roleId).filter(Boolean) as string[];
  
  let jitPermissions: string[] = [];
  if (jitRoleIds.length > 0) {
      const jitRoles = await prisma.role.findMany({
          where: { id: { in: jitRoleIds } }
      });
      jitPermissions = jitRoles.flatMap(r => {
        try {
          return JSON.parse(r.permissions);
        } catch {
          return [];
        }
      });
  }

  const allPermissions = Array.from(new Set([...rolePermissions, ...jitPermissions])) as string[];

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.RoleAssignment.map((r) => r.Role.name),
    permissions: allPermissions,
    tenantId: user.tenantId,
  };
}

export interface RequireAdminOptions {
  permissions?: string[];
  tenantScope?: "any" | "tenantOnly";
}

export async function requireAdmin(opts: RequireAdminOptions = {}) {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (opts.permissions && opts.permissions.length > 0) {
    const hasWildcard = user.permissions.includes("*");
    if (!hasWildcard) {
      const hasAll = opts.permissions.every((p) => user.permissions.includes(p));
      if (!hasAll) {
        throw new Error("Forbidden");
      }
    }
  }

  return user;
}

// Helper to wrap route handlers
export function withAdminGuard(
  handler: (req: Request, context: any, user: AdminUserContext) => Promise<NextResponse>,
  opts: RequireAdminOptions = {}
) {
  return async (req: Request, context: any) => {
    try {
      const user = await requireAdmin(opts);
      return handler(req, context, user);
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      if (error.message === "Forbidden") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
      console.error("Admin Guard Error:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  };
}
