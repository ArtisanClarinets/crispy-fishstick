import { EstimatorWizardState, EstimatorResult } from "./schema";

export function calculateEstimate(state: EstimatorWizardState): EstimatorResult {
  const assumptions: string[] = [];
  const formulas: string[] = [];

  // Base constants
  let cpu = 2;
  let ram = 4;
  let storage = 50;
  let network = 1;
  let gpu = 0;
  let gpuType = undefined;

  let headroom = 1.2; // 20% default
  if (state.trafficPattern === "bursty") {
    headroom = 2.0;
    assumptions.push("Bursty traffic requires 100% headroom buffer.");
  } else if (state.trafficPattern === "predictable_spikes") {
    headroom = 1.5;
    assumptions.push("Predictable spikes require 50% headroom buffer.");
  } else {
    assumptions.push("Constant traffic requires 20% standard headroom.");
  }

  // Workload Logic
  if (state.workloadType === "web_server") {
    const rps = state.requestsPerSecond || 50;
    const rpsPerCore = 250;
    const coreReq = Math.ceil(rps / rpsPerCore);
    cpu = Math.max(cpu, coreReq);
    ram = Math.max(ram, cpu * 2);
    formulas.push(`CPU = Max(2, Ceil(${rps} RPS / ${rpsPerCore} per core))`);
    formulas.push(`RAM = CPU * 2GB`);
  }
  else if (state.workloadType === "database") {
    const dataSize = state.datasetSizeGB || 10;
    cpu = Math.max(4, Math.ceil(state.userCount / 50));
    ram = Math.max(8, Math.ceil(dataSize * 1.5)); // Fit in RAM + overhead
    storage = Math.max(100, dataSize * 3);
    formulas.push(`RAM = Dataset (${dataSize}GB) * 1.5 multiplier`);
    formulas.push(`Storage = Dataset * 3 (for logs/backups)`);
  }
  else if (state.workloadType === "ai_ml") {
    gpu = 1;
    cpu = 8;
    ram = 32;
    if (state.modelSizeParams === "xlarge") {
      gpuType = "A100-80GB";
      ram = 128;
      formulas.push("LLM (70B+) requires A100-80GB class GPU.");
    } else if (state.modelSizeParams === "large") {
      gpuType = "A10G";
      ram = 64;
    } else {
      gpuType = "T4";
    }
  }

  // Apply Headroom
  cpu = Math.ceil(cpu * headroom);
  ram = Math.ceil(ram * headroom);

  return {
    recommendedSpec: {
      cpuCores: cpu,
      ramGB: ram,
      storageGB: storage,
      networkGbps: network,
      gpuCount: gpu,
      gpuType: gpuType,
    },
    headroomFactor: headroom,
    breakdown: {
      inputs: state,
      assumptions,
      formulas,
      outputs: { cpu, ram, storage, gpu }
    }
  };
}
