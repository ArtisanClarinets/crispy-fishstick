/**
 * Hardened admin route wrappers with uniform security enforcement
 * @module lib/admin/route
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, RequireAdminOptions, AdminUserContext } from "./guards";
import { assertSameOrigin } from "@/lib/security/origin";
import { verifyCsrfToken } from "@/lib/security/csrf";
import { createAuditLog } from "./audit";
import { normalizeError } from "@/lib/api/errors";
import { getRequestId, getRequestMetadata } from "@/lib/api/request-id";
import { prisma } from "@/lib/prisma";

/**
 * Options for adminRead wrapper
 */
export interface AdminReadOptions extends RequireAdminOptions {
  /**
   * Cache duration in seconds (default: 0 for no-store)
   */
  cacheMaxAge?: number;
}

/**
 * Options for adminMutation wrapper
 */
export interface AdminMutationOptions extends RequireAdminOptions {
  /**
   * Rate limit key (if undefined, no rate limiting)
   */
  rateLimitKey?: string;
  
  /**
   * Rate limit: max requests per window
   */
  rateLimitMax?: number;
  
  /**
   * Rate limit window in seconds
   */
  rateLimitWindowSec?: number;
  
  /**
   * Audit configuration
   */
  audit?: {
    resource: string;
    action: string;
    resourceId?: string;
  };

  /**
   * Skip CSRF validation (use sparingly, only for webhooks or special cases)
   */
  skipCsrf?: boolean;
}

/**
 * Handler type for admin reads
 */
export type AdminReadHandler = (
  req: NextRequest,
  context: { user: AdminUserContext; requestId: string; [key: string]: any }
) => Promise<NextResponse> | NextResponse;

/**
 * Handler type for admin mutations
 */
export type AdminMutationHandler = (
  req: NextRequest,
  context: { user: AdminUserContext; requestId: string; [key: string]: any }
) => Promise<NextResponse> | NextResponse;

/**
 * Wrapper for admin read operations (GET)
 * 
 * Enforces:
 * - Authentication and authorization
 * - Cache-Control: no-store by default
 * - Request ID header
 * - Normalized error responses
 * 
 * @overload Direct handler (legacy/compact style)
 */
export function adminRead(
  options: AdminReadOptions,
  handler: AdminReadHandler
): (req: NextRequest, context: any) => Promise<NextResponse>;

/**
 * @overload Inline style - takes req as first param
 */
export function adminRead(
  req: NextRequest,
  options: AdminReadOptions,
  handler: (user: AdminUserContext) => Promise<any>
): Promise<NextResponse>;

/**
 * Implementation
 */
export function adminRead(
  reqOrOptions: NextRequest | AdminReadOptions,
  optionsOrHandler: AdminReadOptions | AdminReadHandler | ((user: AdminUserContext) => Promise<any>),
  inlineHandler?: (user: AdminUserContext) => Promise<any>
): ((req: NextRequest, context: any) => Promise<NextResponse>) | Promise<NextResponse> {
  // Check if first arg is a Request (inline style)
  if (reqOrOptions instanceof Request || (reqOrOptions as any).nextUrl) {
    const _req = reqOrOptions as NextRequest;
    const options = optionsOrHandler as AdminReadOptions;
    const handler = inlineHandler!;
    
    return (async () => {
      const requestId = await getRequestId();
      
      try {
        const user = await requireAdmin(options);
        const result = await handler(user);
        
        if (result?.error) {
          return NextResponse.json(
            { error: result.error },
            { 
              status: result.status || 400,
              headers: {
                "Cache-Control": "no-store, max-age=0",
                "X-Request-Id": requestId,
              },
            }
          );
        }
        
        return NextResponse.json(result.data || result, {
          status: result.status || 200,
          headers: {
            "Cache-Control": options.cacheMaxAge !== undefined
              ? `max-age=${options.cacheMaxAge}, private`
              : "no-store, max-age=0",
            "X-Request-Id": requestId,
          },
        });
      } catch (error) {
        return normalizeError(error, requestId);
      }
    })();
  }
  
  // Legacy style: return a handler function
  const options = reqOrOptions as AdminReadOptions;
  const handler = optionsOrHandler as AdminReadHandler;
  
  return async (req: NextRequest, context: any): Promise<NextResponse> => {
    const requestId = await getRequestId();
    
    try {
      // Require admin authentication and permissions
      const user = await requireAdmin(options);
      
      // Execute handler
      const response = await handler(req, { user, requestId, ...context });
      
      // Ensure no-store cache by default
      const cacheControl = options.cacheMaxAge !== undefined
        ? `max-age=${options.cacheMaxAge}, private`
        : "no-store, max-age=0";
      
      response.headers.set("Cache-Control", cacheControl);
      response.headers.set("X-Request-Id", requestId);
      
      return response;
    } catch (error) {
      return normalizeError(error, requestId);
    }
  };
}

/**
 * Wrapper for admin mutation operations (POST, PUT, DELETE, PATCH)
 * 
 * Enforces:
 * - Same-origin validation
 * - CSRF token validation
 * - Authentication and authorization
 * - Optional rate limiting
 * - Audit logging (before/after)
 * - Cache-Control: no-store
 * - Request ID header
 * - Normalized error responses
 * 
 * @overload Direct handler (legacy/compact style)
 */
export function adminMutation(
  options: AdminMutationOptions,
  handler: AdminMutationHandler
): (req: NextRequest, context: any) => Promise<NextResponse>;

/**
 * @overload Inline style - takes req as first param
 */
export function adminMutation(
  req: NextRequest,
  options: AdminMutationOptions,
  handler: (user: AdminUserContext, body: any) => Promise<any>
): Promise<NextResponse>;

/**
 * Implementation
 */
export function adminMutation(
  reqOrOptions: NextRequest | AdminMutationOptions,
  optionsOrHandler: AdminMutationOptions | AdminMutationHandler | ((user: AdminUserContext, body: any) => Promise<any>),
  inlineHandler?: (user: AdminUserContext, body: any) => Promise<any>
): ((req: NextRequest, context: any) => Promise<NextResponse>) | Promise<NextResponse> {
  // Check if first arg is a Request (inline style)
  if (reqOrOptions instanceof Request || (reqOrOptions as any).nextUrl) {
    const req = reqOrOptions as NextRequest;
    const options = optionsOrHandler as AdminMutationOptions;
    const handler = inlineHandler!;
    
    return (async () => {
      const requestId = await getRequestId();
      
      try {
        // 1. Enforce same-origin (CSRF defense layer 1)
        assertSameOrigin(req);
        
        // 2. Enforce CSRF token (CSRF defense layer 2)
        if (!options.skipCsrf) {
          await verifyCsrfToken(req);
        }
        
        // 3. Require admin authentication and permissions
        const user = await requireAdmin(options);
        
        // 4. Rate limiting (if configured)
        if (options.rateLimitKey) {
          await enforceRateLimit(
            options.rateLimitKey,
            user.id,
            options.rateLimitMax || 100,
            options.rateLimitWindowSec || 60
          );
        }
        
        // 5. Parse body if needed
        let body: any = null;
        if (req.method !== "GET" && req.method !== "DELETE") {
          try {
            body = await req.json();
          } catch {
            // Body might be empty or not JSON
          }
        }
        
        // 6. Execute handler
        const result = await handler(user, body);
        
        // 7. Handle result with audit
        if (result?.error) {
          return NextResponse.json(
            { error: result.error },
            { 
              status: result.status || 400,
              headers: {
                "Cache-Control": "no-store, max-age=0",
                "X-Request-Id": requestId,
              },
            }
          );
        }
        
        // 8. Audit logging if configured
        if (options.audit && result?.data) {
          const resourceId = options.audit.resourceId || result.data?.id;
          
          await createAuditLog({
            action: options.audit.action,
            resource: options.audit.resource,
            resourceId,
            actorId: user.id,
            actorEmail: user.email,
            after: result.data,
          });
        }
        
        return NextResponse.json(result.data || result, {
          status: result.status || 200,
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "X-Request-Id": requestId,
          },
        });
      } catch (error) {
        return normalizeError(error, requestId);
      }
    })();
  }
  
  // Legacy style: return a handler function
  const options = reqOrOptions as AdminMutationOptions;
  const handler = optionsOrHandler as AdminMutationHandler;
  
  return async (req: NextRequest, context: any): Promise<NextResponse> => {
    const requestId = await getRequestId();
    
    try {
      // 1. Enforce same-origin (CSRF defense layer 1)
      assertSameOrigin(req);
      
      // 2. Enforce CSRF token (CSRF defense layer 2)
      if (!options.skipCsrf) {
        await verifyCsrfToken(req);
      }
      
      // 3. Require admin authentication and permissions
      const user = await requireAdmin(options);
      
      // 4. Rate limiting (if configured)
      if (options.rateLimitKey) {
        await enforceRateLimit(
          options.rateLimitKey,
          user.id,
          options.rateLimitMax || 100,
          options.rateLimitWindowSec || 60
        );
      }
      
      // 5. Audit: capture "before" state if audit is configured
      let resourceId: string | undefined;
      let beforeState: any = null;
      
      if (options.audit) {
        // Try to extract resource ID from context.params, then URL
        if (context?.params?.id) {
          resourceId = context.params.id;
        } else {
          const urlParts = req.nextUrl.pathname.split("/");
          const possibleId = urlParts[urlParts.length - 1];
          if (possibleId && possibleId.length > 5 && !possibleId.includes(".")) {
            resourceId = possibleId;
          }
        }
          
        if (resourceId) {
          // Attempt to fetch "before" state for updates/deletes
          if (req.method === "PUT" || req.method === "PATCH" || req.method === "DELETE") {
            beforeState = await fetchResourceState(options.audit.resource, resourceId);
          }
        }
      }
      
      // 6. Execute handler
      const response = await handler(req, { user, requestId, ...context });
      
      // 7. Audit: capture "after" state and write audit log
      if (options.audit && response.ok) {
        let afterState: any = null;
        
        // For successful creates/updates, try to get state from response
        if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
          try {
            const clone = response.clone();
            const data = await clone.json();
            afterState = data;
            
            // Extract resource ID from response if we don't have it
            if (!resourceId && data?.id) {
              resourceId = data.id;
            }
          } catch {
            // Response might not be JSON, that's OK
          }
        }
        
        // Capture request metadata
        const _metadata = getRequestMetadata(req);
        
        await createAuditLog({
          action: options.audit.action,
          resource: options.audit.resource,
          resourceId,
          before: beforeState,
          after: afterState,
          actorId: user.id,
          actorEmail: user.email,
        });
      }
      
      // 8. Set security headers
      response.headers.set("Cache-Control", "no-store, max-age=0");
      response.headers.set("X-Request-Id", requestId);
      
      return response;
    } catch (error) {
      return normalizeError(error, requestId);
    }
  };
}

/**
 * Rate limiting enforcement
 */
async function enforceRateLimit(
  key: string,
  userId: string,
  max: number,
  windowSec: number
): Promise<void> {
  const rateLimitKey = `${key}:${userId}`;
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowSec * 1000);
  
  const existing = await prisma.rateLimit.findUnique({
    where: { key: rateLimitKey },
  });
  
  if (existing) {
    if (existing.resetAt > now) {
      // Window is active
      if (existing.count >= max) {
        throw new Error(`Rate limit exceeded. Try again in ${Math.ceil((existing.resetAt.getTime() - now.getTime()) / 1000)} seconds.`);
      }
      
      // Increment count
      await prisma.rateLimit.update({
        where: { key: rateLimitKey },
        data: { count: existing.count + 1 },
      });
    } else {
      // Window expired, reset
      await prisma.rateLimit.update({
        where: { key: rateLimitKey },
        data: { count: 1, resetAt },
      });
    }
  } else {
    // Create new rate limit entry
    await prisma.rateLimit.create({
      data: {
        key: rateLimitKey,
        count: 1,
        resetAt,
      },
    });
  }
}

/**
 * Fetch resource state for audit "before" snapshot
 */
async function fetchResourceState(resource: string, id: string): Promise<any> {
  try {
    // Map resource names to Prisma models
    const modelMap: Record<string, any> = {
      user: prisma.user,
      lead: prisma.lead,
      project: prisma.project,
      service: prisma.service,
      incident: prisma.incident,
      proposal: prisma.proposal,
      contract: prisma.contract,
      invoice: prisma.invoice,
      content: prisma.content,
      media: prisma.mediaAsset,
      tenant: prisma.tenant,
      role: prisma.role,
      assignment: prisma.roleAssignment,
      jit: prisma.jitAccessRequest,
      proposalComponent: prisma.proposalComponent,
      timeEntry: prisma.timeEntry,
      environment: prisma.environment,
      deployment: prisma.deployment,
    };
    
    const model = modelMap[resource];
    if (!model) return null;
    
    return await model.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
