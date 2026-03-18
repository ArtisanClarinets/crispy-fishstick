import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Proof | Vantus Systems",
  description:
    "Real project outcomes from real clients. Engineering case studies showing performance gains, system reliability, and business results.",
};

const CASE_STUDIES = [
  {
    slug: "fintech-dashboard",
    title: "Real-Time Fintech Dashboard",
    client: "Series B Fintech",
    problem: "Existing dashboard lagged 4+ seconds under live data load, failing regulatory audit review.",
    outcome: "Sub-200ms analytics refresh under 30M events/day. SOC2 audit trail implemented.",
    tag: "Web Performance",
    timeline: "6 months",
  },
  {
    slug: "healthtech-platform",
    title: "Healthcare Operations Portal",
    client: "Regional Health Network",
    problem: "Staff were managing patient intake across three disconnected tools, causing scheduling errors.",
    outcome: "Single-system portal reduced intake errors by 78%. HIPAA-compliant data architecture.",
    tag: "Business Portal",
    timeline: "5 months",
  },
  {
    slug: "shopify-admin-sync",
    title: "Shopify Admin Sync",
    client: "Gulf Coast Retailer",
    problem: "Manual inventory reconciliation between Shopify and warehouse took 12+ hours per week.",
    outcome: "Automated sync eliminated manual reconciliation entirely. Inventory accuracy reached 99.7%.",
    tag: "Systems Integration",
    timeline: "8 weeks",
  },
];

export default function ProofPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center space-y-4">
        <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold">
          Track Record
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Engineering results.<br className="hidden md:block" /> Not promises.
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
          Each case study follows the same structure: problem, what we changed, measurable evidence, outcome.
          No stock photography. No vague qualitative wins.
        </p>
      </section>

      {/* Proof strip */}
      <section className="bg-[var(--vantus-navy)] text-white py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: BarChart3, stat: "100%", label: "Projects delivered on written scope" },
            { icon: Clock, stat: "< 5 days", label: "Typical proposal turnaround after audit" },
            { icon: CheckCircle2, stat: "0", label: "Scope disputes in client engagements" },
          ].map(({ icon: Icon, stat, label }) => (
            <div key={label} className="space-y-2">
              <Icon className="h-6 w-6 text-[var(--vantus-sky)] mx-auto" />
              <p className="font-heading text-3xl font-black text-[var(--vantus-sky)]">{stat}</p>
              <p className="font-body text-sm text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <h2 className="font-heading text-2xl font-bold">Case Studies</h2>
        <div className="space-y-6">
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.slug}
              href={`/proof/case-studies/${cs.slug}`}
              className="group flex flex-col md:flex-row gap-6 rounded-2xl border border-border bg-card p-8 hover:border-[var(--vantus-sky)] transition-colors"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{cs.tag}</Badge>
                  <span className="text-xs text-muted-foreground">{cs.client}</span>
                </div>
                <h3 className="font-heading text-xl font-bold group-hover:text-[var(--vantus-sky)] transition-colors">
                  {cs.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Problem: </span>{cs.problem}
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-[var(--vantus-sky)]">Outcome: </span>{cs.outcome}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end gap-4 shrink-0">
                <span className="text-xs text-muted-foreground">{cs.timeline}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--vantus-sky)]">
                  Read case study <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">
          Want results like these for your business?
        </h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. We&apos;ll document your current setup and show you exactly
          what we would change and why.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold">
          <Link href="/start-audit">Start Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
