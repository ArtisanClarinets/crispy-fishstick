import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { decryptSecret } from "@/lib/security/mfa";
import { updateSessionActivity } from "@/lib/security/session";
import { Redis } from "ioredis";
import { getRateLimiter } from "@/lib/security/rate-limit";

// Centralized secret resolution function
function getAuthSecret(): string {
  // Try NEXTAUTH_SECRET first, then fall back to AUTH_SECRET for compatibility
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

  if (process.env.NODE_ENV === "production" && !secret) {
    throw new Error(
      "Auth secret is required in production. Please set NEXTAUTH_SECRET or AUTH_SECRET in your environment variables."
    );
  }

  if (!secret) {
    // In development, provide a fallback secret for convenience
    console.warn("No auth secret found. Using a development fallback secret.");
    return "dev-secret-fallback-for-development-only";
  }

  return secret;
}

// Get the secret once and enforce requirements
const nextAuthSecret = getAuthSecret();

// Create Redis client for rate limiting
let rateLimiterInstance: any = null;

try {
  const Redis = require('ioredis');
  const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  rateLimiterInstance = getRateLimiter(redis);
} catch (error) {
  console.warn('Redis not available, rate limiting will be disabled');
  // Create a mock rate limiter for testing/fallback
  rateLimiterInstance = {
    checkLoginAttempt: async () => ({ success: true, remaining: 5 }),
    getClientIp: () => '127.0.0.1',
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      roles: string[];
      permissions: string[];
      tenantId?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    permissions: string[];
    tenantId?: string | null;
    sessionToken?: string;
    sessionCreatedAt?: number;
  }
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  useSecureCookies: process.env.NODE_ENV === "production",
  // trustHost: true, // Not supported in NextAuthOptions type for this version, but can be set via env var TRUST_HOST=true
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
            // Extract IP address from request context
            const ip = req?.ip || "127.0.0.1";
            const email = credentials.email;
            
            // Apply rate limiting for login attempts if rate limiter is available
            if (rateLimiterInstance) {
              const rateLimitResult = await rateLimiterInstance.checkLoginAttempt(ip, email);
              
              if (!rateLimitResult.success) {
                // Rate limit exceeded
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
              // Decrypt the stored secret before verification
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
              // Handle malformed token or other errors
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
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles || [];
        token.permissions = (user as any).permissions || [];
        token.tenantId = (user as any).tenantId;
      }
      
      // Handle session creation on sign-in
      if (trigger === "signIn") {
        // This will be handled in the authorize function where we have access to the request
      }
      
      // Handle session update on activity
      if (trigger === "update" && token.sessionToken) {
        try {
          await updateSessionActivity(token.sessionToken);
        } catch (error) {
          console.error("Failed to update session activity:", error);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },
};
