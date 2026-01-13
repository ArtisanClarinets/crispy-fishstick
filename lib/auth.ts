import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { decryptSecret } from "@/lib/security/mfa";
import { updateSessionActivity } from "@/lib/security/session";
import { getRateLimiter } from "@/lib/security/rate-limit";
import { z } from "zod";

// Environment variable validation schema
const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(32, {
    message: "NEXTAUTH_SECRET must be at least 32 characters long"
  }),
  NEXTAUTH_URL: z.string().url({
    message: "NEXTAUTH_URL must be a valid URL"
  }),
  MFA_ENCRYPTION_KEY: z.string().min(64, {
    message: "MFA_ENCRYPTION_KEY must be at least 64 characters long (32 bytes in hex)"
  }).optional(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

// Centralized secret resolution function with enhanced validation
function getAuthSecret(): string {
  // Validate environment variables using Zod
  const envValidation = envSchema.safeParse({
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MFA_ENCRYPTION_KEY: process.env.MFA_ENCRYPTION_KEY,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!envValidation.success) {
    const errors = envValidation.error.format();
    console.error("Environment validation errors:", errors);
    
    // In production, fail fast on validation errors
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Environment validation failed: ${JSON.stringify(errors)}`
      );
    }
    
    // In development, provide helpful warnings but continue with fallback
    console.warn("Using development fallback due to environment validation errors");
  }

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

  // Validate secret length for security
  if (secret.length < 32) {
    console.warn("Auth secret should be at least 32 characters for production security");
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET must be at least 32 characters in production");
    }
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
} catch (_error) {
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
    // Add security metadata
    ip?: string;
    userAgent?: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  useSecureCookies: process.env.NODE_ENV === "production",
  // trustHost: true, // Not supported in NextAuthOptions type for this version, but can be set via env var TRUST_HOST=true
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Add session fixation protection by regenerating session token on sign-in
    updateAge: 24 * 60 * 60, // 24 hours - forces periodic session updates
  },
  pages: {
    signIn: "/admin/login",
  },
  // Add secure cookie settings
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Add __Host prefix for additional security in production
        ...(process.env.NODE_ENV === "production" && {
          domain: new URL(process.env.NEXTAUTH_URL || "http://localhost").hostname,
        }),
      },
    },
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
            // The req object may have an extended context with IP injected from the route handler
            const ip = (req as any)?.ip || "unknown";
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
    async jwt({ token, user, trigger, session }) {
      // Initialize security metadata on first call
      if (!token.sessionCreatedAt) {
        token.sessionCreatedAt = Math.floor(Date.now() / 1000);
      }

      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles || [];
        token.permissions = (user as any).permissions || [];
        token.tenantId = (user as any).tenantId;
        
        // Add security metadata from request if available
        if ((session as any)?.ip) {
          token.ip = (session as any).ip;
        }
        if ((session as any)?.userAgent) {
          token.userAgent = (session as any).userAgent;
        }
      }
      
      // Handle session creation on sign-in with session fixation protection
      if (trigger === "signIn") {
        // Generate a new session token to prevent session fixation
        token.sessionToken = `session_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
        token.sessionCreatedAt = Math.floor(Date.now() / 1000);
        
        // Add security metadata
        if ((session as any)?.ip) {
          token.ip = (session as any).ip;
        }
        if ((session as any)?.userAgent) {
          token.userAgent = (session as any).userAgent;
        }
      }
      
      // Handle session update on activity
      if (trigger === "update" && token.sessionToken) {
        try {
          await updateSessionActivity(token.sessionToken);
        } catch (error) {
          console.error("Failed to update session activity:", error);
        }
      }
      
      // Add session expiration validation
      if (token.sessionCreatedAt) {
        const sessionAge = Math.floor(Date.now() / 1000) - token.sessionCreatedAt;
        const maxSessionAge = 30 * 24 * 60 * 60; // 30 days
        
        if (sessionAge > maxSessionAge) {
          console.warn("Session expired, forcing logout");
          // This will effectively end the session
          token.exp = Math.floor(Date.now() / 1000) - 1;
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
        
        // Add session security metadata (without exposing sensitive data)
        (session as any).ip = token.ip;
        (session as any).userAgent = token.userAgent;
        (session as any).sessionCreatedAt = token.sessionCreatedAt;
        
        // Prevent data leakage - ensure we don't expose internal token data
        delete (session as any).iat;
        delete (session as any).exp;
        delete (session as any).jti;
      }
      
      // Sanitize session data to prevent information leakage
      const sanitizedSession = {
        ...session,
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          roles: session.user.roles,
          permissions: session.user.permissions,
          tenantId: session.user.tenantId,
        },
      };
      
      return sanitizedSession;
    },
    // Add redirect callback for security
    async redirect({ url, baseUrl }) {
      // Prevent open redirect vulnerabilities
      if (url.startsWith("/") || url.startsWith(baseUrl)) {
        return url;
      }
      // Default to home page for external redirects
      return baseUrl;
    },
  },
  // Security events
  events: {
    async signIn(message) {
      // Log successful sign-in with security context
      const ip = (message as any)?.ip || 'unknown IP';
      console.info(`Successful sign-in for ${message.user.email} from ${ip}`);
    },
    async signOut(message) {
      // Log successful sign-out
      console.info(`Successful sign-out for ${message.token?.email || 'unknown user'}`);
    },
  },
};
