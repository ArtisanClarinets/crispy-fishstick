"use client";

import { Mode } from "./case-mode-toggle";
import { motion, AnimatePresence } from "framer-motion";

interface CaseKpisProps {
  mode: Mode;
  data: Record<Mode, { label: string; value: string; desc?: string }[]>;
}

export function CaseKpis({ mode, data }: CaseKpisProps) {
  const kpis = data[mode];

  return (
    <div className="grid grid-cols-2 gap-4">
       <AnimatePresence mode="wait">
          {kpis.map((kpi, i) => (
             <motion.div
                key={`${mode}-${i}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="p-4 rounded-lg bg-card border border-border/50"
             >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className={`text-2xl font-mono font-bold ${
                    mode === 'incident' ? 'text-destructive' :
                    mode === 'scale' ? 'text-primary' : 'text-foreground'
                }`}>
                    {kpi.value}
                </div>
                {kpi.desc && (
                    <div className="text-xs text-muted-foreground mt-1">{kpi.desc}</div>
                )}
             </motion.div>
          ))}
       </AnimatePresence>
    </div>
  );
}
