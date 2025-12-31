"use client";

import * as React from "react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { BuildPlanModule } from "@/components/build-plan-module";
import { SplineBlueprintCanvas } from "@/components/spline-blueprint-canvas";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const nextPhase = Math.round(p * 7);
        setPhase(Math.min(nextPhase, 7));
      },
    });

    return () => {
      trigger.kill();
    };
  }, { scope: sectionRef });

  const activeStepIndex = Math.max(0, phase - 1);

  return (
    <section
      id="living-blueprint"
      ref={sectionRef}
      className="relative h-screen w-full bg-background"
      data-hud-section="Blueprint"
    >
      <div className="absolute inset-0 container flex flex-col lg:flex-row items-center justify-center">
        {/* LEFT: 3D Canvas */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full flex items-center justify-center">
          <div className="w-full h-full max-w-[600px] max-h-[600px]">
            <SplineBlueprintCanvas phase={phase} progress={progress} />
          </div>
        </div>

        {/* RIGHT: Content Steps */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex items-center justify-center px-6">
          <div className="relative w-full max-w-md">
            {STEPS.map((step, index) => {
              const isActive = index === activeStepIndex && phase > 0;
              return (
                <div
                  key={step.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-out",
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4 pointer-events-none"
                  )}
                >
                  <div className="text-sm font-mono text-primary mb-2">
                    PHASE 0{step.phase}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.copy}
                  </p>
                </div>
              );
            })}
            
            {phase === 0 && (
              <div className="transition-all duration-500">
                <h3 className="text-3xl font-bold mb-4">The Process</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Scroll to explore the 7 phases of our engineering process.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear" 
          style={{ width: `${progress * 100}%` }} 
        />
      </div>
    </section>
  );
}
