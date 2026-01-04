export type AppType = 'web' | 'db' | 'cache' | 'ml';
export type TrafficLevel = 'low' | 'medium' | 'high';
export type PersistenceType = 'ephemeral' | 'persistent';

export interface WorkloadIntent {
  appType: AppType;
  traffic: TrafficLevel;
  persistence: PersistenceType;
  // Specific fields based on appType could be added here
  dataSizeGb?: number; // For DB/Cache
  modelSizeGb?: number; // For ML
}

export interface ServerRequirements {
  minCpuCores: number;
  minRamGb: number;
  minStorageGb: number;
  storageType: 'ssd' | 'nvme' | 'hdd';
  minGpuVramGb?: number;
  description: string;
}

export interface ServerSku {
  id: string;
  name: string;
  cpuCores: number;
  ramGb: number;
  storageGb: number;
  storageType: 'ssd' | 'nvme' | 'hdd';
  gpuVramGb?: number;
  priceMonthly: number;
}

export interface RecommendationResult {
  requirements: ServerRequirements;
  recommendations: ServerSku[];
  explanation: {
    bottleneck: string;
    headroom: string;
    factor: string;
  };
}
