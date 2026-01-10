/**
 * Cursor-based pagination utilities
 * @module lib/api/pagination
 */

import { z } from "zod";

export const paginationSchema = z.object({
  cursor: z.string().optional(),
  take: z.coerce.number().int().min(1).max(100).default(20),
  direction: z.enum(["forward", "backward"]).default("forward"),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export interface PaginationResult<T> {
  data: T[];
  nextCursor: string | null;
  prevCursor: string | null;
  hasMore: boolean;
}

/**
 * Parse pagination parameters from request
 */
export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  return paginationSchema.parse({
    cursor: searchParams.get("cursor") || undefined,
    take: searchParams.get("take") || undefined,
    direction: searchParams.get("direction") || undefined,
  });
}

/**
 * Generate Prisma query parameters for cursor-based pagination
 */
export function getPrismaParams(params: PaginationParams) {
  const { cursor, take, direction } = params;
  
  // Request one extra to determine if there are more results
  const actualTake = direction === "forward" ? take + 1 : -(take + 1);
  
  return {
    take: actualTake,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  };
}

/**
 * Build pagination result with cursors
 */
export function buildPaginationResult<T extends { id: string }>(
  items: T[],
  params: PaginationParams
): PaginationResult<T> {
  const { take, direction } = params;
  
  let data = items;
  let hasMore = false;
  
  if (items.length > take) {
    hasMore = true;
    if (direction === "backward") {
      // For backward pagination, the extra item is at the beginning (furthest from cursor)
      // So we keep the last 'take' items
      data = items.slice(items.length - take);
    } else {
      // For forward pagination, the extra item is at the end
      data = items.slice(0, take);
    }
  }
  
  const nextCursor = hasMore && data.length > 0 ? data[data.length - 1].id : null;
  const prevCursor = data.length > 0 ? data[0].id : null;
  
  return {
    data,
    nextCursor: direction === "forward" ? nextCursor : null,
    prevCursor: direction === "backward" ? prevCursor : null,
    hasMore,
  };
}
