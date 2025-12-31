"use client";

import { useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { getCoverSpec } from "@/lib/cover/generate";
import { cn } from "@/lib/utils";

interface CoverArtProps {
  slug: string;
  className?: string;
  imageSrc?: string | null;
  priority?: boolean;
  sizes?: string;
}

export function CoverArt({ slug, className, imageSrc, priority = false, sizes }: CoverArtProps) {
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
      className={cn(
        "relative w-full h-full bg-background overflow-hidden select-none",
        className
      )}
      style={style}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
          className="object-cover"
          priority={priority}
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
          <linearGradient id={`rim-${safeId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="45%" stopColor={`rgba(255,255,255,${0.12 + spec.accentIntensity * 0.12})`} />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
          <filter id={`distort-${safeId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={spec.distortion}
              numOctaves={2}
              seed={spec.grainSeed}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
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
          stroke={`url(#rim-${safeId})`}
          strokeWidth="1.4"
        />

        {/* Ribbon arcs */}
        <g fill="none" stroke={`url(#ribbon-${safeId})`} strokeLinecap="round" filter={`url(#distort-${safeId})`}>
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
      <div className="absolute inset-6 rounded-[28px] border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.08)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.2), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at ${50 + spec.highlightOffset}% ${38}%, rgba(255,255,255,0.5), transparent 45%)`,
        }}
      />
      <div
        className="absolute -inset-1 pointer-events-none opacity-0 motion-safe:group-hover:opacity-100 motion-safe:group-hover:animate-cover-shimmer transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 45%, transparent 65%)",
          transform: `rotate(${spec.shimmerAngle}deg)`,
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute inset-0 pointer-events-none grain opacity-80" />
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_85%)]" />
    </div>
  );
}
