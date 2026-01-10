import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";
import { Redis } from "ioredis";
import { getRateLimiter } from "@/lib/security/rate-limit";
import { getAuditLogger } from "@/lib/security/audit";

// Create Redis client for rate limiting and audit logging
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const rateLimiter = getRateLimiter(redis);
const auditLogger = getAuditLogger(redis, {}, process.env.ADMIN_EMAILS?.split(',') || []);

// Store the current request for use in auth callbacks
let currentRequest: NextRequest | null = null;

async function rateLimitedHandler(req: NextRequest) {
  // Apply rate limiting to POST requests (login attempts)
  if (req.method === "POST") {
    const rateLimitResponse = await rateLimiter.middleware(req);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }
   
  // Store the request for use in auth callbacks
  currentRequest = req;
   
  // Create a custom handler that passes the request to auth options
  const handler = NextAuth({
    ...authOptions,
    callbacks: {
      ...authOptions.callbacks,
      async jwt({ token, user, trigger }) {
        if (user && currentRequest) {
          // Create session on sign-in
          const { createSession } = await import("@/lib/security/session");
          const sessionData = await createSession(user.id, currentRequest);
          token.sessionToken = sessionData.sessionToken;
          token.sessionCreatedAt = Date.now();
          
          // Log successful login
          try {
            const ip = auditLogger.getClientIp(currentRequest);
            await auditLogger.logEvent({
              eventType: "LOGIN_ATTEMPT",
              severity: "low",
              userId: user.id,
              email: user.email,
              ipAddress: ip,
              userAgent: currentRequest.headers.get("user-agent") || null,
              metadata: {
                action: "login_success",
                sessionId: sessionData.sessionToken
              },
              status: "success"
            });
          } catch (error) {
            console.error("Failed to log successful login:", error);
          }
        }
         
        // Handle session update on activity
        if (trigger === "update" && token.sessionToken) {
          try {
            const { updateSessionActivity } = await import("@/lib/security/session");
            await updateSessionActivity(token.sessionToken);
          } catch (error) {
            console.error("Failed to update session activity:", error);
          }
        }
         
        return token;
      }
    },
    events: {
      ...authOptions.events,
      async signIn(message) {
        // Log failed login attempts
        if (!message.user && currentRequest) {
          try {
            const ip = auditLogger.getClientIp(currentRequest);
            const email = (message as any)?.user?.email || (message as any)?.email || "unknown";
            
            await auditLogger.logEvent({
              eventType: "LOGIN_ATTEMPT",
              severity: "medium",
              email: email,
              ipAddress: ip,
              userAgent: currentRequest.headers.get("user-agent") || null,
              metadata: {
                action: "login_failed",
                email: email
              },
              status: "failure"
            });
          } catch (error) {
            console.error("Failed to log failed login:", error);
          }
        }
        
        // Call original signIn event if it exists
        if (authOptions.events?.signIn) {
          await authOptions.events.signIn(message);
        }
      }
    }
  });
   
  return handler(req);
}

export { rateLimitedHandler as GET, rateLimitedHandler as POST };
