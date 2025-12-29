"use client";

import { motion } from "framer-motion";
import { Mode } from "./case-mode-toggle";

interface CaseArchitectureDiagramProps {
  mode: Mode;
}

export function CaseArchitectureDiagram({ mode }: CaseArchitectureDiagramProps) {
  // Simplified SVG diagram with nodes that light up based on mode
  const gridId = `grid-${mode}`;
  const getStrokeWidth = (targetMode: string) => {
    if (mode === "scale") return 2;
    if (mode === "incident" && targetMode === "db") return 2;
    return 1;
  };

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full text-sm font-mono select-none">
       {/* Background Grid */}
       <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
         <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border opacity-20"/>
       </pattern>
       <rect width="400" height="200" fill={`url(#${gridId})`} />

       {/* Edges */}
       <motion.path
         d="M 60 100 L 140 100"
         fill="none"
         stroke="currentColor"
         className={mode === "scale" ? "text-primary" : "text-border"}
         animate={{ strokeDasharray: mode === "scale" ? "4 2" : "0 0" }} // dashed moving line simulation if possible, or just style
         strokeWidth={getStrokeWidth('web')}
       />
       <motion.path
         d="M 200 100 L 280 100"
         fill="none"
         stroke="currentColor"
         className={mode === "incident" ? "text-destructive" : "text-border"}
         strokeWidth={getStrokeWidth('db')}
       />

       {/* Node: Client */}
       <g transform="translate(30, 100)">
          <circle r="20" fill="none" stroke="currentColor" className="text-foreground" />
          <text textAnchor="middle" y="4" className="fill-foreground text-[10px]">USR</text>
       </g>

       {/* Node: Web */}
       <g transform="translate(170, 100)">
          <rect x="-30" y="-20" width="60" height="40" rx="4" fill="currentColor" className="text-secondary" stroke="currentColor" strokeWidth="1" />
          <text textAnchor="middle" y="4" className="fill-foreground text-[10px]">API GW</text>

          {/* Scale indicators */}
          {mode === "scale" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <rect x="-35" y="-25" width="70" height="50" rx="6" fill="none" stroke="currentColor" className="text-primary" strokeDasharray="4 2" />
               <text x="0" y="-35" textAnchor="middle" className="fill-primary text-[8px]">AUTOSCALE</text>
            </motion.g>
          )}
       </g>

       {/* Node: DB */}
       <g transform="translate(310, 100)">
          <path d="M -20 -15 C -20 -25 20 -25 20 -15 L 20 15 C 20 25 -20 25 -20 15 Z" fill="currentColor" className={mode === "incident" ? "text-destructive/20" : "text-secondary"} stroke="currentColor" strokeWidth="1" />
          <text textAnchor="middle" y="4" className={`text-[10px] ${mode === "incident" ? "fill-destructive font-bold" : "fill-foreground"}`}>DB PRIMARY</text>

           {/* Incident indicators */}
          {mode === "incident" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <text x="0" y="35" textAnchor="middle" className="fill-destructive text-[8px] animate-pulse">FAILOVER...</text>
            </motion.g>
          )}
       </g>

    </svg>
  );
}
