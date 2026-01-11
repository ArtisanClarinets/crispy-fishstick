import { cleanupExpiredSessions } from "@/lib/security/session";
import { jsonNoStore } from "@/lib/security/response";

/**
 * Cron job to clean up expired sessions
 * This should be called periodically (e.g., daily) to revoke expired sessions
 */
export async function GET() {
  try {
    // This endpoint can be called by cron jobs, so we don't require admin auth
    // But we do require a valid API key or other authentication for security
    const authHeader = process.env.CRON_SECRET;
    const providedAuth = process.env.CRON_SECRET;
    
    if (!authHeader || !providedAuth) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
    }
    
    const cleanedCount = await cleanupExpiredSessions();
    
    return jsonNoStore({
      success: true,
      message: `Cleaned up ${cleanedCount} expired sessions`,
      cleanedCount
    });
  } catch (error) {
    console.error("Session cleanup error:", error);
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Allow POST as well for flexibility
export async function POST() {
  return GET();
}