"use client";

import { motion } from "framer-motion";

export type Mode = "normal" | "scale" | "incident";

interface CaseModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export function CaseModeToggle({ mode, setMode }: CaseModeToggleProps) {
  const modes: { id: Mode; label: string }[] = [
    { id: "normal", label: "Normal" },
    { id: "scale", label: "Scale (10x)" },
    { id: "incident", label: "Incident" },
  ];

  return (
    <div className="flex bg-secondary/50 p-1 rounded-lg border border-border/50 backdrop-blur-sm w-fit">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          aria-pressed={mode === m.id}
          className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            mode === m.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {mode === m.id && (
            <motion.div
              layoutId="mode-highlight"
              className={`absolute inset-0 rounded-md shadow-sm ${
                mode === "incident" ? "bg-destructive" : "bg-primary"
              }`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
