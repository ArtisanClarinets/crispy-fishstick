/**
 * Server Configuration Schema
 * 
 * This file defines TypeScript interfaces and minimal Zod schemas for runtime validation.
 * TypeScript interfaces are defined explicitly to avoid recursive z.infer<> calls that
 * can cause "Maximum call stack size exceeded" errors during type checking.
 */

import { z } from "zod";

// --- TypeScript Interface Definitions ---

export type WorkloadType = 
  | "web_server" 
  | "database" 
  | "ai_ml" 
  | "storage_node" 
  | "general_compute";

export type TrafficPattern = "constant" | "bursty" | "predictable_spikes";

export interface BaseIntent {
  workloadType: WorkloadType;
  trafficPattern: TrafficPattern;
  userCount: number;
  environment: "production" | "staging" | "dev";
}

export interface WebServerIntent extends BaseIntent {
  workloadType: "web_server";
  requestsPerSecond: number;
  concurrentConnections: number;
}

export interface DatabaseIntent extends BaseIntent {
  workloadType: "database";
  datasetSizeGB: number;
  readWriteRatio: "read_heavy" | "write_heavy" | "balanced";
}

export interface AiMlIntent extends BaseIntent {
  workloadType: "ai_ml";
  modelSizeParams: "small" | "medium" | "large" | "xlarge";
  batchSize: number;
  trainingOrInference: "training" | "inference";
}

export interface StorageNodeIntent extends BaseIntent {
  workloadType: "storage_node";
  storageCapacityTB: number;
  accessFrequency: "hot" | "warm" | "cold";
}

export interface GeneralComputeIntent extends BaseIntent {
  workloadType: "general_compute";
  concurrentJobs: number;
}

export type WorkloadIntent = 
  | WebServerIntent 
  | DatabaseIntent 
  | AiMlIntent 
  | StorageNodeIntent 
  | GeneralComputeIntent;

export interface ResourceRequirements {
  cpuCores: number;
  ramGB: number;
  storageGB: number;
  storageType: "NVMe" | "SSD" | "HDD";
  gpuCount?: number;
  gpuVramGB?: number;
  networkSpeedGbps: number;
}

export interface ServerSku {
  id: string;
  name: string;
  description: string;
  specs: ResourceRequirements;
  priceMonthly: number;
  stockStatus: "in_stock" | "low_stock" | "backorder";
}

export interface RecommendationExplanation {
  bottleneck: string;
  headroomFactor: number;
  notes: string[];
}

export interface RecommendationResult {
  requirements: ResourceRequirements;
  primarySku: ServerSku;
  alternativeSkus: ServerSku[];
  explanation: RecommendationExplanation;
}

// --- Runtime Validation Schemas ---

/**
 * Validates workload intent data against the TypeScript interface
 */
export function validateWorkloadIntent(data: unknown): data is WorkloadIntent {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  
  // Check base fields
  const validWorkloadTypes = ["web_server", "database", "ai_ml", "storage_node", "general_compute"];
  const validTrafficPatterns = ["constant", "bursty", "predictable_spikes"];
  const validEnvironments = ["production", "staging", "dev"];
  
  if (!validWorkloadTypes.includes(obj.workloadType as string)) return false;
  if (!validTrafficPatterns.includes(obj.trafficPattern as string)) return false;
  if (typeof obj.userCount !== "number") return false;
  if (!validEnvironments.includes(obj.environment as string)) return false;
  
  // Check workload-specific fields
  switch (obj.workloadType) {
    case "web_server":
      return typeof obj.requestsPerSecond === "number" && typeof obj.concurrentConnections === "number";
    case "database":
      return typeof obj.datasetSizeGB === "number" && typeof obj.readWriteRatio === "string";
    case "ai_ml":
      return typeof obj.modelSizeParams === "string" && typeof obj.batchSize === "number" && typeof obj.trainingOrInference === "string";
    case "storage_node":
      return typeof obj.storageCapacityTB === "number" && typeof obj.accessFrequency === "string";
    case "general_compute":
      return typeof obj.concurrentJobs === "number";
    default:
      return false;
  }
}

/**
 * ResourceRequirementsSchema - Validates resource requirements at runtime
 */
export const ResourceRequirementsSchema = z.object({
  cpuCores: z.number(),
  ramGB: z.number(),
  storageGB: z.number(),
  storageType: z.enum(["NVMe", "SSD", "HDD"]),
  gpuCount: z.number().optional(),
  gpuVramGB: z.number().optional(),
  networkSpeedGbps: z.number(),
});

/**
 * ServerSkuSchema - Validates server SKU data at runtime
 */
export const ServerSkuSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  specs: ResourceRequirementsSchema,
  priceMonthly: z.number(),
  stockStatus: z.enum(["in_stock", "low_stock", "backorder"]),
});

/**
 * RecommendationResultSchema - Validates recommendation results at runtime
 */
export const RecommendationResultSchema = z.object({
  requirements: ResourceRequirementsSchema,
  primarySku: ServerSkuSchema,
  alternativeSkus: z.array(ServerSkuSchema),
  explanation: z.object({
    bottleneck: z.string(),
    headroomFactor: z.number(),
    notes: z.array(z.string()),
  }),
});

// Precise Schemas for Intents

const BaseIntentSchema = z.object({
  trafficPattern: z.enum(["constant", "bursty", "predictable_spikes"]),
  userCount: z.number().min(1),
  environment: z.enum(["production", "staging", "dev"]),
});

const WebServerIntentSchema = BaseIntentSchema.extend({
  workloadType: z.literal("web_server"),
  requestsPerSecond: z.number(),
  concurrentConnections: z.number(),
});

const DatabaseIntentSchema = BaseIntentSchema.extend({
  workloadType: z.literal("database"),
  datasetSizeGB: z.number(),
  readWriteRatio: z.enum(["read_heavy", "write_heavy", "balanced"]),
});

const AiMlIntentSchema = BaseIntentSchema.extend({
  workloadType: z.literal("ai_ml"),
  modelSizeParams: z.enum(["small", "medium", "large", "xlarge"]),
  batchSize: z.number(),
  trainingOrInference: z.enum(["training", "inference"]),
});

const StorageNodeIntentSchema = BaseIntentSchema.extend({
  workloadType: z.literal("storage_node"),
  storageCapacityTB: z.number(),
  accessFrequency: z.enum(["hot", "warm", "cold"]),
});

const GeneralComputeIntentSchema = BaseIntentSchema.extend({
  workloadType: z.literal("general_compute"),
  concurrentJobs: z.number(),
});

export const WorkloadIntentSchema = z.discriminatedUnion("workloadType", [
  WebServerIntentSchema,
  DatabaseIntentSchema,
  AiMlIntentSchema,
  StorageNodeIntentSchema,
  GeneralComputeIntentSchema,
]);
