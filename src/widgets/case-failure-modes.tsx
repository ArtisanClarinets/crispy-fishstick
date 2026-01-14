"use client";

import { Mode } from "./case-mode-toggle";

interface CaseFailureModesProps {
  mode: Mode;
  failures: string[];
}

export function CaseFailureModes({ mode, failures }: CaseFailureModesProps) {
  if (mode === "normal") return null;

  return (
    <div className={`p-4 rounded-lg border text-sm font-mono ${
        mode === "incident" ? "bg-destructive/10 border-destructive/20 text-destructive" :
        "bg-primary/5 border-primary/20 text-primary"
    }`}>
        <div className="font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
            {mode === "incident" ? "⚠️ Active Incident" : "⚡ Scale Events"}
        </div>
        <ul className="space-y-1">
            {failures.map((f, i) => (
                <li key={i} className="flex gap-2">
                   <span>[Log]</span>
                   <span>{f}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}
