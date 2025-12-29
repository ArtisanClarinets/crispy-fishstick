/**
 * Procedural cover art generation using seeded randomness.
 * Returns deterministic specs based on slug for consistent rendering.
 */

import { mulberry32, slugToSeed } from "@/lib/cover/seed";

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
    }>;
  };
}

const SPEC_CACHE = new Map<string, CoverSpec>();

function range(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

function snap(value: number, grid: number) {
  return Math.round(value / grid) * grid;
}

function orthogonalRoute(rng: () => number) {
  const grid = 20;
  const start = {
    x: snap(range(rng, 60, 740), grid),
    y: snap(range(rng, 60, 540), grid),
  };
  const mid = {
    x: snap(range(rng, 120, 680), grid),
    y: snap(range(rng, 120, 480), grid),
  };
  const end = {
    x: snap(range(rng, 60, 740), grid),
    y: snap(range(rng, 60, 540), grid),
  };

  return {
    points: [
      start,
      { x: mid.x, y: start.y },
      mid,
      { x: mid.x, y: end.y },
      end,
    ],
  };
}

export function getCoverSpec(slug: string): CoverSpec {
  const cached = SPEC_CACHE.get(slug);
  if (cached) {
    return cached;
  }

  const seed = slugToSeed(slug);
  const rng = mulberry32(seed);

  // Color palette
  const hue = Math.round(range(rng, 0, 360));
  const secHue = Math.round((hue + range(rng, 120, 240)) % 360);

  // Hatch pattern
  const hatchSpacing = range(rng, 8, 16);
  const hatchAngle = range(rng, 0, 90);

  // Heat blobs
  const blobCount = Math.floor(range(rng, 3, 7));
  const blobs = Array.from({ length: blobCount }, () => ({
    cx: range(rng, 100, 700),
    cy: range(rng, 100, 500),
    r: range(rng, 50, 200),
    intensity: range(rng, 0.3, 0.8),
  }));

  // Topographic layers (sine waves)
  const topoLayers = Math.floor(range(rng, 2, 4));
  const topo = Array.from({ length: topoLayers }, () => ({
    y: range(rng, 100, 500),
    freq: range(rng, 0.01, 0.05),
    phase: range(rng, 0, Math.PI * 2),
    amplitude: range(rng, 20, 80),
    strokeOpacity: range(rng, 0.4, 0.8),
  }));

  // Circuit traces
  const nodeCount = Math.floor(range(rng, 4, 8));
  const nodes = Array.from({ length: nodeCount }, () => ({
    cx: range(rng, 50, 750),
    cy: range(rng, 50, 550),
    r: range(rng, 2, 6),
  }));

  const routeCount = Math.floor(range(rng, 3, 6));
  const routes = Array.from({ length: routeCount }, () => {
    const path = orthogonalRoute(rng);

    return {
      points: path.points,
      width: range(rng, 0.5, 2),
      dash: rng() > 0.5 ? "5,5" : "none",
    };
  });

  const spec = {
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

  SPEC_CACHE.set(slug, spec);
  return spec;
}
