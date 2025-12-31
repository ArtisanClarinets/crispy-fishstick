"use client";

import { Squares } from "@/components/react-bits/Squares";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.15]">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#999" 
          hoverFillColor="#555"
        />
      </div>
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
    </div>
  );
}
