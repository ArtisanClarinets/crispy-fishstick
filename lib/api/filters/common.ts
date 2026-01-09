/**
 * Common filter utilities for list endpoints
 * @module lib/api/filters/common
 */

import { z } from "zod";

/**
 * Common filters that apply to most resources
 */
export const commonFiltersSchema = z.object({
  q: z.string().optional(), // Search query
  status: z.string().optional(),
  tenantId: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  includeDeleted: z.coerce.boolean().default(false),
});

export type CommonFilters = z.infer<typeof commonFiltersSchema>;

/**
 * Parse common filters from URL search params
 */
export function parseCommonFilters(searchParams: URLSearchParams): CommonFilters {
  return commonFiltersSchema.parse({
    q: searchParams.get("q") || undefined,
    status: searchParams.get("status") || undefined,
    tenantId: searchParams.get("tenantId") || undefined,
    dateFrom: searchParams.get("dateFrom") || undefined,
    dateTo: searchParams.get("dateTo") || undefined,
    includeDeleted: searchParams.get("includeDeleted") || undefined,
  });
}

/**
 * Build Prisma where clause for soft deletes
 */
export function buildDeletedFilter(includeDeleted: boolean) {
  return includeDeleted ? {} : { deletedAt: null };
}

/**
 * Build Prisma where clause for date range
 */
export function buildDateRangeFilter(
  field: string,
  dateFrom?: string,
  dateTo?: string
) {
  if (!dateFrom && !dateTo) return {};
  
  const filter: any = {};
  if (dateFrom) {
    filter.gte = new Date(dateFrom);
  }
  if (dateTo) {
    filter.lte = new Date(dateTo);
  }
  
  return { [field]: filter };
}
