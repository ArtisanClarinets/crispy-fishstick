import { z } from "zod";

export const EstimatorWizardSchema = z.object({
  workloadType: z.enum([
    "web_server",
    "database",
    "ai_ml",
    "storage_node",
    "general_compute"
  ]),
  trafficPattern: z.enum([
    "constant",
    "bursty",
    "predictable_spikes"
  ]),
  userCount: z.number().min(1),
  environment: z.enum([
    "production",
    "staging",
    "dev"
  ]),

  // Specifics (optional depending on type, but we can make them loose here)
  requestsPerSecond: z.number().optional(),
  datasetSizeGB: z.number().optional(),
  modelSizeParams: z.enum(["small", "medium", "large", "xlarge"]).optional(),
  storageCapacityTB: z.number().optional(),
});

export type EstimatorWizardState = z.infer<typeof EstimatorWizardSchema>;

export const EstimatorResultSchema = z.object({
  recommendedSpec: z.object({
    cpuCores: z.number(),
    ramGB: z.number(),
    storageGB: z.number(),
    networkGbps: z.number(),
    gpuCount: z.number().optional(),
    gpuType: z.string().optional(),
  }),
  headroomFactor: z.number(),
  breakdown: z.object({
    inputs: z.record(z.any()),
    assumptions: z.array(z.string()),
    formulas: z.array(z.string()),
    outputs: z.record(z.any()),
  })
});

export type EstimatorResult = z.infer<typeof EstimatorResultSchema>;
