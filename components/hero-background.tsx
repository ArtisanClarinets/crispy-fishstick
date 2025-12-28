"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { MouseEvent, useMemo, useState } from "react";

type Trace = { id: string; label: string; d: string };

const TRACES: Trace[] = [
  {
    id: "auth",
    label: "auth",
    d: "M 80 240 C 200 130, 260 140, 360 80 S 520 10, 640 120",
  },
  {
    id: "billing",
    label: "billing",
    d: "M 120 300 C 220 260, 260 280, 360 260 S 520 240, 700 320",
  },
  {
    id: "sync",
    label: "sync",
    d: "M 60 160 C 160 220, 260 240, 380 200 S 560 110, 740 180",
  },
  {
    id: "admin",
    label: "admin",
    d: "M 140 110 C 240 70, 320 80, 420 120 S 600 220, 720 90",
  },
];

export function HeroBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [active, setActive] = useState<string | null>(null);

  const tooltip = useMotionTemplate`translate(${mouseX}px, ${mouseY}px)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  // Stagger trace animations slightly
  const traceTimings = useMemo(
    () =>
      TRACES.reduce<Record<string, { dur: number; delay: number }>>((acc, t, i) => {
        acc[t.id] = { dur: 2.2 + i * 0.35, delay: i * 0.15 };
        return acc;
      }, {}),
    []
  );

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Base Precision Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[size:44px_44px]
          [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_65%,transparent_100%)]
          opacity-35
        "
      />

      {/* Mouse follower beam */}
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--primary) / 0.18),
              transparent 78%
            )
          `,
          opacity: 0.0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Ambient system pulse (subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-primary/5 blur-[130px] mix-blend-screen animate-pulse [animation-duration:4200ms]" />

      {/* Trace overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_100%)]">
        <svg
          className="absolute inset-0 w-full h-full opacity-70"
          viewBox="0 0 800 420"
          preserveAspectRatio="xMidYMin slice"
        >
          {/* faint “nodes” */}
          <g opacity="0.35">
            {[
              [120, 120],
              [220, 260],
              [420, 130],
              [560, 240],
              [700, 160],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="2.4" fill="currentColor" className="text-primary/60" />
            ))}
          </g>

          {/* animated traces */}
          {TRACES.map((t) => {
            const timing = traceTimings[t.id];
            const isActive = active === t.id;

            return (
              <g key={t.id}>
                {/* base faint line */}
                <path
                  d={t.d}
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/25"
                  strokeWidth={1.2}
                />

                {/* animated “data” dash */}
                <motion.path
                  d={t.d}
                  fill="none"
                  stroke="currentColor"
                  className={isActive ? "text-primary/90" : "text-primary/55"}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  strokeLinecap="round"
                  strokeDasharray="18 14"
                  initial={{ strokeDashoffset: 0, opacity: 0.65 }}
                  animate={{
                    strokeDashoffset: [-64, 0],
                    opacity: isActive ? 1 : 0.72,
                  }}
                  transition={{
                    duration: timing.dur,
                    delay: timing.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  onMouseEnter={() => setActive(t.id)}
                  onMouseLeave={() => setActive(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip (appears only when hovering a trace) */}
        <motion.div
          className={[
            "pointer-events-none absolute left-0 top-0",
            "rounded-full border border-white/10 bg-background/70 backdrop-blur-md",
            "px-3 py-1 text-xs font-medium text-foreground/90 shadow-sm",
            active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            transform: tooltip,
            // offset tooltip from cursor a bit
            marginLeft: 14,
            marginTop: 14,
          }}
          transition={{ duration: 0.15 }}
        >
          {active ? `${active.toUpperCase()} ROUTE` : ""}
        </motion.div>
      </div>
    </div>
  );
}
