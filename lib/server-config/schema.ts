import { z } from "zod";

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

// --- Zod Schemas (Runtime Validation) ---

export const WorkloadTypeSchema = z.enum([
  "web_server",
  "database",
  "ai_ml",
  "storage_node",
  "general_compute"
]);

export const TrafficPatternSchema = z.enum([
  "constant", // Steady load
  "bursty",   // Spiky load (needs higher headroom)
  "predictable_spikes", // Scheduled or known spikes
]);

// Base schema for shared fields
const BaseIntentSchema = z.object({
  workloadType: WorkloadSchema,
  trafficPattern: TrafficPatternSchema,
  userCount: z.coerce.number().min(1).max(1000000).default(100),
  environment: z.enum(["production", "staging", "dev"]).default("production"),
});

// Simplified Zod schemas - use simple object schemas instead of discriminatedUnion
// to avoid TypeScript stack overflow during type checking
const WebServerSchema = z.object({
  workloadType: z.literal("web_server"),
  requestsPerSecond: z.coerce.number().min(1).default(50),
  concurrentConnections: z.coerce.number().min(1).default(20),
});

const DatabaseSchema = z.object({
  workloadType: z.literal("database"),
  datasetSizeGB: z.coerce.number().min(1).default(10),
  readWriteRatio: z.enum(["read_heavy", "write_heavy", "balanced"]).default("balanced"),
});

const AiMlSchema = z.object({
  workloadType: z.literal("ai_ml"),
  modelSizeParams: z.enum(["small", "medium", "large", "xlarge"]).default("medium"),
  batchSize: z.coerce.number().min(1).default(1),
  trainingOrInference: z.enum(["training", "inference"]).default("inference"),
});

const StorageNodeSchema = z.object({
  workloadType: z.literal("storage_node"),
  storageCapacityTB: z.coerce.number().min(1).default(1),
  accessFrequency: z.enum(["hot", "warm", "cold"]).default("hot"),
});

const GeneralComputeSchema = z.object({
  workloadType: z.literal("general_compute"),
  concurrentJobs: z.coerce.number().min(1).default(1),
});

// Union of all workload schemas - using z.union instead of discriminatedUnion
export const WorkloadIntentSchema = z.union([
  BaseIntentSchema.merge(WebServerSchema),
  BaseIntentSchema.merge(DatabaseSchema),
  BaseIntentSchema.merge(AiMlSchema),
  BaseIntentSchema.merge(StorageNodeSchema),
  BaseIntentSchema.merge(GeneralComputeSchema),
]);

// --- Output Schema (Requirements & Recommendation) ---

export const ResourceRequirementsSchema = z.object({
  cpuCores: z.number(),
  ramGB: z.number(),
  storageGB: z.number(),
  storageType: z.enum(["NVMe", "SSD", "HDD"]),
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
  stockStatus: z.enum(["in_stock", "low_stock", "backorder"]),
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

// WorkloadTypeSchema alias for internal use
const WorkloadSchema = WorkloadTypeSchema;
