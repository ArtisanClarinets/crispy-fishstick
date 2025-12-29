"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { MouseEvent, useRef, useState } from "react";

type Trace = { id: string; label: string; d: string; speed: number; delay: number };

const TRACES: Trace[] = [
  {
    id: "auth",
    label: "auth",
    d: "M 80 240 C 200 130, 260 140, 360 80 S 520 10, 640 120",
    speed: 30,
    delay: 0,
  },
  {
    id: "billing",
    label: "billing",
    d: "M 120 300 C 220 260, 260 280, 360 260 S 520 240, 700 320",
    speed: 25,
    delay: 0.2,
  },
  {
    id: "sync",
    label: "sync",
    d: "M 60 160 C 160 220, 260 240, 380 200 S 560 110, 740 180",
    speed: 35,
    delay: 0.1,
  },
  {
    id: "admin",
    label: "admin",
    d: "M 140 110 C 240 70, 320 80, 420 120 S 600 220, 720 90",
    speed: 20,
    delay: 0.3,
  },
  // Extended traces for scroll depth
  {
    id: "db",
    label: "database",
    d: "M 100 400 C 250 450, 400 350, 550 450 S 750 400, 850 500",
    speed: 22,
    delay: 0.4,
  },
  {
    id: "cache",
    label: "cache",
    d: "M -50 350 C 100 300, 300 400, 500 320 S 700 450, 900 380",
    speed: 28,
    delay: 0.5,
  }
];

export function HeroBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [active, setActive] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  const tooltip = useMotionTemplate`translate(${mouseX}px, ${mouseY}px)`;

  // Base time-based offset for continuous animation
  const timeOffset = useMotionValue(0);
  useAnimationFrame((t) => {
    if (!prefersReducedMotion && isInView) {
      timeOffset.set(t / 1000);
    }
  });

  const { scrollY } = useScroll();
  
  // Parallax for the grid and background elements
  const gridY = useTransform(scrollY, [0, 1000], [0, 200]);
  const ambientY = useTransform(scrollY, [0, 1000], [0, 150]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Base Precision Grid */}
      <motion.div
        style={{ y: gridY }}
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
        animate={prefersReducedMotion ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      />

      {/* Ambient system pulse (subtle) */}
      <motion.div 
        style={{ y: ambientY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-primary/5 blur-[130px] mix-blend-screen animate-pulse [animation-duration:4200ms]" 
      />

      {/* Trace overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_100%)]">
        <svg
          className="absolute inset-0 w-full h-full opacity-70"
          viewBox="0 0 800 600"
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
              [300, 450],
              [600, 380],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="2.4" fill="currentColor" className="text-primary/60" />
            ))}
          </g>

          {/* animated traces */}
          {TRACES.map((t) => (
            <TracePath 
              key={t.id} 
              trace={t} 
              timeOffset={timeOffset} 
              scrollY={scrollY}
              isActive={active === t.id}
              onActive={() => setActive(t.id)}
              onInactive={() => setActive(null)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
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
          transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
        >
          {active ? `${active.toUpperCase()} ROUTE` : ""}
        </motion.div>
      </div>
    </div>
  );
}

function TracePath({ 
  trace, 
  timeOffset, 
  scrollY, 
  isActive, 
  onActive, 
  onInactive,
  prefersReducedMotion,
}: { 
  trace: Trace; 
  timeOffset: any; 
  scrollY: any; 
  isActive: boolean;
  onActive: () => void;
  onInactive: () => void;
  prefersReducedMotion: boolean;
}) {
  // Combine time and scroll for the dash offset
  // This ensures it animates even if Framer Motion's 'animate' prop is suppressed
  const dashOffset = useTransform([timeOffset, scrollY], ([t, s]) => {
    if (prefersReducedMotion) {
      return 0;
    }
    return -(t as number * trace.speed) - (s as number * 0.4);
  });

  // Subtle parallax/morph effect on scroll
  const yOffset = useTransform(scrollY, [0, 1000], [
    0,
    prefersReducedMotion ? 0 : trace.id.length % 2 === 0 ? -30 : 30,
  ]);

  return (
    <g>
      {/* base faint line */}
      <motion.path
        d={trace.d}
        style={{ y: yOffset }}
        fill="none"
        stroke="currentColor"
        className="text-primary/25"
        strokeWidth={1.2}
      />

      {/* animated “data” dash */}
      <motion.path
        d={trace.d}
        style={{ 
          strokeDashoffset: dashOffset,
          y: yOffset,
          opacity: isActive ? 1 : 0.72 
        }}
        fill="none"
        stroke="currentColor"
        className={isActive ? "text-primary/90" : "text-primary/55"}
        strokeWidth={isActive ? 2.2 : 1.7}
        strokeLinecap="round"
        strokeDasharray="18 14"
        onMouseEnter={onActive}
        onMouseLeave={onInactive}
      />
    </g>
  );
}
