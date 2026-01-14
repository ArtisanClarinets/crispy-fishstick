import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";
// import { getServerSessionUser, requireServerAuth, ServerSessionUser } from "@/shared/lib/server/auth";

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
  const user = await prisma.user.findFirst({
    where: { email: session.user.email, deletedAt: null }, // Exclude soft-deleted users
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
  
  // Enforce tenant scope if requested
  if (opts.tenantScope === "tenantOnly") {
    const hasWildcard = user.permissions.includes("*");
    if (!hasWildcard && !user.tenantId) {
      throw new Error("Forbidden");
    }
  }

  return user;
}

/**
 * Build Prisma where clause for tenant scoping
 * 
 * Enforces tenant boundaries for tenant-owned resources.
 * - If user has wildcard permission, no tenant filter
 * - If requestedTenantId provided, ensure user has access
 * - Otherwise, filter to user's tenant only
 */
export function tenantWhere(user: AdminUserContext, requestedTenantId?: string | null) {
  const hasWildcard = user.permissions.includes("*");
  
  if (hasWildcard) {
    // Global admin can see all tenants
    if (requestedTenantId) {
      return { tenantId: requestedTenantId };
    }
    return {}; // No tenant filter
  }
  
  // Non-global users are restricted to their tenant
  if (requestedTenantId) {
    // Verify the requested tenant matches user's tenant
    if (requestedTenantId !== user.tenantId) {
      throw new Error("Forbidden");
    }
    return { tenantId: requestedTenantId };
  }
  
  // Default to user's tenant
  if (!user.tenantId) {
    throw new Error("User has no tenant assignment");
  }
  
  return { tenantId: user.tenantId };
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
