import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Maximum allowed concurrent sessions per user
const MAX_CONCURRENT_SESSIONS = 3;

// Session timeout constants
const SESSION_TIMEOUT_30_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
const INACTIVE_TIMEOUT_1_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export interface SessionData {
  id: string;
  userId: string;
  sessionToken: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceInfo?: string | null;
  expiresAt: Date;
  createdAt: Date;
  lastActiveAt: Date;
  isRevoked: boolean;
  revokedAt?: Date | null;
  revokedReason?: string | null;
}

export interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceType: string;
  os: string;
  browser: string;
}

/**
 * Extract device information from request
 */
export function extractDeviceInfo(request: NextRequest): DeviceInfo {
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Simple device detection
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  
  // Simple OS detection
  let os = 'unknown';
  if (/Windows/i.test(userAgent)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(userAgent)) os = 'macOS';
  else if (/Linux/i.test(userAgent)) os = 'Linux';
  else if (/Android/i.test(userAgent)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS';
  
  // Simple browser detection
  let browser = 'unknown';
  if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) browser = 'Chrome';
  else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/Safari/i.test(userAgent)) browser = 'Safari';
  else if (/Edge/i.test(userAgent)) browser = 'Edge';
  else if (/Opera|OPR/i.test(userAgent)) browser = 'Opera';
  
  return {
    ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
    userAgent,
    deviceType,
    os,
    browser,
  };
}

/**
 * Create a new session for a user
 */
export async function createSession(userId: string, request: NextRequest): Promise<SessionData> {
  const deviceInfo = extractDeviceInfo(request);
  
  // Enforce concurrent session limit
  const activeSessions = await prisma.session.count({
    where: {
      userId,
      isRevoked: false,
      expiresAt: { gt: new Date() }
    }
  });
  
  if (activeSessions >= MAX_CONCURRENT_SESSIONS) {
    // Revoke the oldest session to make room for new one
    const oldestSession = await prisma.session.findFirst({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { lastActiveAt: 'asc' }
    });
    
    if (oldestSession) {
      await prisma.session.update({
        where: { id: oldestSession.id },
        data: {
          isRevoked: true,
          revokedAt: new Date(),
          revokedReason: 'MAX_SESSIONS_REACHED'
        }
      });
    }
  }
  
  // Create new session
  const sessionToken = uuidv4();
  const expiresAt = new Date(Date.now() + SESSION_TIMEOUT_30_DAYS);
  
  const session = await prisma.session.create({
    data: {
      userId,
      sessionToken,
      ipAddress: deviceInfo.ipAddress,
      userAgent: deviceInfo.userAgent,
      deviceInfo: `${deviceInfo.deviceType} - ${deviceInfo.os} - ${deviceInfo.browser}`,
      expiresAt,
      lastActiveAt: new Date()
    }
  });
  
  return session;
}

/**
 * Validate a session token and check for timeout
 */
export async function validateSession(sessionToken: string): Promise<{ valid: boolean; session?: SessionData; error?: string }> {
  const session = await prisma.session.findUnique({
    where: { sessionToken }
  });
  
  if (!session) {
    return { valid: false, error: 'SESSION_NOT_FOUND' };
  }
  
  if (session.isRevoked) {
    return { valid: false, error: 'SESSION_REVOKED' };
  }
  
  if (new Date() > session.expiresAt) {
    return { valid: false, error: 'SESSION_EXPIRED' };
  }
  
  // Check inactive timeout (1 hour)
  const lastActive = new Date(session.lastActiveAt);
  const now = new Date();
  const inactiveTime = now.getTime() - lastActive.getTime();
  
  if (inactiveTime > INACTIVE_TIMEOUT_1_HOUR) {
    return { valid: false, error: 'SESSION_INACTIVE_TIMEOUT' };
  }
  
  return { valid: true, session };
}

/**
 * Update session last active timestamp
 */
export async function updateSessionActivity(sessionToken: string): Promise<void> {
  await prisma.session.update({
    where: { sessionToken },
    data: { lastActiveAt: new Date() }
  });
}

/**
 * Revoke a specific session
 */
export async function revokeSession(sessionToken: string, reason: string): Promise<void> {
  await prisma.session.update({
    where: { sessionToken },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason
    }
  });
}

/**
 * Revoke all sessions for a user
 */
export async function revokeAllUserSessions(userId: string, reason: string): Promise<void> {
  await prisma.session.updateMany({
    where: {
      userId,
      isRevoked: false
    },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason
    }
  });
}

/**
 * Get all active sessions for a user
 */
export async function getUserActiveSessions(userId: string): Promise<SessionData[]> {
  return prisma.session.findMany({
    where: {
      userId,
      isRevoked: false,
      expiresAt: { gt: new Date() }
    },
    orderBy: { lastActiveAt: 'desc' }
  });
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await prisma.session.updateMany({
    where: {
      expiresAt: { lt: new Date() },
      isRevoked: false
    },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: 'SESSION_EXPIRED'
    }
  });
  
  return result.count;
}

/**
 * Get session count for a user
 */
export async function getUserSessionCount(userId: string): Promise<number> {
  return prisma.session.count({
    where: {
      userId,
      isRevoked: false,
      expiresAt: { gt: new Date() }
    }
  });
}