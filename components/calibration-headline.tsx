"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/scramble-text";
import { checksumHex } from "@/lib/cover/seed";
import {
  PROOF_HEADERS,
  type BuildProof,
  type HeaderStatus,
  getAuditStatus,
  loadProofSnapshot,
  saveProofSnapshot,
} from "@/lib/proof";

interface CalibrationHeadlineProps {
  text: string;
  className?: string;
}

export function CalibrationHeadline({ text, className }: CalibrationHeadlineProps) {
  const [locked, setLocked] = useState(false);
  const [auditLabel, setAuditLabel] = useState("AUDIT: CHECKING");
  const [buildLabel, setBuildLabel] = useState("BUILD: CHECKING");
  const prefersReducedMotion = useReducedMotion();
  const checksum = useMemo(() => checksumHex(text), [text]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLocked(true);
      return;
    }
    const timer = setTimeout(() => {
      setLocked(true);
    }, 800); // slightly longer than animation to be safe
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const snapshot = loadProofSnapshot();
    if (snapshot) {
      const audit = getAuditStatus(snapshot.headers, snapshot.buildProof);
      setAuditLabel(`AUDIT: ${audit.auditOk ? "PASS" : "WARN"}`);
      setBuildLabel(`BUILD: ${audit.buildOk ? "VERIFIED" : "UNVERIFIED"}`);
    }

    const fetchAudit = async () => {
      try {
        const [headersRes, buildRes] = await Promise.all([
          fetch("/api/proof/headers", { cache: "no-store" }),
          fetch("/proof/build.json", { cache: "no-store" }),
        ]);

        const headerResults: HeaderStatus[] = headersRes.ok
          ? PROOF_HEADERS.map((header) => {
              const value = headersRes.headers.get(header.key);
              return {
                name: header.name,
                key: header.key,
                value,
                ok: Boolean(value),
              };
            })
          : [];

        const buildData = (buildRes.ok ? ((await buildRes.json()) as BuildProof) : null) ?? null;
        const audit = getAuditStatus(headerResults, buildData);
        setAuditLabel(`AUDIT: ${audit.auditOk ? "PASS" : "WARN"}`);
        setBuildLabel(`BUILD: ${audit.buildOk ? "VERIFIED" : "UNVERIFIED"}`);

        saveProofSnapshot({
          headers: headerResults,
          buildProof: buildData,
          lastAuditAt: new Date().toISOString(),
        });
      } catch {
        setAuditLabel("AUDIT: WARN");
        setBuildLabel("BUILD: UNVERIFIED");
      }
    };

    void fetchAudit();
  }, []);

  const statusLine = (
    <div className="absolute -bottom-8 left-0 flex items-center gap-4 text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase">
      <span>CHK: {checksum}</span>
      <span className="text-primary/20">•</span>
      <span>{auditLabel}</span>
      <span className="text-primary/20">•</span>
      <span>{buildLabel}</span>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative inline-block", className)}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 pb-2">
          {text}
        </h1>
        {statusLine}
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground pb-2">
        <ScrambleText text={text} className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70" />
      </h1>

      {/* Status Line */}
      <motion.div
        className="absolute -bottom-8 left-0 flex items-center gap-4 text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      >
        <span>CHK: {checksum}</span>
        <span className="text-primary/20">•</span>
        <span>{auditLabel}</span>
        <span className="text-primary/20">•</span>
        <span>{buildLabel}</span>
      </motion.div>
    </div>
  );
}
