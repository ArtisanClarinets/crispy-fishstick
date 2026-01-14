"use client";

import { useMemo } from "react";
import { getCoverSpec } from "@/shared/lib/cover/generate";
import { cn } from "@/shared/lib/utils";

interface CoverArtProps {
  slug: string;
  className?: string;
  imageSrc?: string | null;
  priority?: boolean;
  sizes?: string;
}

export function CoverArt({ slug, className }: CoverArtProps) {
  const spec = useMemo(() => getCoverSpec(slug), [slug]);

  const style = {
    "--cover-hue": spec.palette.hue,
    "--cover-sec": spec.palette.secHue,
  } as React.CSSProperties;

  // Generate topo paths from params
  const topoPaths = useMemo(() => {
    return spec.topo.map((layer) => {
      // Create a sine wave path
      let d = `M 0 ${layer.y}`;
      for (let x = 0; x <= 800; x += 10) {
        const y = layer.y + Math.sin(x * layer.freq + layer.phase) * layer.amplitude;
        d += ` L ${x} ${y}`;
      }
      return d;
    });
  }, [spec.topo]);

  // Generate circuit paths from points
  const circuitPaths = useMemo(() => {
    return spec.circuits.routes.map((route) => {
      if (route.points.length === 0) return "";
      let d = `M ${route.points[0].x} ${route.points[0].y}`;
      for (let i = 1; i < route.points.length; i++) {
        d += ` L ${route.points[i].x} ${route.points[i].y}`;
      }
      return d;
    });
  }, [spec.circuits.routes]);

  return (
    <div
      className={cn("relative w-full h-full bg-background overflow-hidden select-none", className)}
      style={style}
    >
      {/* 1. Background Field (Subtle Gradient/Vignette) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 0%, hsl(var(--cover-hue) 80% 20%), transparent 80%)`
        }}
      />

      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`hatch-${slug}`}
            width={spec.hatch.spacing}
            height={spec.hatch.spacing}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${spec.hatch.angle})`}
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={spec.hatch.spacing}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/10"
            />
          </pattern>

          <radialGradient id={`glow-${slug}`}>
            <stop offset="0%" stopColor="hsl(var(--cover-hue) 80% 60%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--cover-hue) 80% 40%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 2. Blueprint Hatch */}
        <rect width="100%" height="100%" fill={`url(#hatch-${slug})`} opacity="0.3" />

        {/* 3. Heat Blobs */}
        {spec.blobs.map((blob, i) => (
          <circle
            key={`blob-${i}`}
            cx={blob.cx}
            cy={blob.cy}
            r={blob.r}
            fill={`url(#glow-${slug})`}
            style={{ opacity: blob.intensity, mixBlendMode: "screen" }}
          />
        ))}

        {/* 4. Topographic Lines */}
        {spec.topo.map((layer, i) => (
          <path
            key={`topo-${i}`}
            d={topoPaths[i]}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
            style={{ opacity: layer.strokeOpacity }}
          />
        ))}

        {/* 5. Circuit Traces + Node Dots */}
        <g className="text-primary">
          {spec.circuits.routes.map((route, i) => (
            <path
              key={`route-${i}`}
              d={circuitPaths[i]}
              fill="none"
              stroke="currentColor"
              strokeWidth={route.width}
              strokeDasharray={route.dash}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            />
          ))}
          {spec.circuits.nodes.map((node, i) => (
            <circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="currentColor"
              className="opacity-90"
            />
          ))}
        </g>
      </svg>

      {/* 6. Edge Polish (Subtle Inner Stroke; Rounding handled by wrapper) */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
