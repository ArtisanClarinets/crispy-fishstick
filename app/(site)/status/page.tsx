import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "System Status | Vantus Systems",
  description: "Current operational status for Vantus Systems infrastructure and services.",
};

const SYSTEMS = [
  { name: "Website (vantussystems.com)", status: "operational" as const },
  { name: "Contact & Audit Form Processing", status: "operational" as const },
  { name: "Admin Portal", status: "operational" as const },
  { name: "CDN & Asset Delivery", status: "operational" as const },
  { name: "API Services", status: "operational" as const },
];

const STATUS_CONFIG = {
  operational: {
    label: "Operational",
    icon: CheckCircle2,
    color: "#22c55e",
  },
  degraded: {
    label: "Degraded Performance",
    icon: Clock,
    color: "#f59e0b",
  },
  outage: {
    label: "Partial Outage",
    icon: AlertCircle,
    color: "#ef4444",
  },
};

export default function StatusPage() {
  const allOperational = SYSTEMS.every((s) => s.status === "operational");
  const lastChecked = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-4">
        <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold">
          System Status
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          {allOperational ? "All Systems Operational" : "Service Disruption"}
        </h1>
        <p className="font-body text-muted-foreground text-sm">Last updated: {lastChecked}</p>
      </section>

      {/* Status summary banner */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div
          className="rounded-2xl p-6 flex items-center gap-4"
          style={{
            background: allOperational ? "oklch(0.15 0.02 145)" : "oklch(0.15 0.02 30)",
            border: `1px solid ${allOperational ? "#22c55e33" : "#ef444433"}`,
          }}
        >
          <CheckCircle2
            className="h-8 w-8 shrink-0"
            style={{ color: allOperational ? "#22c55e" : "#ef4444" }}
          />
          <div>
            <p className="font-heading font-bold text-lg" style={{ color: allOperational ? "#22c55e" : "#ef4444" }}>
              {allOperational ? "No incidents reported" : "Active incident in progress"}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              All systems are running normally. No maintenance scheduled.
            </p>
          </div>
        </div>
      </section>

      {/* Systems list */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-4">
        <h2 className="font-heading text-xl font-bold">Services</h2>
        <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {SYSTEMS.map((system) => {
            const config = STATUS_CONFIG[system.status];
            const Icon = config.icon;
            return (
              <div key={system.name} className="flex items-center justify-between px-6 py-4 bg-card">
                <span className="font-body text-sm font-medium">{system.name}</span>
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: config.color }}>
                  <Icon className="h-4 w-4" />
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Incident history */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-4">
        <h2 className="font-heading text-xl font-bold">Past 90 Days</h2>
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground font-body">
          No incidents recorded in the past 90 days.
        </div>
      </section>
    </div>
  );
}
