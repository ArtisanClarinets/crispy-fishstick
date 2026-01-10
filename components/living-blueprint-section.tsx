"use client";

import * as React from "react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const SplineBlueprintCanvas = dynamic(
  () => import("@/components/spline-blueprint-canvas").then((mod) => mod.SplineBlueprintCanvas),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

type Step = {
  id: string;
  title: string;
  copy: string;
  phase: number; // 1..7
};

const STEPS: ReadonlyArray<Step> = [
  {
    id: "diagnose",
    title: "Diagnose",
    copy: "Locate the leaks. Establish the constraints. Define what ‘good’ means before we touch a line of production code.",
    phase: 1,
  },
  {
    id: "plan",
    title: "Plan",
    copy: "Turn ambiguity into a blueprint: scope, sequencing, and measurable outcomes — with zero hand-waving.",
    phase: 2,
  },
  {
    id: "design",
    title: "Design",
    copy: "Design the system, not just the pixels. Components, states, and a UI language that scales.",
    phase: 3,
  },
  {
    id: "build",
    title: "Build",
    copy: "Ship the core with discipline: performance budgets, accessibility baselines, and predictable delivery.",
    phase: 4,
  },
  {
    id: "test",
    title: "Test",
    copy: "Pressure-test the product across devices and edge cases so launch day feels boring — in a good way.",
    phase: 5,
  },
  {
    id: "launch",
    title: "Launch",
    copy: "Deploy with confidence: monitoring, rollback paths, and proof that the new system is behaving.",
    phase: 6,
  },
  {
    id: "support",
    title: "Support",
    copy: "Hand-off that sticks: documentation, training, and a support lane that keeps systems healthy.",
    phase: 7,
  },
];

export function LivingBlueprintSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // We want the total scroll distance to accommodate all steps.
    // 7 steps * 100vh = 700vh roughly, plus some buffer.
    // The spec says "Section height: ~400vh (tunable)".
    // Let's try 500% to ensure enough scroll room for 7 items.
    
    const mm = gsap.matchMedia();
    
    // Desktop: Sticky Scroll
    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom", 
        scrub: 0.5, // smooth scrubbing
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          // Map progress 0..1 to phases 0..7
          // We have 7 steps, but phase 0 is the start.
          // Let's divide the progress into 7 segments.
          const rawPhase = p * 7;
          setPhase(Math.min(Math.round(rawPhase), 7));
        },
      });
      return () => trigger.kill();
    });

    // Mobile: Just track progress for simpler effects if needed
    mm.add("(max-width: 1023px)", () => {
       const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
             // Mobile progress logic if needed
             setProgress(self.progress);
        }
      });
      return () => trigger.kill();
    });

  }, { scope: containerRef });

  return (
    <section
      id="living-blueprint"
      ref={containerRef}
      className="relative w-full bg-background"
      data-phase={phase}
      data-hydrated={hydrated}
    >
      {/* DESKTOP LAYOUT (lg+) */}
      <div className="hidden lg:flex flex-row">
        {/* LEFT: Sticky Canvas */}
        <div 
          className="w-1/2 h-screen sticky top-0 left-0 overflow-hidden border-r border-border/10"
          data-testid="living-blueprint-visual"
        >
          <div className="absolute inset-0 bg-muted/5">
             <SplineBlueprintCanvas 
                phase={phase} 
                progress={progress} 
                className="w-full h-full"
             />
          </div>
          {/* Overlay info */}
          <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
             <div className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-1">
               System State
             </div>
             <div className="text-xl font-medium text-foreground/80">
               {phase === 0 ? "Initializing..." : STEPS[phase - 1]?.title || "Complete"}
             </div>
          </div>
        </div>

        {/* RIGHT: Scrollable Content Steps */}
        <div className="w-1/2 relative">
          {/* Spacer for Phase 0 (Start) */}
          <div className="h-[50vh] flex items-center justify-center p-12 border-b border-dashed border-border/10">
             <div className="text-center max-w-md">
               <h2 className="text-3xl font-bold tracking-tighter mb-4 text-muted-foreground/50">
                 The Blueprint
               </h2>
               <p className="text-muted-foreground/70">
                 Scroll to inspect the assembly process.
               </p>
             </div>
          </div>

          {STEPS.map((step) => {
            const isActive = phase === step.phase;
            return (
              <div
                key={step.id}
                className="h-[100vh] flex flex-col justify-center p-16 border-l border-border/5"
              >
                <div className={cn(
                    "transition-all duration-500 ease-out transform",
                    isActive ? "opacity-100 translate-x-0" : "opacity-30 translate-x-4"
                )}>
                    <span className="text-xs font-mono text-primary/80 mb-4 block">
                        0{step.phase}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        {step.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                        {step.copy}
                    </p>
                </div>
              </div>
            );
          })}
          
          {/* Spacer for end */}
           <div className="h-[50vh]" />
        </div>
      </div>

      {/* MOBILE LAYOUT (sm/md) - Fallback */}
      <div className="lg:hidden flex flex-col">
        {/* Mobile Header / Preview */}
        <div className="h-[50vh] w-full relative bg-muted/5 overflow-hidden">
           <SplineBlueprintCanvas 
              phase={3} // Fixed interesting phase for mobile static/simple view
              progress={0.5} 
              className="w-full h-full opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
           <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl font-bold tracking-tight mb-2">The Blueprint</h2>
              <p className="text-sm text-muted-foreground">
                Our proven process for engineering excellence.
              </p>
           </div>
        </div>

        {/* Mobile Steps */}
        <div className="px-6 py-12 space-y-16">
          {STEPS.map((step) => (
            <div key={step.id} className="relative pl-8 border-l-2 border-border/30">
               <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary/50" />
               <div className="mb-2 text-xs font-mono text-primary uppercase tracking-wider">
                  Phase 0{step.phase}
               </div>
               <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
               <p className="text-muted-foreground leading-relaxed">
                  {step.copy}
               </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
