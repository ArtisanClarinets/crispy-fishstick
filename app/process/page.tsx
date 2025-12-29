import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { VTLink } from "@/components/vt-link";

export const metadata: Metadata = {
  title: "Process",
  description: "My process for delivering high-trust digital products with measurable proof.",
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "I start by mapping your goals, constraints, and current risks. This becomes the source of truth for scope and success criteria.",
    deliverables: [
      "Project brief + success metrics",
      "Risk register",
      "Scope boundaries",
      "Decision log",
    ],
    proof: "Signed brief + scope baseline",
  },
  {
    number: "02",
    title: "Strategy & Planning",
    description:
      "I translate requirements into a build plan with measurable checkpoints and proof artifacts.",
    deliverables: [
      "Architecture sketch",
      "Build plan with gates",
      "Milestone calendar",
      "Evidence checklist",
    ],
    proof: "Build Plan module + gate checklist",
  },
  {
    number: "03",
    title: "Design",
    description:
      "I design the system and interface together so visuals and engineering match from day one.",
    deliverables: [
      "Component spec",
      "Interaction inventory",
      "Design tokens",
      "Accessibility pre-check",
    ],
    proof: "Component spec PDF + token export",
  },
  {
    number: "04",
    title: "Development",
    description:
      "I build in small, auditable increments with runtime checks and measurable budgets.",
    deliverables: [
      "Typed codebase",
      "Performance budgets",
      "Instrumentation hooks",
      "Security header config",
    ],
    proof: "Proof Panel runtime scan",
  },
  {
    number: "05",
    title: "Testing & Refinement",
    description:
      "I validate the build against the evidence checklist and record the results.",
    deliverables: [
      "Audit report",
      "Bug/edge-case ledger",
      "Accessibility QA",
      "Release checklist",
    ],
    proof: "Audit report + rerun log",
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "I ship with a handoff plan, monitoring, and a documented exit route.",
    deliverables: [
      "Launch runbook",
      "Rollback plan",
      "Ownership transfer",
      "Post-launch review",
    ],
    proof: "Signed launch checklist + handoff docs",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" data-system-tone="default">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Process</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent, evidence-first workflow. Every phase ships with artifacts that prove what was done.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Number */}
              <div className="md:col-span-2">
                <span className="text-6xl font-bold text-muted-foreground/20">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10">
                <div className="glass-card surface-rim rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-muted-foreground mb-6">
                    {step.description}
                  </p>

                  <div>
                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">
                      Deliverables
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-4">
                      Proof: {step.proof}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let&apos;s define your scope and build the proof trail from day one.
          </p>
          <VTLink
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
          >
            Start a Project
          </VTLink>
        </div>
      </div>
    </div>
  );
}
