import type { Metadata } from "next";
import { Code, Layers, ShieldCheck, Database } from "lucide-react";
import { VTLink } from "@/components/vt-link";

export const metadata: Metadata = {
  title: "Services",
  description: "Specialized engineering and design services for high-stakes digital products.",
};

const services = [
  {
    icon: Code,
    title: "Design Engineering",
    description:
      "Production-ready UI systems built from a documented component spec, not a pitch deck.",
    features: [
      "Component specification & naming map",
      "Token inventory + usage rules",
      "Interaction matrix (states + motion)",
      "Accessibility checklist with findings",
      "Implementation diff log",
    ],
  },
  {
    icon: Layers,
    title: "Frontend Systems",
    description:
      "A scalable front-end architecture with measurable budgets and proof artifacts.",
    features: [
      "Performance budget doc (per route)",
      "Data flow diagrams + state boundaries",
      "Typed API contracts",
      "Caching strategy memo",
      "Implementation runbook",
    ],
  },
  {
    icon: Database,
    title: "Commerce Integrations",
    description:
      "High-volume synchronization engines with replayable audit logs.",
    features: [
      "Sync ledger schema + replay plan",
      "Mapping rules (CSV/YAML)",
      "Queue/backpressure settings",
      "Error taxonomy with remediation",
      "Observed throughput report",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Audits & Rescue",
    description:
      "A forensic audit that shows exactly what is broken and how it was verified.",
    features: [
      "Header inspection log",
      "Runtime request inventory",
      "Accessibility findings with fixes",
      "Security risk matrix",
      "Priority remediation backlog",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Technical Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            I don&apos;t just write code; I engineer systems. Every engagement ships with evidence: audit logs, specs, and measurable outputs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group glass-card surface-rim rounded-3xl p-8 sm:p-10 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary group-hover:bg-foreground/5 transition-colors">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm font-medium flex items-center gap-3 text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="border-t border-border pt-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">
              Have a specific challenge?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I take on custom engineering work that doesn&apos;t fit neatly into a bucket.
              If you need a reliable partner to solve a hard problem, let&apos;s talk.
            </p>
            <VTLink
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-medium text-lg"
            >
              Book a Consultation
            </VTLink>
          </div>
        </div>
      </div>
    </div>
  );
}
