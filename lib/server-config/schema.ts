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

// Simple schema types - avoid discriminatedUnion and complex unions
const StringSchema = z.string();
const NumberSchema = z.number();
const BooleanSchema = z.boolean();
const ArraySchema = <T>(itemSchema: z.ZodType<T>) => z.array(itemSchema);
const OptionalSchema = <T>(schema: z.ZodType<T>) => schema.optional();

// Build workload intent schema dynamically
const BaseIntentFields = {
  workloadType: StringSchema,
  trafficPattern: StringSchema,
  userCount: NumberSchema,
  environment: StringSchema,
};

// Workload-specific schemas
const WebServerFields = {
  workloadType: z.literal("web_server"),
  requestsPerSecond: NumberSchema,
  concurrentConnections: NumberSchema,
};

const DatabaseFields = {
  workloadType: z.literal("database"),
  datasetSizeGB: NumberSchema,
  readWriteRatio: StringSchema,
};

const AiMlFields = {
  workloadType: z.literal("ai_ml"),
  modelSizeParams: StringSchema,
  batchSize: NumberSchema,
  trainingOrInference: StringSchema,
};

const StorageNodeFields = {
  workloadType: z.literal("storage_node"),
  storageCapacityTB: NumberSchema,
  accessFrequency: StringSchema,
};

const GeneralComputeFields = {
  workloadType: z.literal("general_compute"),
  concurrentJobs: NumberSchema,
};

// Simple object schemas without discriminatedUnion
const WebServerSchema = z.object(WebServerFields);
const DatabaseSchema = z.object(DatabaseFields);
const AiMlSchema = z.object(AiMlFields);
const StorageNodeSchema = z.object(StorageNodeFields);
const GeneralComputeSchema = z.object(GeneralComputeFields);

// Export schemas for runtime validation
export const WorkloadIntentSchema = {
  webServer: WebServerSchema,
  database: DatabaseSchema,
  aiMl: AiMlSchema,
  storageNode: StorageNodeSchema,
  generalCompute: GeneralComputeSchema,
} as const;

export const ResourceRequirementsSchema = z.object({
  cpuCores: NumberSchema,
  ramGB: NumberSchema,
  storageGB: NumberSchema,
  storageType: StringSchema,
  gpuCount: NumberSchema.optional(),
  gpuVramGB: NumberSchema.optional(),
  networkSpeedGbps: NumberSchema,
});

export const ServerSkuSchema = z.object({
  id: StringSchema,
  name: StringSchema,
  description: StringSchema,
  specs: ResourceRequirementsSchema,
  priceMonthly: NumberSchema,
  stockStatus: StringSchema,
});

export const RecommendationResultSchema = z.object({
  requirements: ResourceRequirementsSchema,
  primarySku: ServerSkuSchema,
  alternativeSkus: z.array(ServerSkuSchema),
  explanation: z.object({
    bottleneck: StringSchema,
    headroomFactor: NumberSchema,
    notes: z.array(StringSchema),
  }),
});

// Validator function for WorkloadIntent
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
