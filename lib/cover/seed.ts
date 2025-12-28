// lib/cover/seed.ts

/**
 * Generates a stable 32-bit hash from a string slug.
 * Uses FNV-1a algorithm or similar simple mixing.
 */
export function hashSlugToU32(slug: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Returns a deterministic PRNG function (0..1) based on a seed.
 * Mulberry32 is fast and good enough for visual noise.
 */
export function mulberry32(seed: number): () => number {
  return function() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Helper to get a ready-to-use PRNG for a given project slug.
 */
export function rngFromSlug(slug: string) {
  const seed = hashSlugToU32(slug);
  return mulberry32(seed);
}
