import { describe, it, expect } from 'vitest';
import { calculateRequirements } from '../../lib/server-config/engine';
import { WorkloadIntent } from '../../lib/server-config/types';

describe('Server Recommendation Engine', () => {
  it('calculates requirements for simple web workload', () => {
    const intent: WorkloadIntent = {
      appType: 'web',
      traffic: 'medium',
      persistence: 'ephemeral',
    };

    const result = calculateRequirements(intent);

    // Web Medium: CPU 2, RAM 4, Storage 20
    // Headroom Ephemeral: 1.2
    // Expected: CPU ceil(2*1.2)=3, RAM ceil(4*1.2)=5, Storage ceil(20*1.2)=24

    expect(result.requirements.minCpuCores).toBe(3);
    expect(result.requirements.minRamGb).toBe(5);
    expect(result.requirements.minStorageGb).toBe(24);
    expect(result.explanation.bottleneck).toBe('CPU/RAM based on traffic');
  });

  it('calculates requirements for database workload', () => {
    const intent: WorkloadIntent = {
      appType: 'db',
      traffic: 'high',
      persistence: 'persistent',
      dataSizeGb: 50,
    };

    const result = calculateRequirements(intent);

    // DB High: CPU 8
    // DB RAM Factor: 2 * 50 = 100
    // DB Storage: 50 * 1.2 = 60
    // Headroom Persistent: 1.5
    // Expected: CPU ceil(8*1.5)=12, RAM ceil(100*1.5)=150, Storage ceil(60*1.5)=90

    expect(result.requirements.minCpuCores).toBe(12);
    expect(result.requirements.minRamGb).toBe(150);
    expect(result.requirements.minStorageGb).toBe(90);
    expect(result.requirements.storageType).toBe('nvme');
  });

  it('calculates requirements for ml workload', () => {
    const intent: WorkloadIntent = {
      appType: 'ml',
      traffic: 'low',
      persistence: 'ephemeral',
      modelSizeGb: 10,
    };

    const result = calculateRequirements(intent);

    // ML Base: CPU 4
    // RAM: 10 * 1.5 = 15
    // VRAM: 10 * 1.2 = 12
    // Storage: 50
    // Headroom Ephemeral: 1.2
    // Expected: CPU ceil(4*1.2)=5, RAM ceil(15*1.2)=18, VRAM ceil(12*1.2)=15

    expect(result.requirements.minCpuCores).toBe(5);
    expect(result.requirements.minRamGb).toBe(18);
    expect(result.requirements.minGpuVramGb).toBe(15);
  });

  it('returns recommendations based on inventory', () => {
    const intent: WorkloadIntent = {
      appType: 'web',
      traffic: 'low',
      persistence: 'ephemeral',
    };
    // Web Low: CPU 1, RAM 2, Storage 20
    // Headroom 1.2 -> CPU 2, RAM 3, Storage 24

    const result = calculateRequirements(intent);

    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].cpuCores).toBeGreaterThan(0);
  });
});
