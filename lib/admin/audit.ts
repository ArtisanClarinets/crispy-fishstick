import { prisma } from "@/lib/prisma";
import { getSessionUser } from "./guards";
import { headers } from "next/headers";

export interface CreateAuditLogParams {
  action: string;
  resource: string;
  resourceId?: string;
  before?: any;
  after?: any;
  actorId?: string;
  actorEmail?: string;
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
    } catch (e) {
      // Ignore session errors if we can't get user, proceed with null or provided values
    }
  }

  // Get IP and User Agent from headers
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId,
        actorId,
        actorEmail,
        ip: ip.split(',')[0].trim(), // Take first IP if multiple
        userAgent,
        before: params.before ? JSON.stringify(params.before) : null,
        after: params.after ? JSON.stringify(params.after) : null,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
    // We intentionally don't throw here to avoid failing the main operation 
    // just because logging failed, unless strict auditing is required.
    // For now, we log to console.
  }
}
