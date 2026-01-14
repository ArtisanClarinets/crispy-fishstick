import { z } from "zod";

export const ConfiguratorStateSchema = z.object({
  cpuModel: z.string().optional(),
  ramGB: z.number().min(8),
  storageDrives: z.array(z.object({
    type: z.enum(["NVMe", "SSD", "HDD"]),
    sizeGB: z.number(),
    qty: z.number().min(1)
  })),
  gpuCount: z.number().min(0),
  gpuType: z.string().optional(),
  networkSpeedGbps: z.number().min(1),
  powerRedundancy: z.boolean().default(true),
});

export type ConfiguratorState = z.infer<typeof ConfiguratorStateSchema>;

export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  hardBlocks: z.array(z.string()),
  warnings: z.array(z.string()),
  metrics: z.object({
    totalCostMonthly: z.number(),
    powerDrawWatts: z.number(),
    rackUnitSize: z.number(),
  }),
  explanation: z.string().optional(),
});

export type ValidationResult = z.infer<typeof ValidationResultSchema>;
