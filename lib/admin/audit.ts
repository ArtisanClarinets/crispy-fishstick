import { prisma } from "@/lib/prisma";
import { getSessionUser } from "./guards";
import { headers } from "next/headers";
import { redactForAudit } from "@/lib/security/redact";
import { getRequestId } from "@/lib/api/request-id";

export interface CreateAuditLogParams {
  action: string;
  resource: string;
  resourceId?: string;
  before?: any;
  after?: any;
  actorId?: string;
  actorEmail?: string;
  failClosed?: boolean; // If true, throw on audit failure
}

/**
 * Compute diff between before and after states (simple JSON comparison)
 * For production, consider using a library like jsondiffpatch
 */
function computeDiff(before: any, after: any): string | null {
  if (!before || !after) return null;
  
  try {
    const changes: Record<string, any> = {};
    
    // Simple field-level diff
    const allKeys = new Set([
      ...Object.keys(before || {}),
      ...Object.keys(after || {}),
    ]);
    
    for (const key of allKeys) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        changes[key] = {
          old: before[key],
          new: after[key],
        };
      }
    }
    
    return Object.keys(changes).length > 0 ? JSON.stringify(changes) : null;
  } catch {
    return null;
  }
}

export async function createAuditLog(params: CreateAuditLogParams) {
  let actorId = params.actorId;
  let actorEmail = params.actorEmail;

  if (!actorId || !actorEmail) {
    try {
      const user = await getSessionUser();
      if (user) {
        actorId = actorId || user.id;
        actorEmail = actorEmail || user.email;
      }
    } catch (_e) {
      // Ignore session errors if we can't get user, proceed with null or provided values
    }
  }

  // Get IP, User Agent, Origin, Referer, Request ID from headers
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const origin = headersList.get("origin") || null;
  const referer = headersList.get("referer") || null;
  const requestId = await getRequestId();

  try {
    const safeBefore = params.before ? redactForAudit(params.before) : null;
    const safeAfter = params.after ? redactForAudit(params.after) : null;
    const diff = computeDiff(safeBefore, safeAfter);

    await prisma.auditLog.create({
      data: {
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId,
        actorId,
        actorEmail,
        ip: ip.split(',')[0].trim(), // Take first IP if multiple
        userAgent,
        origin,
        referer,
        requestId,
        before: safeBefore ? JSON.stringify(safeBefore) : null,
        after: safeAfter ? JSON.stringify(safeAfter) : null,
        diff,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
    
    // If failClosed is true, throw to prevent the operation from succeeding
    if (params.failClosed) {
      throw new Error("Audit logging failed - operation aborted");
    }
    
    // Otherwise, we log to console but don't fail the main operation
  }
}

