'use server';

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { decryptSecret } from "@/lib/security/mfa";

// Rate limiter instance (same as in auth.ts)
let rateLimiterInstance: any = null;

try {
  const Redis = require('ioredis');
  const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  const { getRateLimiter } = require("@/lib/security/rate-limit");
  rateLimiterInstance = getRateLimiter(redis);
} catch (_error) {
  console.warn('Redis not available, rate limiting will be disabled');
  rateLimiterInstance = {
    checkLoginAttempt: async () => ({ success: true, remaining: 5 }),
    getClientIp: () => '127.0.0.1',
  };
}

// Extracted authorize logic from credentials provider
async function authorizeCredentials(credentials: { email: string; password: string; code?: string }, req?: any) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
    // Extract IP address from request context
    const ip = req?.ip || "unknown";
    const email = credentials.email;

    // Apply rate limiting for login attempts if rate limiter is available
    if (rateLimiterInstance) {
      const rateLimitResult = await rateLimiterInstance.checkLoginAttempt(ip, email);

      if (!rateLimitResult.success) {
        const error = new Error("RATE_LIMIT_EXCEEDED");
        (error as any).retryAfter = rateLimitResult.retryAfter;
        throw error;
      }
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
      include: {
        RoleAssignment: {
          include: {
            Role: true,
          },
        },
      },
    });

    // Check if user is soft-deleted
    if (user?.deletedAt) {
      return null;
    }

    if (!user || !user.passwordHash) {
      return null;
    }

    const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

    if (!isValid) {
      return null;
    }

    if (user.mfaSecret) {
      if (!credentials.code) {
        throw new Error("MFA_REQUIRED");
      }

      try {
        const decryptedSecret = await decryptSecret(user.mfaSecret);
        if (!decryptedSecret) {
          throw new Error("MFA_ERROR");
        }

        const isValidToken = authenticator.check(credentials.code, decryptedSecret);
        if (!isValidToken) {
          throw new Error("INVALID_MFA_CODE");
        }
      } catch (error) {
        if (error instanceof Error && (error.message === "MFA_ERROR" || error.message === "INVALID_MFA_CODE")) {
          throw error;
        }
        throw new Error("INVALID_MFA_CODE");
      }
    }

    // Parse permissions
    const permissions = user.RoleAssignment.flatMap((r) => {
      try {
        return JSON.parse(r.Role.permissions);
      } catch {
        return [];
      }
    });
    const uniquePermissions = Array.from(new Set(permissions));

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.RoleAssignment.map((r) => r.Role.name),
      permissions: uniquePermissions as string[],
      tenantId: user.tenantId,
    };
  } catch (error: any) {
    // Handle rate limit errors
    if (error.message === "RATE_LIMIT_EXCEEDED") {
      throw error;
    }

    // Handle Prisma errors (P2021: Table does not exist)
    if (error.code === 'P2021' || error.code === 'P2022') {
      throw new Error("DB_SCHEMA_NOT_READY");
    }

    // Re-throw known auth errors
    if (error.message === "MFA_REQUIRED" || error.message === "INVALID_MFA_CODE" || error.message === "MFA_ERROR") {
      throw error;
    }

    throw new Error("AUTH_ERROR");
  }
}

// Server Action for login
export async function loginAction(credentials: { email: string; password: string; code?: string }) {
  try {
    const user = await authorizeCredentials(credentials, { ip: 'server-action' });

    if (!user) {
      return { error: 'AUTH_ERROR' };
    }

    // Create session by encoding JWT and setting cookie
    const { encode } = await import('next-auth/jwt');
    const { cookies } = await import('next/headers');
    const { authOptions } = await import('@/lib/auth');

    const token = await encode({
      token: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        permissions: user.permissions,
        tenantId: user.tenantId,
        sessionToken: `session_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`,
        sessionCreatedAt: Math.floor(Date.now() / 1000),
      },
      secret: authOptions.secret as string,
    });

    // Set the session cookie
    const cookieName = authOptions.cookies?.sessionToken?.name || 'next-auth.session-token';
    const cookieOptions = authOptions.cookies?.sessionToken?.options || {};

    (await cookies()).set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      ...cookieOptions,
    });

    return { success: true };
  } catch (error: any) {
    if (error.message === "RATE_LIMIT_EXCEEDED") {
      return { error: "RATE_LIMIT_EXCEEDED", retryAfter: error.retryAfter };
    }
    if (error.message === "DB_SCHEMA_NOT_READY") {
      return { error: "DB_SCHEMA_NOT_READY" };
    }
    if (error.message === "MFA_REQUIRED") {
      return { error: "MFA_REQUIRED" };
    }
    if (error.message === "INVALID_MFA_CODE") {
      return { error: "INVALID_MFA_CODE" };
    }
    return { error: "AUTH_ERROR" };
  }
}