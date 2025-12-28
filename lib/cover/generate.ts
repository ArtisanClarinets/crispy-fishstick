import { rngFromSlug } from "./seed";

export interface CoverSpec {
  palette: {
    hue: number;
    secHue: number;
  };
  hatch: {
    angle: number;
    spacing: number;
  };
  blobs: {
    cx: number;
    cy: number;
    r: number;
    intensity: number; // 0..1
  }[];
  topo: {
    y: number;
    amplitude: number;
    freq: number;
    phase: number;
    strokeOpacity: number;
  }[];
  circuits: {
    nodes: { cx: number; cy: number; r: number }[];
    routes: { points: { x: number; y: number }[]; width: number; dash: string }[];
  };
}

const cache = new Map<string, CoverSpec>();

export function getCoverSpec(slug: string): CoverSpec {
  if (cache.has(slug)) {
    return cache.get(slug)!;
  }

  const rng = rngFromSlug(slug);
  const rand = (min: number, max: number) => min + rng() * (max - min);

  // Palette
  const hue = Math.floor(rand(0, 360));
  const secHue = (hue + rand(30, 60)) % 360;

  // Hatch
  const hatch = {
    angle: rand(-20, 20),
    spacing: rand(3, 8),
  };

  // Heat Blobs
  const blobs = [];
  const blobCount = Math.floor(rand(2, 5));
  for (let i = 0; i < blobCount; i++) {
    blobs.push({
      cx: rand(0, 800),
      cy: rand(0, 600),
      r: rand(100, 300),
      intensity: rand(0.3, 0.7),
    });
  }

  // Topo Lines (sine waves)
  const topo = [];
  const topoCount = Math.floor(rand(3, 6));
  for (let i = 0; i < topoCount; i++) {
    topo.push({
      y: rand(100, 500),
      amplitude: rand(20, 50),
      freq: rand(0.01, 0.03),
      phase: rand(0, Math.PI * 2),
      strokeOpacity: rand(0.3, 0.8),
    });
  }

  // Circuits
  const nodes = [];
  const routes = [];
  const circuitCount = Math.floor(rand(3, 8));

  for (let i = 0; i < circuitCount; i++) {
    const x = rand(50, 750);
    const y = rand(50, 550);
    nodes.push({ cx: x, cy: y, r: rand(2, 4) });

    // Create a simple orthogonal path from this node
    const points = [{ x, y }];
    let currX = x;
    let currY = y;
    const segments = Math.floor(rand(1, 3));

    for (let j = 0; j < segments; j++) {
      if (rng() > 0.5) {
        // Horizontal move
        currX += rand(-100, 100);
      } else {
        // Vertical move
        currY += rand(-100, 100);
      }
      points.push({ x: currX, y: currY });
    }

    routes.push({
      points,
      width: rand(1, 2),
      dash: rng() > 0.5 ? "0" : "4 4",
    });
  }

  const spec: CoverSpec = {
    palette: { hue, secHue },
    hatch,
    blobs,
    topo,
    circuits: { nodes, routes },
  };

  cache.set(slug, spec);
  return spec;
}
