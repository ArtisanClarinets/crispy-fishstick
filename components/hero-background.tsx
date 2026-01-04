"use client";

import { useEffect, useState } from "react";

export function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 -z-10 bg-background" />;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      {/* 1. Grain Texture Overlay (Digital Dust) */}
      <div 
        className="absolute inset-0 z-10 opacity-[var(--noise-opacity)] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Primary Copper Aurora */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[100px] opacity-20 dark:opacity-10 animate-aurora-1"
        style={{
          background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* 3. Secondary Patina Drift */}
      <div 
        className="absolute top-[10%] right-[0%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-10 dark:opacity-20 animate-aurora-2 mix-blend-color-dodge"
        style={{
          background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.06) 0%, transparent 70%)`,
        }}
      />

      {/* 4. Deep Graphite Shadow (Contrast) */}
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-30 dark:opacity-40 animate-aurora-3"
        style={{
          background: "radial-gradient(circle, hsl(var(--foreground)) 0%, transparent 70%)",
        }}
      />

      {/* 5. Metallic Highlight Shimmer */}
      <div 
        className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full blur-[80px] opacity-20 dark:opacity-10 animate-pulse-slow mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

