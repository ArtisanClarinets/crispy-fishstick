import { describe, it, expect } from "vitest";
import { calculateEstimate } from "../math";
import { EstimatorWizardState } from "../schema";

describe("Estimator Math", () => {
  it("calculates web server requirements correctly", () => {
    const input: EstimatorWizardState = {
      workloadType: "web_server",
      trafficPattern: "constant",
      userCount: 100,
      environment: "production",
      requestsPerSecond: 1000,
    };

    const result = calculateEstimate(input);
    expect(result.recommendedSpec.cpuCores).toBeGreaterThan(2);
    expect(result.headroomFactor).toBe(1.2);
  });

  it("applies bursty headroom", () => {
    const input: EstimatorWizardState = {
      workloadType: "web_server",
      trafficPattern: "bursty",
      userCount: 100,
      environment: "production",
    };

    const result = calculateEstimate(input);
    expect(result.headroomFactor).toBe(2.0);
  });

  it("recommends GPU for AI workloads", () => {
    const input: EstimatorWizardState = {
      workloadType: "ai_ml",
      trafficPattern: "constant",
      userCount: 1,
      environment: "production",
      modelSizeParams: "xlarge",
    };

    const result = calculateEstimate(input);
    expect(result.recommendedSpec.gpuCount).toBe(1);
    expect(result.recommendedSpec.gpuType).toContain("A100");
  });
});
