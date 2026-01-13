import { describe, it, expect } from "vitest";
import { validateConfiguration } from "../validate";
import { ConfiguratorState } from "../../schema";

describe("Configurator Validation", () => {
  it("validates a standard build", () => {
    const input: ConfiguratorState = {
      cpuModel: "Intel Xeon Gold",
      ramGB: 32,
      storageDrives: [{ type: "SSD", sizeGB: 512, qty: 1 }],
      gpuCount: 0,
      networkSpeedGbps: 10,
      powerRedundancy: true,
    };

    const result = validateConfiguration(input);
    expect(result.isValid).toBe(true);
    expect(result.hardBlocks).toHaveLength(0);
  });

  it("blocks GPU without type", () => {
    const input: ConfiguratorState = {
      cpuModel: "Intel Xeon Gold",
      ramGB: 32,
      storageDrives: [{ type: "SSD", sizeGB: 512, qty: 1 }],
      gpuCount: 1,
      gpuType: undefined, // Missing
      networkSpeedGbps: 10,
      powerRedundancy: true,
    };

    const result = validateConfiguration(input);
    expect(result.isValid).toBe(false);
    expect(result.hardBlocks).toContain("GPU count > 0 but no GPU type selected.");
  });

  it("warns on low RAM", () => {
    const input: ConfiguratorState = {
      cpuModel: "Intel Xeon Gold",
      ramGB: 8,
      storageDrives: [{ type: "SSD", sizeGB: 512, qty: 1 }],
      gpuCount: 0,
      networkSpeedGbps: 10,
      powerRedundancy: true,
    };

    const result = validateConfiguration(input);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toContain("Less than 16GB RAM is not recommended for production nodes.");
  });
});
