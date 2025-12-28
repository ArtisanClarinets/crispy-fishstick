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
    opacity: number;
  }>;
  topo: Array<{
    opacity: number;
    paths: string[];
  }>;
  circuits: {
    routes: Array<{
      d: string;
      width: number;
      dash: string;
    }>;
    nodes: Array<{
      cx: number;
      cy: number;
      r: number;
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
    opacity: rng.range(0.3, 0.8),
  }));

  // Topographic layers
  const topoLayers = Math.floor(rng.range(2, 4));
  const topo = Array.from({ length: topoLayers }, (_, i) => {
    const pathCount = Math.floor(rng.range(3, 6));
    const paths = Array.from({ length: pathCount }, () => {
      // Generate simple SVG paths for topographic lines
      const startX = rng.range(0, 800);
      const startY = rng.range(0, 600);
      const endX = rng.range(0, 800);
      const endY = rng.range(0, 600);
      const cp1x = rng.range(0, 800);
      const cp1y = rng.range(0, 600);
      const cp2x = rng.range(0, 800);
      const cp2y = rng.range(0, 600);

      return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    });

    return {
      opacity: 0.3 - i * 0.08,
      paths,
    };
  });

  // Circuit traces
  const nodeCount = Math.floor(rng.range(4, 8));
  const nodes = Array.from({ length: nodeCount }, () => ({
    cx: rng.range(50, 750),
    cy: rng.range(50, 550),
    r: rng.range(2, 6),
  }));

  const routeCount = Math.floor(rng.range(3, 6));
  const routes = Array.from({ length: routeCount }, () => {
    const startX = rng.range(50, 750);
    const startY = rng.range(50, 550);
    const endX = rng.range(50, 750);
    const endY = rng.range(50, 550);
    const cpX = rng.range(50, 750);
    const cpY = rng.range(50, 550);

    return {
      d: `M ${startX} ${startY} Q ${cpX} ${cpY}, ${endX} ${endY}`,
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
