import { WorkloadIntent, ServerRequirements, RecommendationResult, ServerSku } from './types';

// Multipliers - kept secure on server side
const MULTIPLIERS = {
  web: {
    cpuPerTraffic: { low: 1, medium: 2, high: 4 },
    ramPerTraffic: { low: 2, medium: 4, high: 8 },
    storageBase: 20,
  },
  db: {
    cpuPerTraffic: { low: 2, medium: 4, high: 8 },
    ramFactor: 2, // RAM = 2x Data Size roughly (simplified)
    storageOverhead: 1.2,
  },
  cache: {
    cpuBase: 2,
    ramFactor: 1.1,
    storageBase: 10,
  },
  ml: {
    cpuBase: 4,
    ramFactor: 1.5,
    vramFactor: 1.2, // VRAM > Model Size
  }
};

const HEADROOM = {
  ephemeral: 1.2, // 20% headroom
  persistent: 1.5, // 50% headroom
};

// Mock Inventory
const INVENTORY: ServerSku[] = [
  { id: 't3.small', name: 'General Purpose (T3 Small)', cpuCores: 2, ramGb: 2, storageGb: 20, storageType: 'ssd', priceMonthly: 15 },
  { id: 't3.medium', name: 'General Purpose (T3 Medium)', cpuCores: 2, ramGb: 4, storageGb: 40, storageType: 'ssd', priceMonthly: 30 },
  { id: 'c5.large', name: 'Compute Optimized (C5 Large)', cpuCores: 2, ramGb: 4, storageGb: 20, storageType: 'nvme', priceMonthly: 50 },
  { id: 'c5.xlarge', name: 'Compute Optimized (C5 XLarge)', cpuCores: 4, ramGb: 8, storageGb: 40, storageType: 'nvme', priceMonthly: 100 },
  { id: 'r5.large', name: 'Memory Optimized (R5 Large)', cpuCores: 2, ramGb: 16, storageGb: 40, storageType: 'ssd', priceMonthly: 80 },
  { id: 'r5.xlarge', name: 'Memory Optimized (R5 XLarge)', cpuCores: 4, ramGb: 32, storageGb: 80, storageType: 'ssd', priceMonthly: 160 },
  { id: 'g4.xlarge', name: 'GPU Accelerated (G4 XLarge)', cpuCores: 4, ramGb: 16, storageGb: 100, storageType: 'nvme', gpuVramGb: 16, priceMonthly: 250 },
];

export function calculateRequirements(intent: WorkloadIntent): RecommendationResult {
  const requirements: ServerRequirements = {
    minCpuCores: 1,
    minRamGb: 1,
    minStorageGb: 10,
    storageType: 'ssd',
    description: '',
  };

  const explanation = {
    bottleneck: 'CPU',
    headroom: 'Standard',
    factor: 'Baseline',
  };

  const headroom = HEADROOM[intent.persistence];
  explanation.headroom = `${(headroom - 1) * 100}% Safety Margin`;

  switch (intent.appType) {
    case 'web':
      requirements.minCpuCores = MULTIPLIERS.web.cpuPerTraffic[intent.traffic];
      requirements.minRamGb = MULTIPLIERS.web.ramPerTraffic[intent.traffic];
      requirements.minStorageGb = MULTIPLIERS.web.storageBase;
      requirements.description = `Web Server handling ${intent.traffic} traffic`;
      explanation.bottleneck = 'CPU/RAM based on traffic';
      explanation.factor = `Traffic Level: ${intent.traffic}`;
      break;

    case 'db':
      const dataSize = intent.dataSizeGb || 10;
      requirements.minCpuCores = MULTIPLIERS.db.cpuPerTraffic[intent.traffic];
      requirements.minRamGb = dataSize * MULTIPLIERS.db.ramFactor; // In-memory performance
      requirements.minStorageGb = dataSize * MULTIPLIERS.db.storageOverhead;
      requirements.storageType = 'nvme'; // DBs prefer NVMe
      requirements.description = `Database for ${dataSize}GB data`;
      explanation.bottleneck = 'RAM (Data Size)';
      explanation.factor = `Data Size: ${dataSize}GB`;
      break;

    case 'cache':
      const cacheSize = intent.dataSizeGb || 5;
      requirements.minCpuCores = MULTIPLIERS.cache.cpuBase;
      requirements.minRamGb = cacheSize * MULTIPLIERS.cache.ramFactor;
      requirements.minStorageGb = MULTIPLIERS.cache.storageBase;
      requirements.description = `Cache node for ${cacheSize}GB`;
      explanation.bottleneck = 'RAM (Cache Size)';
      explanation.factor = `Cache Size: ${cacheSize}GB`;
      break;

    case 'ml':
      const modelSize = intent.modelSizeGb || 2;
      requirements.minCpuCores = MULTIPLIERS.ml.cpuBase;
      requirements.minRamGb = modelSize * MULTIPLIERS.ml.ramFactor;
      requirements.minGpuVramGb = modelSize * MULTIPLIERS.ml.vramFactor;
      requirements.minStorageGb = 50; // ML deps are heavy
      requirements.description = `Inference node for ${modelSize}GB model`;
      explanation.bottleneck = 'GPU VRAM';
      explanation.factor = `Model Size: ${modelSize}GB`;
      break;
  }

  // Apply headroom
  requirements.minCpuCores = Math.ceil(requirements.minCpuCores * headroom);
  requirements.minRamGb = Math.ceil(requirements.minRamGb * headroom);
  requirements.minStorageGb = Math.ceil(requirements.minStorageGb * headroom);
  if (requirements.minGpuVramGb) {
      requirements.minGpuVramGb = Math.ceil(requirements.minGpuVramGb * headroom);
  }

  // Filter and Rank
  const candidates = INVENTORY.filter(sku =>
    sku.cpuCores >= requirements.minCpuCores &&
    sku.ramGb >= requirements.minRamGb &&
    sku.storageGb >= requirements.minStorageGb &&
    (requirements.minGpuVramGb ? (sku.gpuVramGb || 0) >= requirements.minGpuVramGb : true)
  );

  const recommendations = candidates.sort((a, b) => a.priceMonthly - b.priceMonthly).slice(0, 3);

  return { requirements, recommendations, explanation };
}
