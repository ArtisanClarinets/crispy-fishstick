// Deterministic RNG helpers for cover art generation
export function slugToSeed(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function checksumHex(input: string, length = 4) {
  const hex = slugToSeed(input).toString(16).toUpperCase();
  return hex.padStart(length, "0").slice(0, length);
}
