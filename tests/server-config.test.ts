import { describe, it, expect } from "vitest";
import { calculateRequirements, recommendServer } from "../lib/server-config/engine";
import { WorkloadIntent } from "../lib/server-config/types";

describe("Server Config Engine", () => {
  it("should calculate web server requirements correctly", () => {
    const intent: WorkloadIntent = {
      workloadType: "web_server",
      trafficPattern: "constant",
      userCount: 100,
      environment: "production",
      requestsPerSecond: 500, // 500 / 250 = 2 cores
      concurrentConnections: 100,
    };

    const { requirements, bottleneck } = calculateRequirements(intent);
    
    // Headroom 1.3
    // Cores: 2 * 1.3 = 2.6 -> 3
    expect(requirements.cpuCores).toBeGreaterThanOrEqual(3);
    expect(bottleneck).toBe("cpu_throughput");
  });

  it("should calculate database requirements correctly", () => {
    const intent: WorkloadIntent = {
      workloadType: "database",
      trafficPattern: "bursty", // 2.0 headroom
      userCount: 1000,
      environment: "production",
      datasetSizeGB: 20, // 20 * 1.5 = 30GB RAM base
      readWriteRatio: "balanced",
    };

    const { requirements, bottleneck } = calculateRequirements(intent);

    // RAM: 30 * 2.0 = 60 GB
    expect(requirements.ramGB).toBeGreaterThanOrEqual(60);
    expect(bottleneck).toBe("memory_dataset");
  });

  it("should recommend a GPU node for AI workloads", () => {
    const intent: WorkloadIntent = {
      workloadType: "ai_ml",
      trafficPattern: "constant",
      userCount: 1,
      environment: "production",
      modelSizeParams: "xlarge", // Needs 80GB VRAM
      batchSize: 1,
      trainingOrInference: "inference",
    };

    const result = recommendServer(intent);
    
    expect(result.primarySku.specs.gpuCount).toBeGreaterThan(0);
    expect(result.primarySku.specs.gpuVramGB).toBeGreaterThanOrEqual(80);
    expect(result.explanation.bottleneck).toBe("gpu_vram");
  });

  it("should fallback gracefully if no perfect match", () => {
     // Extremely high requirements
     const intent: WorkloadIntent = {
        workloadType: "web_server",
        trafficPattern: "bursty",
        userCount: 100000,
        environment: "production",
        requestsPerSecond: 100000, 
        concurrentConnections: 50000,
     };
  
     const result = recommendServer(intent);
     expect(result.primarySku).toBeDefined(); // Should return the "Beast" or largest
  });
});
