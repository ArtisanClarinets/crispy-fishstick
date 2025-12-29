"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Activity, Database, CheckCircle2 } from "lucide-react";

type HeaderStatus = {
  name: string;
  value: string | null;
  ok: boolean;
};

type BuildProof = {
  commit: string;
  builtAt: string;
  checks: string[];
};

type ProofMetrics = {
  thirdPartyRequests: number;
  jsRequests: number;
  jsTransferKb: number;
};

const FALLBACK_BUILD: BuildProof = {
  commit: "local-dev",
  builtAt: "local",
  checks: ["Local build"],
};

export function ProofPanel() {
  const [headers, setHeaders] = useState<HeaderStatus[]>([]);
  const [metrics, setMetrics] = useState<ProofMetrics>({
    thirdPartyRequests: 0,
    jsRequests: 0,
    jsTransferKb: 0,
  });
  const [buildProof, setBuildProof] = useState<BuildProof>(FALLBACK_BUILD);

  useEffect(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const thirdParty = resources.filter((entry) => {
      try {
        const url = new URL(entry.name);
        return url.origin !== window.location.origin;
      } catch {
        return false;
      }
    });
    const scripts = resources.filter((entry) => entry.initiatorType === "script");
    const transferSize = scripts.reduce((total, entry) => total + (entry.transferSize || 0), 0);

    setMetrics({
      thirdPartyRequests: thirdParty.length,
      jsRequests: scripts.length,
      jsTransferKb: Math.round(transferSize / 1024),
    });
  }, []);

  useEffect(() => {
    const loadHeaders = async () => {
      const response = await fetch("/api/proof/headers", { cache: "no-store" });
      const headerMap = [
        { name: "Content-Security-Policy", key: "content-security-policy" },
        { name: "Strict-Transport-Security", key: "strict-transport-security" },
        { name: "X-Content-Type-Options", key: "x-content-type-options" },
        { name: "Referrer-Policy", key: "referrer-policy" },
      ];

      const results = headerMap.map((header) => {
        const value = response.headers.get(header.key);
        return {
          name: header.name,
          value,
          ok: Boolean(value),
        };
      });

      setHeaders(results);
    };

    const loadBuild = async () => {
      try {
        const response = await fetch("/proof/build.json", { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as BuildProof;
        setBuildProof(data);
      } catch {
        setBuildProof(FALLBACK_BUILD);
      }
    };

    void loadHeaders();
    void loadBuild();
  }, []);

  const headerSummary = useMemo(
    () => headers.filter((header) => header.ok).length,
    [headers]
  );

  return (
    <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm p-8 md:p-10 shadow-xl shadow-primary/5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/80 mb-3">
            <ShieldCheck className="h-4 w-4" />
            Self-Audit Proof Panel
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Live verification, not claims.
          </h3>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            This panel runs a live audit of the page to validate security headers, dependency surface area, and build proof.
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-background/60 px-5 py-4 text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Build Proof</div>
          <div className="font-semibold text-foreground mt-2">Commit: {buildProof.commit}</div>
          <div className="text-muted-foreground">Built: {buildProof.builtAt}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border/50 bg-background/40 p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Activity className="h-4 w-4" />
            Runtime Scan
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Third-party requests</span>
              <span className="font-semibold text-foreground">{metrics.thirdPartyRequests}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>JS requests</span>
              <span className="font-semibold text-foreground">{metrics.jsRequests}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total JS transfer</span>
              <span className="font-semibold text-foreground">{metrics.jsTransferKb} KB</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-background/40 p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Database className="h-4 w-4" />
            Security Headers
          </div>
          <div className="space-y-3 text-sm">
            {headers.map((header) => (
              <div key={header.name} className="flex items-center justify-between">
                <span>{header.name}</span>
                <span className={header.ok ? "text-emerald-500 font-semibold" : "text-destructive font-semibold"}>
                  {header.ok ? "Present" : "Missing"}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground">
              {headerSummary}/{headers.length} enforced on this response.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-background/40 p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            Verification Log
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {buildProof.checks.map((check) => (
              <li key={check} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
