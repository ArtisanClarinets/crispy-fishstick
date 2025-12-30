"use client";

import { useEffect, useState } from "react";
import { VTLink } from "@/components/vt-link";
import { cn } from "@/lib/utils";
import { getAuditStatus, loadProofSnapshot } from "@/lib/proof";
import { siteConfig } from "@/lib/site";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [proofStatus, setProofStatus] = useState<"idle" | "verified" | "degraded">("idle");
  const [proofLabel, setProofLabel] = useState("Proof Panel: Runtime Audit");

  useEffect(() => {
    const snapshot = loadProofSnapshot();
    if (!snapshot) return;
    const audit = getAuditStatus(snapshot.headers, snapshot.buildProof);
    if (audit.auditOk) {
      setProofStatus("verified");
      setProofLabel("Proof Panel: Verified");
      return;
    }
    setProofStatus("degraded");
    setProofLabel("Proof Panel: Degraded");
  }, []);

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Thompson Systems</h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              Engineering rigorous, high-trust digital systems for ambitious founders and enterprises.
              Built on principles of clarity, reliability, and performance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground/80">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <VTLink href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
                  Design Engineering
                </VTLink>
              </li>
              <li>
                <VTLink href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
                  Frontend Architecture
                </VTLink>
              </li>
              <li>
                <VTLink href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
                  Commerce Systems
                </VTLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground/80">Connect</h4>
            <div className="flex gap-4">
              {siteConfig.links.github ? (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {siteConfig.links.linkedin ? (
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : null}
              {siteConfig.links.twitter ? (
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground">
              {siteConfig.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground font-medium">
            &copy; {currentYear} {siteConfig.company}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <VTLink href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</VTLink>
            <VTLink href="/terms" className="hover:text-foreground transition-colors">Terms of Service</VTLink>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                proofStatus === "verified" ? "bg-emerald-500" : proofStatus === "degraded" ? "bg-amber-500" : "bg-primary/60"
              )}
            ></span>
            <span>{proofLabel}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
