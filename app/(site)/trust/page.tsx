import { Shield, CheckCircle, AlertTriangle, Lock, FileText } from "lucide-react";
import { Metadata } from "next";
import { ProofPanel } from "@/components/proof-panel";
import { VTLink } from "@/components/vt-link";
import { SplitText } from "@/components/react-bits/SplitText";
import { ScrambleText } from "@/components/scramble-text";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Trust Center | Vantus Systems",
  description: "How I protect your IP, ensure predictability, and define success. No black boxes.",
};

const definitionOfDone = [
  {
    title: "Performance Baseline",
    detail: "Recorded Lighthouse report delivered with trace + budgets.",
    proof: "Proof Panel runtime scan + exported Lighthouse artifacts.",
  },
  {
    title: "Accessibility Review",
    detail: "WCAG AA checklist with screen reader passes and keyboard map.",
    proof: "Annotated audit PDF + remediation checklist.",
  },
  {
    title: "Analytics Verification",
    detail: "Event map validated against live payloads.",
    proof: "Proof Panel headers + analytics payload log.",
  },
  {
    title: "SEO Foundation",
    detail: "Metadata, sitemap, and structured data verified.",
    proof: "Snapshot of tags + sitemap artifact.",
  },
  {
    title: "Handoff Package",
    detail: "Runbook, infrastructure notes, and ownership transfer.",
    proof: "Signed handoff checklist.",
  },
  {
    title: "Security Headers",
    detail: "CSP, HSTS, referrer, and content-type protections confirmed.",
    proof: "Proof Panel header inspection.",
  },
];

export default function TrustCenterPage() {
  return (
    <div className="container max-w-4xl py-24 space-y-24" data-system-tone="default">
      {/* Header */}
      <section className="space-y-6 text-center">
        <Reveal>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
            <Shield className="w-4 h-4 mr-2" />
            <ScrambleText text="The Anti-Scam Shield" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SplitText
            text="Trust Center"
            className="text-4xl md:text-6xl font-bold tracking-tight text-balance"
            delay={0.2}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            The software industry is full of vague promises and vendor lock-in.
            Here is exactly how I protect your business, your budget, and your sanity.
          </p>
        </Reveal>
      </section>

      {/* 1. Ownership */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Lock className="w-8 h-8 text-primary" />
          What You Own
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
            <h3 className="font-semibold text-lg mb-2">Total IP Ownership</h3>
            <p className="text-muted-foreground">
              You keep your domain, accounts, assets, and code. I build in your repositories (or transfer them immediately). You are never locked out of your own business.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
            <h3 className="font-semibold text-lg mb-2">Zero Vendor Lock-in</h3>
            <p className="text-muted-foreground">
              I use standard, widely-supported technologies (React, Next.js, Frappe). Any competent engineer can pick up where I leave off. No proprietary &quot;black box&quot; CMS.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Predictability */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          How Projects Stay Predictable
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Clear Phases & Deliverables</h4>
              <p className="text-muted-foreground">Every project follows the Build Plan. You know exactly what is being delivered at each stage, from design mockups to the final line of code.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Written Scope & Change Control</h4>
              <p className="text-muted-foreground">We agree on a scope in writing. If you want to add more, we pause, estimate the new work, and you approve it before I start. No surprise bills.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Weekly Evidence Drops</h4>
              <p className="text-muted-foreground">You get a plain-English status update every week with a link to the current audit results, artifacts, and the next milestone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Definition of Done */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-primary" />
          Definition of Done (What You Receive)
        </h2>
        <p className="text-muted-foreground">
          Every item below maps to a measurable artifact. Nothing is marked &quot;done&quot; without the proof.
          See the live evidence in the <VTLink href="/#proof" className="underline">Proof Panel</VTLink> and delivered reports.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {definitionOfDone.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 p-4 border border-border/50 rounded-lg bg-background/60">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{item.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Proof: {item.proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6" id="trust-proof">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Runtime Proof Panel</p>
          <h2 className="text-3xl font-bold">Live verification you can inspect.</h2>
          <p className="text-muted-foreground">
            This panel validates the real response headers, confirms the build fingerprint, and
            reports the client runtime scan that backs the Definition of Done above.
          </p>
        </div>
        <ProofPanel />
      </section>

      {/* 4. Red Flags */}
      <section className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-red-500">
          <AlertTriangle className="w-6 h-6" />
          Red Flags to Watch For
        </h2>
        <p className="text-foreground/80">
          Whether you hire me or someone else, please be careful if you see these signs:
        </p>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="text-red-500 font-bold">•</span>
            <span className="text-foreground/80"><strong>No Admin Access:</strong> If a vendor won&apos;t give you full admin access to your own site or hosting, run. They are holding you hostage.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold">•</span>
            <span className="text-foreground/80"><strong>Vague Pricing:</strong> &quot;It depends&quot; is fine for an estimate, but you need a fixed project fee or a clear hourly rate with a cap.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold">•</span>
            <span className="text-foreground/80"><strong>No Deliverables List:</strong> If they can&apos;t list exactly what you are paying for (e.g., &quot;Home page, About page, Contact form&quot;), you will likely be disappointed.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
