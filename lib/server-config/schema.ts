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

import { z } from "zod";

// Minimal schemas for runtime validation
// Using z.any() to avoid complex type inference that causes stack overflow
export const WorkloadIntentSchema = z.any();

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
