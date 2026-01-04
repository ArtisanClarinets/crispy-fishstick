import { z } from "zod";

// --- Input Schema (Workload Intent) ---

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
]);

// Base intent fields shared by all workloads
const BaseIntentSchema = z.object({
  workloadType: WorkloadTypeSchema,
  trafficPattern: TrafficPatternSchema,
  userCount: z.coerce.number().min(1).max(1000000).default(100),
  environment: z.enum(["production", "staging", "dev"]).default("production"),
});

// Discriminated Union for specific workload details
export const WorkloadIntentSchema = z.discriminatedUnion("workloadType", [
  BaseIntentSchema.extend({
    workloadType: z.literal("web_server"),
    requestsPerSecond: z.coerce.number().min(1).default(50),
    concurrentConnections: z.coerce.number().min(1).default(20),
  }),
  BaseIntentSchema.extend({
    workloadType: z.literal("database"),
    datasetSizeGB: z.coerce.number().min(1).default(10),
    readWriteRatio: z.enum(["read_heavy", "write_heavy", "balanced"]).default("balanced"),
  }),
  BaseIntentSchema.extend({
    workloadType: z.literal("ai_ml"),
    modelSizeParams: z.enum(["small", "medium", "large", "xlarge"]).default("medium"), // e.g., 7B, 13B, 70B
    batchSize: z.coerce.number().min(1).default(1),
    trainingOrInference: z.enum(["training", "inference"]).default("inference"),
  }),
  BaseIntentSchema.extend({
    workloadType: z.literal("storage_node"),
    storageCapacityTB: z.coerce.number().min(1).default(1),
    accessFrequency: z.enum(["hot", "warm", "cold"]).default("hot"),
  }),
  BaseIntentSchema.extend({
    workloadType: z.literal("general_compute"),
    concurrentJobs: z.coerce.number().min(1).default(1),
  }),
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
    bottleneck: z.string(), // What resource drove the sizing?
    headroomFactor: z.number(), // The multiplier applied
    notes: z.array(z.string()),
  }),
});

export type WorkloadType = z.infer<typeof WorkloadTypeSchema>;
export type TrafficPattern = z.infer<typeof TrafficPatternSchema>;
export type WorkloadIntent = z.infer<typeof WorkloadIntentSchema>;
export type ResourceRequirements = z.infer<typeof ResourceRequirementsSchema>;
export type ServerSku = z.infer<typeof ServerSkuSchema>;
export type RecommendationResult = z.infer<typeof RecommendationResultSchema>;
