"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
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
      {/* 1. Real Text for SEO/A11y */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 pb-2">
        {text}
      </h1>

      {/* 2. Visual Overlay for Effect */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground/20 pb-2 absolute inset-0 select-none">
          {text}
        </h1>

        {/* Masked reveal of the "real" gradient text */}
        <motion.div
          className="absolute inset-0 overflow-hidden pb-2"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
            {text}
          </h1>
        </motion.div>

        {/* Measuring Line (Scan Line) */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-primary z-10"
          initial={{ left: "0%", opacity: 1 }}
          animate={{ left: "100%", opacity: [1, 1, 0] }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], times: [0, 0.9, 1] }}
        />

        {/* Caret Element */}
        {!locked && (
          <motion.div
            className="absolute bottom-1 -right-4 w-3 h-6 bg-primary"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.2, repeat: 3 }}
          />
        )}
        {locked && (
          <div className="absolute bottom-2 -right-6 w-2 h-2 bg-primary rounded-[1px]" />
        )}
      </div>

      {/* 3. Status Line */}
      <motion.div
        className="absolute -bottom-8 left-0 flex items-center gap-4 text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
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
