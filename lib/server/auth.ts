// 'use server' - This is a server-only module
// Next.js 16 Server-Side Session Utility with caching
// Provides optimized session retrieval for Server Components

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cache } from 'react';

export type ServerSessionUser = {
  id: string;
  email: string;
  name: string | null;
  roles: string[];
  permissions: string[];
  tenantId: string | null;
  // Security metadata (without sensitive token data)
  ip?: string | null;
  userAgent?: string | null;
  sessionCreatedAt?: number | null;
};

/**
 * Cached session retrieval with Next.js 16 optimizations
 * Uses 'cache' from react to memoize session lookups within the same request lifecycle
 * Prevents redundant database queries across multiple Server Components
 */
export const getServerSessionUser = cache(async (): Promise<ServerSessionUser | null> => {
  // Step 1: Get the NextAuth session
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  // Step 2: Always re-fetch from DB to ensure latest permissions/roles/JIT
  // This prevents stale data issues and ensures security consistency
  const user = await prisma.user.findFirst({
    where: { 
      email: session.user.email, 
      deletedAt: null 
    }, // Exclude soft-deleted users
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

  if (!user) {
    return null;
  }

  // Step 3: Parse permissions with error handling
  const rolePermissions = user.RoleAssignment.flatMap((r) => {
    try {
      return JSON.parse(r.Role.permissions);
    } catch {
      return [];
    }
  });
  
  // Step 4: Process JIT permissions
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

  // Step 5: Merge all permissions and deduplicate
  const allPermissions = Array.from(new Set([...rolePermissions, ...jitPermissions])) as string[];

  // Step 6: Return comprehensive user context with security metadata
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.RoleAssignment.map((r) => r.Role.name),
    permissions: allPermissions,
    tenantId: user.tenantId,
    // Security metadata from session (sanitized)
    ip: (session as any).ip || null,
    userAgent: (session as any).userAgent || null,
    sessionCreatedAt: (session as any).sessionCreatedAt || null,
  };
});

/**
 * Lightweight session check for non-critical components
 * Returns basic session info without DB lookup for performance
 */
export async function checkServerSession(): Promise<{
  isAuthenticated: boolean;
  userEmail: string | null;
  userId: string | null;
} | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return { 
      isAuthenticated: false,
      userEmail: null,
      userId: null
    };
  }

  return {
    isAuthenticated: true,
    userEmail: session.user.email,
    userId: session.user.id,
  };
}

/**
 * Authorization helper for Server Components
 * Enforces RBAC with tenant isolation
 */
export async function requireServerAuth(
  requiredPermissions?: string[],
  tenantScope: "any" | "tenantOnly" = "any"
): Promise<ServerSessionUser> {
  const user = await getServerSessionUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Enforce permission requirements
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasWildcard = user.permissions.includes("*");
    if (!hasWildcard) {
      const hasAllRequired = requiredPermissions.every((p) => user.permissions.includes(p));
      if (!hasAllRequired) {
        throw new Error("Forbidden");
      }
    }
  }

  // Enforce tenant scope requirements
  if (tenantScope === "tenantOnly") {
    const hasWildcard = user.permissions.includes("*");
    if (!hasWildcard && !user.tenantId) {
      throw new Error("Forbidden");
    }
  }

  return user;
}

/**
 * Tenant-scoped where clause builder for Server Components
 * Ensures data isolation at the database level
 */
export function buildTenantWhereClause(
  user: ServerSessionUser,
  requestedTenantId?: string | null
) {
  const hasWildcard = user.permissions.includes("*");
  
  if (hasWildcard) {
    // Global admin can see all tenants
    if (requestedTenantId) {
      return { tenantId: requestedTenantId };
    }
    return {}; // No tenant filter for global admins
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