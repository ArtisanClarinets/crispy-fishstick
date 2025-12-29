"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "diagnose",
    label: "Diagnose",
    description: "Identify conversion leaks, technical issues, and quick wins.",
    deliverables: ["Conversion leaks report", "Technical audit", "Quick win list"],
    evidence: ["Audit checklist", "Risk register", "Priority fixes"],
  },
  {
    id: "plan",
    label: "Plan",
    description: "Map out the site structure, goals, and content strategy.",
    deliverables: ["Sitemap", "Page goals definitions", "Content plan"],
    evidence: ["Scope doc", "Milestone calendar", "Success metrics"],
  },
  {
    id: "design",
    label: "Design",
    description: "Create the visual structure and component system.",
    deliverables: ["Wireframes", "Component system", "High-fidelity mocks"],
    evidence: ["Component spec", "Token inventory", "Interaction map"],
  },
  {
    id: "build",
    label: "Build",
    description: "Develop the site with a focus on performance and accessibility.",
    deliverables: ["Performance optimized code", "SEO foundation", "Accessibility baseline"],
    evidence: ["Performance budget", "Header checklist", "Proof Panel scan"],
  },
  {
    id: "test",
    label: "Test",
    description: "Rigorous QA to ensure everything works across devices.",
    deliverables: ["QA checklist", "Cross-device verification", "Analytics verification"],
    evidence: ["Audit report", "Bug ledger", "Rerun log"],
  },
  {
    id: "launch",
    label: "Launch",
    description: "Go live with confidence, ensuring no downtime or lost traffic.",
    deliverables: ["Redirect strategy", "Backups", "Uptime monitoring"],
    evidence: ["Launch checklist", "Rollback plan", "Monitoring handoff"],
  },
  {
    id: "support",
    label: "Support",
    description: "Handover and ongoing support options.",
    deliverables: ["Handover documentation", "Training session", "Optional maintenance"],
    evidence: ["Runbook", "Ownership transfer", "Support SLOs"],
  },
];

export function BuildPlanModule() {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  const activeStep = steps[activeStepIndex];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 glass-card surface-rim rounded-2xl">
      <div className="mb-8 text-center md:text-left">
        <h3 className="text-2xl font-bold tracking-tight mb-2">The Build Plan</h3>
        <p className="text-muted-foreground">
          A predictable, transparent pipeline backed by measurable evidence.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Steps List (Desktop: Left Sidebar, Mobile: Top Scroll) */}
        <div className="w-full md:w-1/3 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(index)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all min-w-[140px] md:min-w-0 text-left",
                activeStepIndex === index
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs border transition-colors",
                  activeStepIndex === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <span>{step.label}</span>
              {activeStepIndex === index && (
                <ChevronRight className="ml-auto w-4 h-4 opacity-50 hidden md:block" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 min-h-[300px] flex flex-col justify-center">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6"
          >
            <div>
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Step {activeStepIndex + 1}: {activeStep.label}
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-4">
                {activeStep.description}
              </h4>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Deliverables
              </p>
              <ul className="grid gap-3">
                {activeStep.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-border/50">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                <FileText className="h-4 w-4" /> Evidence
              </div>
              <ul className="grid gap-3">
                {activeStep.evidence.map((item) => (
                  <li key={item} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/70">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary/60" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar (Mobile only) */}
      <div className="mt-8 md:hidden h-1 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
