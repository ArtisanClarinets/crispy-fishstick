"use client";

import { useState } from "react";
import { Mode, CaseModeToggle } from "./case-mode-toggle";
import { CaseArchitectureDiagram } from "./case-architecture-diagram";
import { CaseKpis } from "./case-kpis";
import { CaseFailureModes } from "./case-failure-modes";
import { caseModePresets } from "@/shared/lib/case-modes/presets";

interface CaseModeData {
  kpis: Record<Mode, { label: string; value: string; desc?: string }[]>;
  failures: Record<Exclude<Mode, "normal">, string[]>;
}

interface CaseModePanelProps {
  initialMode?: Mode;
  preset?: string;
  data?: CaseModeData;
}

export function CaseModePanel({ initialMode, preset, data }: CaseModePanelProps) {
  // Resolve data from preset if provided
  const presetConfig = preset && (preset in caseModePresets) ? caseModePresets[preset as keyof typeof caseModePresets] : null;
  const effectiveData = data || presetConfig?.data;
  const startMode = initialMode || presetConfig?.initialMode || "normal";

  const [mode, setMode] = useState<Mode>(startMode);

  if (!effectiveData) {
    return <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg">Error: Missing Case Mode Data</div>;
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

               {/* Contextual Failure Log Overlay */}
               {mode !== "normal" && (
                   <div className="mt-6">
                      <CaseFailureModes mode={mode} failures={effectiveData.failures[mode as Exclude<Mode, "normal">] || []} />
                   </div>
               )}
            </div>

            {/* Right: KPIs */}
            <div className="p-6 bg-secondary/5 space-y-6">
               <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Performance Metrics</div>
               <CaseKpis mode={mode} data={effectiveData.kpis} />
            </div>

        </div>
    </div>
  );
}
