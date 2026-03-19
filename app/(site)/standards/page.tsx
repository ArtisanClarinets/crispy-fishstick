import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Code2, Gauge, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Standards | Vantus Systems",
  description:
    "The non-negotiable engineering standards applied to every Vantus project. Performance, security, accessibility, and handoff quality gates.",
};

const STANDARDS = [
  {
    icon: Gauge,
    title: "Performance",
    code: "PERF",
    color: "var(--vantus-sky)",
    smb: "A fast site keeps visitors from leaving before they contact you — and Google ranks faster sites higher.",
    items: [
      "Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms — verified before delivery",
      "Images: Next.js Image component with explicit width/height on all above-fold assets",
      "JavaScript: route-level code splitting, no blocking scripts in <head>",
      "No third-party analytics or tracking scripts loaded without explicit client approval",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    code: "SEC",
    color: "var(--highlight-gold)",
    smb: "Your site and your customers' data are protected from the attacks that take down small business sites every day.",
    items: [
      "Strict Content Security Policy on every deployment",
      "CSRF protection on all mutation endpoints",
      "Environment variables: secrets never committed to source control",
      "Dependency audit on every build; zero known-vulnerable packages at handoff",
      "HTTPS enforced with HSTS header; no mixed-content warnings",
    ],
  },
  {
    icon: Code2,
    title: "Code Quality",
    code: "CODE",
    color: "var(--vantus-sky)",
    smb: "Clean code means the next developer you hire can understand and extend your site without starting over.",
    items: [
      "TypeScript strict mode: no use of any without documented justification",
      "ESLint: zero warnings at handoff, not just zero errors",
      "Unit tests on all business logic; integration tests on all form flows",
      "Consistent component structure documented in onboarding reference",
    ],
  },
  {
    icon: FileText,
    title: "Accessibility",
    code: "A11Y",
    color: "var(--highlight-gold)",
    smb: "An accessible site reaches every potential customer — including the 1 in 4 adults who have a disability.",
    items: [
      "WCAG 2.1 AA compliance verified with axe-core automated scan + manual keyboard review",
      "All interactive elements reachable by keyboard with visible focus ring",
      "Semantic HTML: headings form a correct document outline on every page",
      "All images have descriptive alt text; decorative images use empty alt attribute",
    ],
  },
];

export default function StandardsPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-4">
        <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
          Engineering Standards
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          The rules we{" "}<span className="text-gradient-brand">don&apos;t bend.</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
          Every project ships against the same checklist. Not aspirational targets — acceptance criteria.
          If a criterion isn&apos;t met, we fix it before handing anything over.
        </p>
      </section>

      {/* Standards grid */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {STANDARDS.map(({ icon: Icon, title, code, color, smb, items }) => {
            const isSky = color === "var(--vantus-sky)";
            const iconBg = isSky ? "icon-bg-sky" : "icon-bg-gold";
            const textColor = isSky ? "text-sky" : "text-gold";
            return (
            <div key={code} className="rounded-2xl border border-border bg-card p-8 space-y-5 card-glow">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Icon className={`h-5 w-5 ${textColor}`} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg">{title}</h2>
                  <span className="text-xs font-mono text-muted-foreground">{code}</span>
                </div>
              </div>
              <p className={`font-body text-sm leading-relaxed ${textColor}`}>
                {smb}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${textColor}`} />
                    <span className="font-body text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </section>

      {/* Handoff section */}
      <section className="bg-[var(--vantus-navy)] text-white py-16 px-4 md:px-6 lg:px-8 glow-sky">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              You get the code. All of it.
            </h2>
            <p className="font-body text-white/70 leading-relaxed">
              Every project closes with a full handoff package. Source code, login credentials,
              deployment runbook, and a recorded walkthrough. You own it outright — no dependency on us.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Full source repository transfer",
              "Environment variable manifest and secrets rotation guide",
              "Deployment runbook with rollback procedure",
              "Component documentation and design tokens",
              "90-day post-launch support window",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--vantus-sky)] shrink-0" />
                <span className="font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">
          Hold us to these standards.
        </h2>
        <p className="font-body text-muted-foreground">
          Every proposal includes the quality gate checklist. Miss a criterion and we fix it —
          no charge, no debate.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold btn-sky-glow">
          <Link href="/start-audit">Start Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
