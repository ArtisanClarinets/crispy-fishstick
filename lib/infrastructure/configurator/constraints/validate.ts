import { ConfiguratorState, ValidationResult } from "../schema";

export function validateConfiguration(state: ConfiguratorState): ValidationResult {
  const hardBlocks: string[] = [];
  const warnings: string[] = [];
  let power = 200; // Base system power
  let cost = 50; // Base chassis

  // CPU Logic
  if (state.cpuModel?.includes("Epyc")) {
    cost += 200;
    power += 180;
  } else if (state.cpuModel?.includes("Xeon")) {
    cost += 180;
    power += 200;
  } else {
    // Default / Generic
  }

  // RAM Logic
  cost += state.ramGB * 4; // $4/GB
  power += state.ramGB * 0.5; // 0.5W/GB

  if (state.ramGB < 16) {
    warnings.push("Less than 16GB RAM is not recommended for production nodes.");
  }

  // Storage Logic
  let totalStorage = 0;
  state.storageDrives.forEach(drive => {
    totalStorage += drive.sizeGB * drive.qty;
    power += drive.qty * (drive.type === "NVMe" ? 10 : 7);
    cost += drive.qty * (drive.sizeGB * (drive.type === "NVMe" ? 0.15 : 0.08));
  });

  // GPU Logic
  if (state.gpuCount > 0) {
    if (!state.gpuType) {
      hardBlocks.push("GPU count > 0 but no GPU type selected.");
    } else {
      const gpuPower = state.gpuType.includes("A100") ? 400 : 75;
      const gpuCost = state.gpuType.includes("A100") ? 800 : 150;
      power += state.gpuCount * gpuPower;
      cost += state.gpuCount * gpuCost;
    }
  }

  // Power Constraints
  if (power > 1000 && !state.powerRedundancy) {
    warnings.push("Power draw > 1000W but no redundancy selected. High risk of failure.");
  }

  // Network Constraints
  if (state.networkSpeedGbps > 40 && state.cpuModel?.includes("Atom")) {
     hardBlocks.push("Cannot drive >40Gbps network with low-power CPU.");
  }

  return {
    isValid: hardBlocks.length === 0,
    hardBlocks,
    warnings,
    metrics: {
      totalCostMonthly: Math.round(cost),
      powerDrawWatts: Math.round(power),
      rackUnitSize: power > 800 ? 2 : 1,
    },
    explanation: hardBlocks.length > 0
      ? `Configuration invalid due to: ${hardBlocks.join(", ")}`
      : "Configuration is valid for build."
  };
}
