import { getSeededRandom } from "./seed";

export type CoverSpec = {
  theme: "dark" | "light";
  primaryColor: string;
  secondaryColor: string;
  pattern: "grid" | "circle" | "wave";
  density: number;
};

export function getCoverSpec(slug: string): CoverSpec {
  const rng = getSeededRandom(slug);

  const themes: ("dark" | "light")[] = ["dark", "dark", "light"]; // Bias towards dark
  const patterns: ("grid" | "circle" | "wave")[] = ["grid", "circle", "wave"];
  const colors = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#8b5cf6", // violet-500
    "#f43f5e", // rose-500
    "#f59e0b", // amber-500
    "#06b6d4", // cyan-500
  ];

  return {
    theme: themes[Math.floor(rng() * themes.length)],
    primaryColor: colors[Math.floor(rng() * colors.length)],
    secondaryColor: colors[Math.floor(rng() * colors.length)],
    pattern: patterns[Math.floor(rng() * patterns.length)],
    density: 0.5 + rng() * 0.5,
  };
}
