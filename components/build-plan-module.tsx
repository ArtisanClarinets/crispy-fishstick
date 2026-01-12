"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ChevronRight,
  Stethoscope,
  Map,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  HeartHandshake
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "diagnose",
    label: "Diagnose",
    icon: Stethoscope,
    description: "Identify conversion leaks, technical issues, and quick wins.",
    deliverables: ["Conversion leaks report", "Technical audit", "Quick win list"],
  },
  {
    id: "plan",
    label: "Plan",
    icon: Map,
    description: "Map out the site structure, goals, and content strategy.",
    deliverables: ["Sitemap", "Page goals definitions", "Content plan"],
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
    description: "Create the visual structure and component system.",
    deliverables: ["Wireframes", "Component system", "High-fidelity mocks"],
  },
  {
    id: "build",
    label: "Build",
    icon: Code2,
    description: "Develop the site with a focus on performance and accessibility.",
    deliverables: ["Performance optimized code", "SEO foundation", "Accessibility baseline"],
  },
  {
    id: "test",
    label: "Test",
    icon: ShieldCheck,
    description: "Rigorous QA to ensure everything works across devices.",
    deliverables: ["QA checklist", "Cross-device verification", "Analytics verification"],
  },
  {
    id: "launch",
    label: "Launch",
    icon: Rocket,
    description: "Go live with confidence, ensuring no downtime or lost traffic.",
    deliverables: ["Redirect strategy", "Backups", "Uptime monitoring"],
  },
  {
    id: "support",
    label: "Support",
    icon: HeartHandshake,
    description: "Handover and ongoing support options.",
    deliverables: ["Handover documentation", "Training session", "Optional maintenance"],
  },
]

export function BuildPlanModule() {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0)

  const activeStep = steps[activeStepIndex]
  const ActiveIcon = activeStep.icon

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-background/40 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden relative">
      {/* Ambient background glow for active step */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="mb-10 text-center md:text-left relative z-10">
        <h3 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">The Build Plan</h3>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A predictable, transparent pipeline. No black boxes. Just results.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative z-10">
        {/* Steps List */}
        <div className="w-full md:w-1/3 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide snap-x">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStepIndex === index

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(index)}
                className={cn(
                  "group flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-medium transition-all min-w-[200px] md:min-w-0 text-left border snap-start relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 border-primary/20 text-foreground shadow-sm"
                    : "bg-transparent border-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 shrink-0",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110"
                      : "bg-secondary/50 text-muted-foreground group-hover:bg-secondary group-hover:scale-105"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex flex-col relative">
                  <span className={cn("font-semibold text-base", isActive ? "text-foreground" : "")}>
                    {step.label}
                  </span>
                  <span className="text-xs text-muted-foreground/70 hidden md:block">
                    Step 0{index + 1}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto"
                  >
                    <ChevronRight className="w-5 h-5 text-primary opacity-80" />
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 relative min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full flex flex-col relative"
            >
              {/* Background Watermark Icon */}
              <div className="absolute right-0 top-0 -mt-4 -mr-4 text-foreground/5 pointer-events-none">
                <ActiveIcon strokeWidth={1} className="w-64 h-64 md:w-96 md:h-96" />
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
                    Step 0{activeStepIndex + 1}
                  </div>
                  <div className="h-px bg-border flex-1 opacity-50" />
                </div>

                <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {activeStep.description}
                </h4>

                <div className="space-y-6 bg-background/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" /> Deliverables
                  </p>
                  <ul className="grid gap-4 md:grid-cols-1">
                    {activeStep.deliverables.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (i * 0.1) }}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground/90 font-medium text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-8 md:hidden h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  )
}
