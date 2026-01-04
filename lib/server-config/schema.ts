import { z } from 'zod';

export const WorkloadIntentSchema = z.object({
  appType: z.enum(['web', 'db', 'cache', 'ml']),
  traffic: z.enum(['low', 'medium', 'high']),
  persistence: z.enum(['ephemeral', 'persistent']),
  dataSizeGb: z.number().optional(),
  modelSizeGb: z.number().optional(),
});

export const RecommendationResponseSchema = z.object({
  requirements: z.object({
    minCpuCores: z.number(),
    minRamGb: z.number(),
    minStorageGb: z.number(),
    storageType: z.enum(['ssd', 'nvme', 'hdd']),
    minGpuVramGb: z.number().optional(),
    description: z.string(),
  }),
  recommendations: z.array(z.object({
    id: z.string(),
    name: z.string(),
    cpuCores: z.number(),
    ramGb: z.number(),
    storageGb: z.number(),
    storageType: z.enum(['ssd', 'nvme', 'hdd']),
    gpuVramGb: z.number().optional(),
    priceMonthly: z.number(),
  })),
  explanation: z.object({
    bottleneck: z.string(),
    headroom: z.string(),
    factor: z.string(),
  }),
});
