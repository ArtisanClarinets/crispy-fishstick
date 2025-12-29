/**
 * Procedural cover art generation using seeded randomness.
 * Returns deterministic specs based on slug for consistent rendering.
 */

import { mulberry32, slugToSeed } from "@/lib/cover/seed";

export interface CoverSpec {
  palette: {
    hue: number;
    secHue: number;
    accentHue: number;
  };
  mood: "signal" | "calm" | "nocturne";
  meshStops: Array<{
    x: number;
    y: number;
    hue: number;
    alpha: number;
    radius: number;
  }>;
  ribbons: Array<{
    start: { x: number; y: number };
    control1: { x: number; y: number };
    control2: { x: number; y: number };
    end: { x: number; y: number };
    width: number;
    opacity: number;
  }>;
  rings: Array<{
    cx: number;
    cy: number;
    r: number;
    strokeWidth: number;
    opacity: number;
  }>;
  grainSeed: number;
  accentIntensity: number;
}

const SPEC_CACHE = new Map<string, CoverSpec>();

function range(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

function snap(value: number, grid: number) {
  return Math.round(value / grid) * grid;
}

function pickMood(rng: () => number): CoverSpec["mood"] {
  const roll = rng();
  if (roll > 0.66) return "nocturne";
  if (roll > 0.33) return "signal";
  return "calm";
}

export function getCoverSpec(slug: string): CoverSpec {
  const cached = SPEC_CACHE.get(slug);
  if (cached) {
    return cached;
  }

  const seed = slugToSeed(slug);
  const rng = mulberry32(seed);

  // Color palette
  const hue = Math.round(range(rng, 180, 340));
  const secHue = Math.round((hue + range(rng, 30, 90)) % 360);
  const accentHue = Math.round((hue + range(rng, 120, 200)) % 360);

  const mood = pickMood(rng);

  // Mesh gradient stops
  const meshStops = Array.from({ length: 4 }, () => ({
    x: snap(range(rng, 10, 90), 5),
    y: snap(range(rng, 8, 88), 4),
    hue: rng() > 0.6 ? secHue : hue,
    alpha: range(rng, 0.12, 0.32),
    radius: range(rng, 35, 60),
  }));

  // Ribbon arcs
  const ribbonCount = Math.floor(range(rng, 2, 4));
  const ribbons = Array.from({ length: ribbonCount }, () => ({
    start: { x: range(rng, 40, 140), y: range(rng, 60, 160) },
    control1: { x: range(rng, 160, 320), y: range(rng, 20, 220) },
    control2: { x: range(rng, 360, 520), y: range(rng, 260, 520) },
    end: { x: range(rng, 620, 760), y: range(rng, 320, 520) },
    width: range(rng, 1.4, 2.6),
    opacity: range(rng, 0.25, 0.6),
  }));

  // Rings
  const ringCount = Math.floor(range(rng, 2, 4));
  const rings = Array.from({ length: ringCount }, () => ({
    cx: range(rng, 120, 680),
    cy: range(rng, 120, 460),
    r: range(rng, 60, 180),
    strokeWidth: range(rng, 0.6, 1.6),
    opacity: range(rng, 0.2, 0.5),
  }));

  const spec = {
    palette: {
      hue,
      secHue,
      accentHue,
    },
    mood,
    meshStops,
    ribbons,
    rings,
    grainSeed: seed,
    accentIntensity: range(rng, 0.35, 0.8),
  };

  SPEC_CACHE.set(slug, spec);
  return spec;
}
