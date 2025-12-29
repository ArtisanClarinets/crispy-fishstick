"use client";

import { motion } from "framer-motion";
import { Mode } from "./case-mode-toggle";

interface CaseArchitectureDiagramProps {
  mode: Mode;
}

export function CaseArchitectureDiagram({ mode }: CaseArchitectureDiagramProps) {
  const gridId = `grid-${mode}`;
  const accentClass =
    mode === "incident"
      ? "text-destructive"
      : mode === "scale"
        ? "text-primary"
        : "text-foreground";

  const railGlowClass =
    mode === "incident" ? "text-destructive/60" : "text-primary/60";

  return (
    <svg viewBox="0 0 520 300" className="w-full h-full text-sm font-mono select-none">
      {/* Background Grid */}
      <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-border/40" />
      </pattern>
      <rect width="520" height="300" fill={`url(#${gridId})`} />

      {/* Layered surfaces */}
      <rect x="40" y="50" width="440" height="190" rx="20" fill="currentColor" className="text-secondary/30" />
      <rect x="70" y="70" width="380" height="150" rx="18" fill="currentColor" className="text-secondary/50" />
      <rect x="100" y="90" width="320" height="110" rx="16" fill="currentColor" className="text-secondary" />

      {/* Rails */}
      <motion.path
        d="M 130 145 L 220 145 L 300 145 L 390 145"
        fill="none"
        stroke="currentColor"
        className={accentClass}
        strokeWidth={2}
        strokeLinecap="round"
        animate={{ opacity: 0.9 }}
      />
      <motion.path
        d="M 130 165 L 220 165 L 300 165 L 390 165"
        fill="none"
        stroke="currentColor"
        className={mode === "incident" ? "text-destructive/40" : "text-primary/30"}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {mode !== "normal" && (
        <motion.path
          d="M 130 145 L 220 145 L 300 145 L 390 145"
          fill="none"
          stroke="currentColor"
          className={railGlowClass}
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      )}

      {/* Nodes */}
      <g className="text-foreground">
        <circle cx="130" cy="155" r="14" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
        <text x="130" y="158" textAnchor="middle" className="fill-foreground text-[9px]">EDGE</text>

        <rect x="206" y="136" width="28" height="38" rx="6" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
        <text x="220" y="158" textAnchor="middle" className="fill-foreground text-[9px]">QUEUE</text>

        <rect x="286" y="136" width="28" height="38" rx="6" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
        <text x="300" y="158" textAnchor="middle" className="fill-foreground text-[9px]">CORE</text>

        <circle cx="390" cy="155" r="14" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
        <text x="390" y="158" textAnchor="middle" className="fill-foreground text-[9px]">DATA</text>
      </g>

      {/* Mode badge */}
      <g transform="translate(330, 60)">
        <rect width="120" height="28" rx="14" fill="currentColor" className={mode === "incident" ? "text-destructive/15" : "text-primary/10"} />
        <text x="60" y="18" textAnchor="middle" className={`text-[9px] tracking-[0.2em] ${accentClass}`}>
          MODE: {mode.toUpperCase()}
        </text>
      </g>

      {/* Legend */}
      <g transform="translate(60, 232)" className="text-[9px]">
        <text x="0" y="0" className="fill-muted-foreground" letterSpacing="2">LEGEND</text>
        <g transform="translate(0, 12)">
          <circle cx="6" cy="6" r="3" fill="currentColor" className="text-primary/70" />
          <text x="16" y="9" className="fill-muted-foreground">Flow rail</text>
        </g>
        <g transform="translate(90, 12)">
          <rect x="0" y="3" width="8" height="6" rx="2" fill="currentColor" className="text-secondary" />
          <text x="14" y="9" className="fill-muted-foreground">Surface</text>
        </g>
      </g>
    </svg>
  );
}
