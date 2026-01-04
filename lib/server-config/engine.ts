import {
  WorkloadIntent,
  ResourceRequirements,
  ServerSku,
  RecommendationResult,
  TrafficPattern,
} from "./schema";

// --- Configuration / Tunables ---

const HEADROOM_MULTIPLIERS: Record<TrafficPattern, number> = {
  constant: 1.3, // 30% safety margin
  bursty: 2.0,   // 100% safety margin for spikes
};

const WEB_SERVER_HEURISTICS = {
  reqsPerCore: 250, // 1 Core can handle 250 RPS roughly
  ramPerCoreGB: 2,  // 2GB RAM per Core
  storagePerUserGB: 0.1,
};

const DB_HEURISTICS = {
  ramDatasetMultiplier: 1.5, // Aim to fit dataset in RAM + overhead
  usersPerCore: 50,
};

// --- Inventory (Mock Data) ---

const SKU_INVENTORY: ServerSku[] = [
  {
    id: "edge-1",
    name: "Edge-1 Micro",
    description: "Entry-level single socket node for lightweight apps.",
    priceMonthly: 49,
    stockStatus: "in_stock",
    specs: {
      cpuCores: 4,
      ramGB: 8,
      storageGB: 256,
      storageType: "SSD",
      networkSpeedGbps: 1,
    },
  },
  {
    id: "std-2",
    name: "Standard-2 General",
    description: "Balanced compute for production web workloads.",
    priceMonthly: 129,
    stockStatus: "in_stock",
    specs: {
      cpuCores: 8,
      ramGB: 32,
      storageGB: 1024,
      storageType: "NVMe",
      networkSpeedGbps: 10,
    },
  },
  {
    id: "db-opt-4",
    name: "DB-Opt-4 HighMem",
    description: "High memory bandwidth for databases and caching.",
    priceMonthly: 299,
    stockStatus: "low_stock",
    specs: {
      cpuCores: 16,
      ramGB: 128,
      storageGB: 4096,
      storageType: "NVMe",
      networkSpeedGbps: 25,
    },
  },
  {
    id: "ml-a100",
    name: "Tensor-A100",
    description: "GPU-accelerated node for AI inference and training.",
    priceMonthly: 899,
    stockStatus: "backorder",
    specs: {
      cpuCores: 32,
      ramGB: 256,
      storageGB: 8192,
      storageType: "NVMe",
      gpuCount: 1,
      gpuVramGB: 80,
      networkSpeedGbps: 100,
    },
  },
  {
    id: "beast-x",
    name: "Beast-X Extreme",
    description: "Maximum density compute for heavy virtualization.",
    priceMonthly: 599,
    stockStatus: "in_stock",
    specs: {
      cpuCores: 64,
      ramGB: 512,
      storageGB: 16384,
      storageType: "NVMe",
      networkSpeedGbps: 40,
    },
  },
];

// --- Engine Logic ---

export function calculateRequirements(intent: WorkloadIntent): {
  requirements: ResourceRequirements;
  bottleneck: string;
} {
  const headroom = HEADROOM_MULTIPLIERS[intent.trafficPattern];
  let cpu = 2; // Baseline
  let ram = 4; // Baseline
  let storage = 50; // Baseline
  let vram = 0;
  let gpu = 0;
  let bottleneck = "baseline";

  // Apply Heuristics based on Intent
  switch (intent.workloadType) {
    case "web_server": {
      // CPU Bound
      const reqCpu = Math.ceil(intent.requestsPerSecond / WEB_SERVER_HEURISTICS.reqsPerCore);
      const connCpu = Math.ceil(intent.concurrentConnections / 500); // 500 conns per core roughly
      cpu = Math.max(cpu, reqCpu, connCpu);
      
      // RAM follows CPU
      ram = Math.max(ram, cpu * WEB_SERVER_HEURISTICS.ramPerCoreGB);
      
      bottleneck = "cpu_throughput";
      break;
    }

    case "database": {
      // RAM/IO Bound
      ram = Math.max(ram, intent.datasetSizeGB * DB_HEURISTICS.ramDatasetMultiplier);
      cpu = Math.max(cpu, Math.ceil(intent.userCount / DB_HEURISTICS.usersPerCore));
      storage = Math.max(storage, intent.datasetSizeGB * 3); // 3x for backups/logs
      
      bottleneck = "memory_dataset";
      break;
    }

    case "ai_ml": {
      // GPU Bound
      bottleneck = "gpu_vram";
      gpu = 1;
      if (intent.modelSizeParams === "small") vram = 16;
      else if (intent.modelSizeParams === "medium") vram = 24;
      else if (intent.modelSizeParams === "large") vram = 48;
      else vram = 80;

      cpu = 8; // Min CPU for GPU driving
      ram = 32; // Min RAM
      break;
    }

    case "storage_node": {
      // Storage Bound
      storage = Math.max(storage, intent.storageCapacityTB * 1024);
      cpu = 4;
      ram = 16; // Cache
      bottleneck = "storage_capacity";
      break;
    }
    
    case "general_compute": {
        cpu = Math.max(cpu, intent.concurrentJobs * 2);
        ram = Math.max(ram, cpu * 4);
        bottleneck = "compute_concurrency";
        break;
    }
  }

  // Apply Headroom
  return {
    requirements: {
      cpuCores: Math.ceil(cpu * headroom),
      ramGB: Math.ceil(ram * headroom),
      storageGB: Math.ceil(storage * 1.1), // Fixed 10% overhead for storage
      storageType: intent.workloadType === "storage_node" && intent.accessFrequency === "cold" ? "HDD" : "NVMe",
      gpuCount: gpu,
      gpuVramGB: vram,
      networkSpeedGbps: intent.environment === "production" ? 10 : 1,
    },
    bottleneck,
  };
}

function scoreSku(sku: ServerSku, reqs: ResourceRequirements): number {
  // 0 = invalid
  // Higher is better match (less waste)
  
  // Hard Constraints
  if (sku.specs.cpuCores < reqs.cpuCores) return 0;
  if (sku.specs.ramGB < reqs.ramGB) return 0;
  if (sku.specs.storageGB < reqs.storageGB) return 0;
  if ((sku.specs.gpuCount || 0) < (reqs.gpuCount || 0)) return 0;
  if ((sku.specs.gpuVramGB || 0) < (reqs.gpuVramGB || 0)) return 0;

  // Score based on "fit" (inverse of waste)
  const cpuWaste = (sku.specs.cpuCores - reqs.cpuCores) / sku.specs.cpuCores;
  const ramWaste = (sku.specs.ramGB - reqs.ramGB) / sku.specs.ramGB;
  
  // We prefer the smallest waste (tightest fit)
  const score = 100 - ((cpuWaste + ramWaste) * 50);
  return Math.max(1, score);
}

export function recommendServer(intent: WorkloadIntent): RecommendationResult {
  const { requirements, bottleneck } = calculateRequirements(intent);
  
  // Sort SKUs by score
  const scoredSkus = SKU_INVENTORY.map(sku => ({
    sku,
    score: scoreSku(sku, requirements)
  })).filter(x => x.score > 0).sort((a, b) => b.score - a.score); // Descending score

  // If no exact match, return the largest available as fallback (or empty if none)
  // For this exercise, if no match, we return the biggest one but mark it as "overkill" or "underpowered" in notes?
  // Actually, if score is 0, it's filtered. If list empty, we might need a "Custom Quote" fallback.
  
  const primarySku = scoredSkus[0]?.sku || SKU_INVENTORY[SKU_INVENTORY.length - 1]; // Fallback to biggest if nothing fits (simplification)
  const alternativeSkus = scoredSkus.slice(1, 3).map(x => x.sku);

  return {
    requirements,
    primarySku,
    alternativeSkus,
    explanation: {
      bottleneck,
      headroomFactor: HEADROOM_MULTIPLIERS[intent.trafficPattern],
      notes: [
        `Sized for ${intent.trafficPattern} load pattern.`,
        `Limiting factor: ${bottleneck}.`,
        scoredSkus.length === 0 ? "No standard SKU fits these requirements perfectly. Showing largest available." : "Selected for optimal price/performance ratio."
      ]
    }
  };
}
