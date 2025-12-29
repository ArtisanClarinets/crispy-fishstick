"use client";

import { useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { getCoverSpec } from "@/lib/cover/generate";
import { cn } from "@/lib/utils";

interface CoverArtProps {
  slug: string;
  className?: string;
  imageSrc?: string | null;
}

export function CoverArt({ slug, className, imageSrc }: CoverArtProps) {
  const spec = useMemo(() => getCoverSpec(slug), [slug]);
  const safeId = slug.replace(/[^a-zA-Z0-9_-]/g, "-");

  const meshBackground = spec.meshStops
    .map((stop) => {
      return `radial-gradient(circle at ${stop.x}% ${stop.y}%, hsl(${stop.hue} 70% 60% / ${stop.alpha}) 0%, transparent ${stop.radius}%)`;
    })
    .join(", ");

  const style = {
    "--cover-hue": spec.palette.hue,
    "--cover-sec": spec.palette.secHue,
    "--cover-accent": spec.palette.accentHue,
  } as CSSProperties;

  return (
    <div
      className={cn("relative w-full h-full bg-background overflow-hidden select-none", className)}
      style={style}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
      ) : null}

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{ backgroundImage: meshBackground }}
      />

      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`ribbon-${safeId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(${spec.palette.hue} 70% 70% / 0.2)`} />
            <stop offset="100%" stopColor={`hsl(${spec.palette.accentHue} 80% 70% / ${spec.accentIntensity})`} />
          </linearGradient>
          <radialGradient id={`plate-${safeId}`} cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Glass plate */}
        <rect x="120" y="90" width="560" height="360" rx="32" fill={`url(#plate-${safeId})`} />
        <rect
          x="120"
          y="90"
          width="560"
          height="360"
          rx="32"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />

        {/* Ribbon arcs */}
        <g fill="none" stroke={`url(#ribbon-${safeId})`} strokeLinecap="round">
          {spec.ribbons.map((ribbon, i) => (
            <path
              key={`ribbon-${i}`}
              d={`M ${ribbon.start.x} ${ribbon.start.y} C ${ribbon.control1.x} ${ribbon.control1.y}, ${ribbon.control2.x} ${ribbon.control2.y}, ${ribbon.end.x} ${ribbon.end.y}`}
              strokeWidth={ribbon.width}
              opacity={ribbon.opacity}
            />
          ))}
        </g>

        {/* Rings */}
        <g fill="none" stroke={`hsl(${spec.palette.secHue} 70% 70% / 0.4)`}>
          {spec.rings.map((ring, i) => (
            <circle
              key={`ring-${i}`}
              cx={ring.cx}
              cy={ring.cy}
              r={ring.r}
              strokeWidth={ring.strokeWidth}
              opacity={ring.opacity}
            />
          ))}
        </g>
      </svg>

      {/* Accent rim + grain */}
      <div className="absolute inset-6 rounded-[28px] border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.06)] pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />
    </div>
  );
}
