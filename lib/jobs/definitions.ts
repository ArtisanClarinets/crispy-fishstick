/**
 * Job type definitions and data schemas
 * @module lib/jobs/definitions
 */

import { z } from "zod";

/**
 * Email job data
 */
export const sendEmailJobSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  html: z.string(),
  from: z.string().email().optional(),
  retryAttempt: z.number().default(0),
});

export type SendEmailJobData = z.infer<typeof sendEmailJobSchema>;

/**
 * PDF generation job data
 */
export const generatePdfJobSchema = z.object({
  resourceType: z.enum(["invoice", "contract", "proposal"]),
  resourceId: z.string(),
  userId: z.string(),
  retryAttempt: z.number().default(0),
});

export type GeneratePdfJobData = z.infer<typeof generatePdfJobSchema>;

/**
 * Export job data
 */
export const exportJobSchema = z.object({
  resourceType: z.string(),
  filters: z.record(z.any()).optional(),
  format: z.enum(["csv", "xlsx", "json"]),
  userId: z.string(),
  retryAttempt: z.number().default(0),
});

export type ExportJobData = z.infer<typeof exportJobSchema>;

/**
 * Webhook delivery job data
 */
export const webhookDeliveryJobSchema = z.object({
  endpointId: z.string(),
  event: z.string(),
  payload: z.record(z.any()),
  attempt: z.number().default(1),
  retryAttempt: z.number().default(0),
});

export type WebhookDeliveryJobData = z.infer<typeof webhookDeliveryJobSchema>;
