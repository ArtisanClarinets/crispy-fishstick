// --- TypeScript Interface Definitions ---
// Defined explicitly to avoid recursive z.infer<> calls that cause stack overflow

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
// Using minimal Zod schemas to avoid complex type inference

import { z } from "zod";

// Create schemas with minimal complexity to avoid stack overflow
// Use z.record() and basic types instead of complex nested structures

const BaseIntentSchema = z.object({
  workloadType: z.string(),
  trafficPattern: z.string(),
  userCount: z.number(),
  environment: z.string(),
});

// Individual workload schemas - simple and flat
const WebServerSchema = z.object({
  workloadType: z.literal("web_server"),
  requestsPerSecond: z.number(),
  concurrentConnections: z.number(),
});

const DatabaseSchema = z.object({
  workloadType: z.literal("database"),
  datasetSizeGB: z.number(),
  readWriteRatio: z.string(),
});

const AiMlSchema = z.object({
  workloadType: z.literal("ai_ml"),
  modelSizeParams: z.string(),
  batchSize: z.number(),
  trainingOrInference: z.string(),
});

const StorageNodeSchema = z.object({
  workloadType: z.literal("storage_node"),
  storageCapacityTB: z.number(),
  accessFrequency: z.string(),
});

const GeneralComputeSchema = z.object({
  workloadType: z.literal("general_compute"),
  concurrentJobs: z.number(),
});

// Union schema for runtime validation
export const WorkloadIntentSchema = z.union([
  BaseIntentSchema.merge(WebServerSchema),
  BaseIntentSchema.merge(DatabaseSchema),
  BaseIntentSchema.merge(AiMlSchema),
  BaseIntentSchema.merge(StorageNodeSchema),
  BaseIntentSchema.merge(GeneralComputeSchema),
]);

export const ResourceRequirementsSchema = z.object({
  cpuCores: z.number(),
  ramGB: z.number(),
  storageGB: z.number(),
  storageType: z.string(),
  gpuCount: z.number().optional(),
  gpuVramGB: z.number().optional(),
  networkSpeedGbps: z.number(),
});

export const ServerSkuSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  specs: ResourceRequirementsSchema,
  priceMonthly: z.number(),
  stockStatus: z.string(),
});

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

// Validator function for WorkloadIntent
export function validateWorkloadIntent(data: unknown): data is WorkloadIntent {
  try {
    WorkloadIntentSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
