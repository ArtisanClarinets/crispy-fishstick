import type { Mode } from "@/components/case-mode-toggle";

type CaseModeData = {
  kpis: Record<Mode, { label: string; value: string; desc?: string }[]>;
  failures: Record<Exclude<Mode, "normal">, string[]>;
};

export const caseModePresets: Record<
  string,
  { initialMode: Mode; data: CaseModeData }
> = {
  "shopify-admin-sync": {
    initialMode: "normal",
    data: {
      kpis: {
        normal: [
          { label: "Sync latency (P95)", value: "1.8s", desc: "Webhook + queue pipeline" },
          { label: "Queue depth", value: "120", desc: "Steady-state throughput" },
          { label: "Error rate", value: "0.02%", desc: "Auto-retry with backoff" },
        ],
        scale: [
          { label: "Sync latency (P95)", value: "2.6s", desc: "10x order volume" },
          { label: "Queue depth", value: "1,420", desc: "Burst absorption" },
          { label: "Workers online", value: "48", desc: "Autoscaled pool" },
        ],
        incident: [
          { label: "RPO", value: "0", desc: "Idempotent replays" },
          { label: "Recovery", value: "<6m", desc: "Hot standby" },
          { label: "Failed jobs", value: "0.4%", desc: "Circuit breaker engaged" },
        ],
      },
      failures: {
        scale: [
          "Rate limiter engages to prevent Shopify throttle.",
          "Queue backlog prioritized by order age.",
          "Workers autoscale to maintain P95 latency.",
        ],
        incident: [
          "Primary queue degraded; failover to standby.",
          "Replay ledger validates idempotency before retry.",
          "Alerting routes to on-call within 60 seconds.",
        ],
      },
    },
  },
};

export type CaseModePresetKey = keyof typeof caseModePresets;
