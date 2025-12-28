"use client";

import { useMemo } from "react";
import { getCoverSpec } from "@/lib/cover/generate";
import { cn } from "@/lib/utils";

interface CoverArtProps {
  slug: string;
  className?: string;
  detail?: boolean; // If true, maybe show more detail?
}

export function CoverArt({ slug, className, detail = false }: CoverArtProps) {
  // Memoize spec so we don't re-run PRNG on every render (though it's fast)
  const spec = useMemo(() => getCoverSpec(slug), [slug]);

  // CSS variables for dynamic coloring
  const style = {
    "--cover-hue": spec.palette.hue,
    "--cover-sec": spec.palette.secHue,
  } as React.CSSProperties;

  return (
    <div
      className={cn("relative w-full h-full bg-background overflow-hidden select-none", className)}
      style={style}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 0%, hsl(var(--cover-hue) 80% 20%), transparent 80%)`
        }}
      />

      <svg
        viewBox="0 0 800 600"
        className="w-full h-full opacity-60"
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

        {/* 1. Hatch Fill */}
        <rect width="100%" height="100%" fill={`url(#hatch-${slug})`} />

        {/* 2. Heat Blobs */}
        {spec.blobs.map((blob, i) => (
          <circle
            key={`blob-${i}`}
            cx={blob.cx}
            cy={blob.cy}
            r={blob.r}
            fill={`url(#glow-${slug})`}
            style={{ opacity: blob.opacity, mixBlendMode: "screen" }}
          />
        ))}

        {/* 3. Topo Lines */}
        {spec.topo.map((layer, i) => (
          <g key={`topo-${i}`} style={{ opacity: layer.opacity }}>
            {layer.paths.map((d, j) => (
              <path
                key={`path-${j}`}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/40"
              />
            ))}
          </g>
        ))}

        {/* 4. Circuit Traces */}
        <g className="text-primary/70">
          {spec.circuits.routes.map((route, i) => (
            <path
              key={`route-${i}`}
              d={route.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={route.width}
              strokeDasharray={route.dash}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {spec.circuits.nodes.map((node, i) => (
            <circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="currentColor"
              className="text-primary"
            />
          ))}
        </g>

        {/* Optional Technical Overlay Text (just decorative) */}
        {detail && (
          <text x="40" y="560" className="text-[10px] font-mono fill-muted-foreground uppercase tracking-widest opacity-50">
             REF: {slug.toUpperCase()} // HUE: {spec.palette.hue} // GEN: V1
          </text>
        )}
      </svg>

      {/* Vignette Overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
}
