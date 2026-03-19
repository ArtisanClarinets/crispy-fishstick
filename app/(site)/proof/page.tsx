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
    slug: "local-service-site",
    title: "Local Service Business Website",
    client: "Gulf Coast HVAC Company",
    problem: "Template site looked like everyone else's. Phone inquiries were flat and form submissions were near zero.",
    outcome: "New site drove 3x more quote requests in the first 60 days. Owner can update service pages without calling a developer.",
    tag: "Website Rebuild",
    timeline: "6 weeks",
  },
  {
    slug: "restaurant-ordering",
    title: "Online Ordering Integration",
    client: "Independent Restaurant Group",
    problem: "Third-party delivery apps were taking 30% commission on every order, eating into already thin margins.",
    outcome: "Direct ordering system replaced app dependency for 60% of takeout volume. Commission bleed cut in half.",
    tag: "Systems Integration",
    timeline: "4 weeks",
  },
  {
    slug: "shopify-admin-sync",
    title: "Inventory Sync & Admin Portal",
    client: "Gulf Coast Retailer",
    problem: "Manual reconciliation between Shopify and the warehouse was taking 12+ hours a week of staff time.",
    outcome: "Automated sync eliminated manual reconciliation. Inventory accuracy reached 99.7%. Staff redirected to sales.",
    tag: "Business Portal",
    timeline: "8 weeks",
  },
];

export default function ProofPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center space-y-4">
        <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
          Track Record
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Real results.{" "}
          <span className="text-gradient-brand">Real businesses.</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
          Each case study shows the real problem, what we changed, and the measurable result.
          Small businesses on the Gulf Coast and across North America.
        </p>
      </section>

      {/* Proof strip */}
      <section className="bg-[var(--vantus-navy)] text-white py-12 px-4 md:px-6 lg:px-8 glow-sky">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: BarChart3, stat: "100%", label: "Projects delivered on written scope" },
            { icon: Clock, stat: "< 5 days", label: "Proposal turnaround after free audit" },
            { icon: CheckCircle2, stat: "0", label: "Surprise charges across all projects" },
          ].map(({ icon: Icon, stat, label }) => (
            <div key={label} className="space-y-2">
              <Icon className="h-6 w-6 mx-auto text-sky" />
              <p className="font-heading text-3xl font-black text-gradient-brand">{stat}</p>
              <p className="font-body text-sm text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div>
          <span className="accent-bar" />
          <h2 className="font-heading text-2xl font-bold">Case Studies</h2>
        </div>
        <div className="space-y-6">
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.slug}
              href={`/proof/case-studies/${cs.slug}`}
              className="group flex flex-col md:flex-row gap-6 rounded-2xl border border-border bg-card p-8 card-glow"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="badge-sky text-xs">{cs.tag}</Badge>
                  <span className="text-xs text-muted-foreground">{cs.client}</span>
                </div>
                <h3 className="font-heading text-xl font-bold group-hover:text-[var(--vantus-sky)] transition-colors">
                  {cs.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Problem: </span>{cs.problem}
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-sky">Result: </span>{cs.outcome}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end gap-4 shrink-0">
                <span className="text-xs text-muted-foreground">{cs.timeline}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky">
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
          Want results like these?
        </h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. We document your current setup, identify the bottlenecks,
          and show you exactly how we&apos;d fix it — before you spend a dollar.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold btn-sky-glow">
          <Link href="/start-audit">Get Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
