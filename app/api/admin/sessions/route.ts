import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/guards";
import { getUserActiveSessions, revokeSession } from "@/lib/security/session";
import { jsonNoStore } from "@/lib/security/response";
import { assertSameOrigin } from "@/lib/security/origin";

/**
 * Get all active sessions for the current user
 */
export async function GET(req: NextRequest) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    // @ts-ignore - req type mismatch between next/server and built-in Request, but it works at runtime
    assertSameOrigin(req);

    const actor = await requireAdmin();
    const sessions = await getUserActiveSessions(actor.id);

    // Format sessions for response (remove sensitive data)
    const formattedSessions = sessions.map(session => ({
      id: session.id,
      deviceInfo: session.deviceInfo,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      createdAt: session.createdAt,
      lastActiveAt: session.lastActiveAt,
      expiresAt: session.expiresAt,
      isCurrent: false // This would need to be determined based on current session token
    }));

    return jsonNoStore({
      success: true,
      sessions: formattedSessions,
      sessionCount: formattedSessions.length
    });
  } catch (error) {
    console.error("Get sessions error:", error);
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Revoke a specific session
 */
export async function DELETE(req: NextRequest) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    // @ts-ignore - req type mismatch between next/server and built-in Request, but it works at runtime
    assertSameOrigin(req);

    const actor = await requireAdmin();
    const { sessionId } = await req.json();

    if (!sessionId) {
      return jsonNoStore({ error: "Session ID is required" }, { status: 400 });
    }

    // Get the session to verify it belongs to the user
    const session = await prisma.session.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return jsonNoStore({ error: "Session not found" }, { status: 404 });
    }

    if (session.userId !== actor.id) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 403 });
    }

    await revokeSession(session.sessionToken, "USER_REVOKED");

    return jsonNoStore({
      success: true,
      message: "Session revoked successfully"
    });
  } catch (error) {
    console.error("Revoke session error:", error);
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Import prisma at the top
import { prisma } from "@/lib/prisma";