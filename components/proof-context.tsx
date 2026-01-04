"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  type BuildProof,
  type HeaderStatus,
  PROOF_HEADERS,
  loadProofSnapshot,
  saveProofSnapshot,
} from "@/lib/proof";

const FALLBACK_BUILD: BuildProof = {
  commit: "local-dev",
  builtAt: "local",
  generated: false,
  gatesConfigured: ["Local build"],
};

type ProofContextValue = {
  headers: HeaderStatus[];
  buildProof: BuildProof;
  lastAuditAt: string | null;
  isRunning: boolean;
  runAudit: () => Promise<void>;
};

const ProofContext = createContext<ProofContextValue | null>(null);

export function ProofProvider({ children }: { children: React.ReactNode }) {
  const [headers, setHeaders] = useState<HeaderStatus[]>(
    PROOF_HEADERS.map((header) => ({
      name: header.name,
      key: header.key,
      value: null,
      ok: false,
    }))
  );
  const [buildProof, setBuildProof] = useState<BuildProof>(FALLBACK_BUILD);
  const [lastAuditAt, setLastAuditAt] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Load snapshot on mount
  useEffect(() => {
    const snapshot = loadProofSnapshot();
    if (snapshot) {
      setHeaders(snapshot.headers);
      if (snapshot.buildProof) {
        setBuildProof(snapshot.buildProof);
      }
      setLastAuditAt(snapshot.lastAuditAt ?? null);
    }
  }, []);

  const runAudit = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      const [headersResponse, buildResponse] = await Promise.all([
        fetch("/api/proof/headers", { cache: "no-store" }),
        fetch("/proof/build.json", { cache: "no-store" }),
      ]);

      // Re-map headers manually here since we are in the context
      const headerResults = headersResponse.ok
        ? PROOF_HEADERS.map((header) => {
            const value = headersResponse.headers.get(header.key);
            return {
              name: header.name,
              key: header.key,
              value,
              ok: Boolean(value),
            };
          })
        : PROOF_HEADERS.map((header) => ({
            name: header.name,
            key: header.key,
            value: null,
            ok: false,
          }));

      let buildData = FALLBACK_BUILD;

      if (buildResponse.ok) {
        const data = (await buildResponse.json()) as BuildProof;
        buildData = data;
      }

      const auditTimestamp = new Date().toISOString();
      setHeaders(headerResults);
      setBuildProof(buildData);
      setLastAuditAt(auditTimestamp);

      saveProofSnapshot({
        headers: headerResults,
        buildProof: buildData,
        lastAuditAt: auditTimestamp,
      });
    } catch {
      // Keep previous state on error or reset?
      // For now, let's just not update or maybe mark as error?
      // We will leave the state as is to prevent flashing "0"
    } finally {
      setIsRunning(false);
    }
  }, [isRunning]);

  // Run audit once on mount (or rely on snapshot + manual refresh?)
  // The original components ran it on mount.
  useEffect(() => {
    // Only run if we don't have a fresh snapshot? Or always?
    // Let's run it always to be "live", but debounce/check if running
    void runAudit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProofContext.Provider
      value={{
        headers,
        buildProof,
        lastAuditAt,
        isRunning,
        runAudit,
      }}
    >
      {children}
    </ProofContext.Provider>
  );
}

export function useProof() {
  const context = useContext(ProofContext);
  if (!context) {
    throw new Error("useProof must be used within a ProofProvider");
  }
  return context;
}
