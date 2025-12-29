"use client";

import { useState } from "react";
import { Mode, CaseModeToggle } from "./case-mode-toggle";
import { CaseArchitectureDiagram } from "./case-architecture-diagram";
import { CaseKpis } from "./case-kpis";
import { CaseFailureModes } from "./case-failure-modes";
import { caseModePresets, type CaseModePresetKey } from "@/lib/case-modes/presets";
import { AnimatePresence, motion } from "framer-motion";

interface CaseModePanelProps {
  initialMode?: Mode;
  preset?: CaseModePresetKey;
  data?: {
    kpis: Record<Mode, { label: string; value: string; desc?: string }[]>;
    failures: Record<Exclude<Mode, "normal">, string[]>;
    narratives: Record<Mode, string>;
  };
}

export function CaseModePanel({ initialMode = "normal", data, preset }: CaseModePanelProps) {
  const resolvedData = preset ? caseModePresets[preset].data : data;
  const resolvedInitialMode = preset ? caseModePresets[preset].initialMode : initialMode;
  const [mode, setMode] = useState<Mode>(resolvedInitialMode);

  if (!resolvedData) {
    return null;
  }

  return (
    <div className="my-12 rounded-2xl border border-border bg-card/50 overflow-hidden shadow-sm">
      {/* Header / Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-border/50 bg-secondary/20">
        <div>
          <h3 className="font-semibold text-lg">System Behavior Analysis</h3>
          <p className="text-sm text-muted-foreground">Interactive architecture view</p>
        </div>
        <CaseModeToggle mode={mode} setMode={setMode} />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50 min-h-[400px]">
        {/* Left: Diagram */}
        <div className="lg:col-span-2 p-6 bg-background relative flex flex-col">
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            <CaseArchitectureDiagram mode={mode} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                {resolvedData.narratives[mode]}
              </p>
              {mode !== "normal" && (
                <CaseFailureModes
                  mode={mode}
                  failures={resolvedData.failures[mode as Exclude<Mode, "normal">] || []}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: KPIs */}
        <div className="p-6 bg-secondary/5 space-y-6">
          <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Performance Metrics</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CaseKpis mode={mode} data={resolvedData.kpis} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
