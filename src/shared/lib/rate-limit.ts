import { prisma } from "@/shared/lib/prisma";

export interface RateLimitConfig {
  key: string;
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: Date;
}

/**
 * Checks if a rate limit has been exceeded.
 * Uses Prisma (SQLite/Postgres) to persist rate limit data.
 */
export async function rateLimit({ key, limit, windowMs }: RateLimitConfig): Promise<RateLimitResult> {
  const now = new Date();
  const record = await prisma.rateLimit.findUnique({
    where: { key },
  });

  // If no record exists or the window has expired, start a new window
  if (!record || record.resetAt < now) {
    const resetAt = new Date(now.getTime() + windowMs);
    
    // Use upsert to handle potential race conditions where a record might be created
    // between findUnique and this write
    await prisma.rateLimit.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        resetAt,
      },
      update: {
        count: 1,
        resetAt,
      },
    });

    return {
      success: true,
      remaining: limit - 1,
      reset: resetAt,
    };
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  // Increment count
  const updated = await prisma.rateLimit.update({
    where: { key },
    data: {
      count: { increment: 1 },
    },
  });

  return {
    success: true,
    remaining: Math.max(0, limit - updated.count),
    reset: record.resetAt,
  };
}
