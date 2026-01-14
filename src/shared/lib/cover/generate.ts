/**
 * Procedural cover art generation using seeded randomness.
 * Returns deterministic specs based on slug for consistent rendering.
 */

// Seeded PRNG for deterministic generation
class SeededRNG {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

export interface CoverSpec {
  palette: {
    hue: number;
    secHue: number;
  };
  hatch: {
    spacing: number;
    angle: number;
  };
  blobs: Array<{
    cx: number;
    cy: number;
    r: number;
    intensity: number;
  }>;
  topo: Array<{
    y: number;
    freq: number;
    phase: number;
    amplitude: number;
    strokeOpacity: number;
  }>;
  circuits: {
    routes: Array<{
      points: Array<{ x: number; y: number }>;
      width: number;
      dash: string;
    }>;
    nodes: Array<{
      cx: number;
      cy: number;
      r: number;
      intensity: number; // Added missing property based on usage
    }>;
  };
}

/**
 * Hash a string to a seed for deterministic PRNG
 */
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getCoverSpec(slug: string): CoverSpec {
  const rng = new SeededRNG(hashSlug(slug));

  // Color palette
  const hue = Math.round(rng.range(0, 360));
  const secHue = Math.round((hue + rng.range(120, 240)) % 360);

  // Hatch pattern
  const hatchSpacing = rng.range(8, 16);
  const hatchAngle = rng.range(0, 90);

  // Heat blobs
  const blobCount = Math.floor(rng.range(3, 7));
  const blobs = Array.from({ length: blobCount }, () => ({
    cx: rng.range(100, 700),
    cy: rng.range(100, 500),
    r: rng.range(50, 200),
    intensity: rng.range(0.3, 0.8),
  }));

  // Topographic layers (sine waves)
  const topoLayers = Math.floor(rng.range(2, 4));
  const topo = Array.from({ length: topoLayers }, () => ({
    y: rng.range(100, 500),
    freq: rng.range(0.01, 0.05),
    phase: rng.range(0, Math.PI * 2),
    amplitude: rng.range(20, 80),
    strokeOpacity: rng.range(0.4, 0.8),
  }));

  // Circuit traces
  const nodeCount = Math.floor(rng.range(4, 8));
  const nodes = Array.from({ length: nodeCount }, () => ({
    cx: rng.range(50, 750),
    cy: rng.range(50, 550),
    r: rng.range(2, 6),
    intensity: 1, // Default intensity
  }));

  const routeCount = Math.floor(rng.range(3, 6));
  const routes = Array.from({ length: routeCount }, () => {
    const pointCount = Math.floor(rng.range(3, 8));
    const points = Array.from({ length: pointCount }, () => ({
      x: rng.range(50, 750),
      y: rng.range(50, 550),
    }));

    return {
      points,
      width: rng.range(0.5, 2),
      dash: rng.next() > 0.5 ? "5,5" : "none",
    };
  });

  return {
    palette: {
      hue,
      secHue,
    },
    hatch: {
      spacing: hatchSpacing,
      angle: hatchAngle,
    },
    blobs,
    topo,
    circuits: {
      routes,
      nodes,
    },
  };
}
