import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Info } from "lucide-react";
import { OFFERS, INFRASTRUCTURE, ADD_ONS, PRICING_NOTE } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing | Vantus Systems",
  description:
    "Transparent, project-based pricing for web engineering. Website rebuilds starting at $15,000. No retainers, no surprises.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center space-y-4">
        <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
          Transparent Pricing
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          One price. In writing.{" "}
          <span className="text-gradient-brand">Before we start.</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
          All projects are fixed-price. You see the exact number before signing anything.
          No range. No estimate. No surprise invoice at the end.
        </p>
      </section>

      {/* Core Offers — price-focused comparison table rows */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-4">
        <div>
          <span className="accent-bar" />
          <h2 className="font-heading text-2xl font-bold">Core offers</h2>
        </div>
        <p className="font-body text-sm text-muted-foreground">
          Ranges reflect real project variation. Your written proposal has one number.
        </p>
        <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
          {OFFERS.map((offer) => (
            <div
              key={offer.slug}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-6 bg-card transition-colors ${
                offer.featured ? "bg-sky-subtle" : ""
              }`}
            >
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold">{offer.name}</h3>
                  {offer.featured && (
                    <span className="badge-featured text-xs font-semibold px-2 py-0.5 rounded-full">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-muted-foreground">{offer.tagline}</p>
              </div>

              <div className="sm:text-right shrink-0 space-y-0.5">
                <p className="font-heading text-2xl font-black text-gradient-brand">{offer.rangeLabel}</p>
                <p className="text-xs text-muted-foreground">Typical investment · {offer.timeline}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <Button asChild size="sm" className="rounded-full btn-sky-glow">
                  <Link href="/start-audit">
                    Start audit <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="rounded-full text-xs">
                  <Link href={`/services/${offer.slug}`}>Scope details →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Add-ons */}
      <section className="bg-sky-subtle border-y border-border py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="badge-sky text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">Add to any project</span>
            <h2 className="font-heading text-2xl font-bold mt-2">Infrastructure</h2>
            <p className="font-body text-muted-foreground text-sm">
              Hosting and deployment are scoped separately. We configure, deploy, and hand over full access — you own the infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {INFRASTRUCTURE.map((infra) => (
              <div key={infra.slug} className="rounded-xl border border-border bg-card p-6 space-y-2 card-glow">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-heading font-bold">{infra.name}</h3>
                  <span className="font-semibold text-sm whitespace-nowrap text-sky">
                    {infra.rangeLabel}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{infra.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2">
          <span className="badge-gold text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">Optional</span>
          <h2 className="font-heading text-2xl font-bold mt-2">Add-ons</h2>
          <p className="font-body text-muted-foreground text-sm">
            Every add-on is priced separately after discovery. Nothing is bundled in without your agreement.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ADD_ONS.map((addon) => (
            <div key={addon.slug} className="rounded-xl border border-border bg-card p-5 space-y-2 card-glow">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-heading font-semibold text-sm">{addon.name}</h3>
                <span className="text-xs font-semibold whitespace-nowrap text-gold">
                  {addon.rangeLabel}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{addon.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Note */}
      <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="rounded-2xl border p-6 flex gap-4 items-start border-sky bg-sky-subtle">
          <Info className="h-5 w-5 mt-0.5 shrink-0 text-sky" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{PRICING_NOTE}</p>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <span className="accent-bar" />
          <h2 className="font-heading text-2xl font-bold">Common questions</h2>
        </div>
        <dl className="space-y-6">
          {[
            {
              q: "Is there a monthly fee?",
              a: "No. Our core projects are one-time, fixed-price engagements. After handoff, your site is yours — no monthly billing from us. Optional care plans are available if you want ongoing support.",
            },
            {
              q: "Why show ranges if you use fixed prices?",
              a: "Ranges help you know if a project fits your budget before we meet. After a free audit, your written proposal has a single number — not a range.",
            },
            {
              q: "What if I just need something small to start?",
              a: "That's completely normal. Many owners start with a Website Rebuild and add a CMS or booking system later when they're ready. We scope each engagement independently.",
            },
            {
              q: "What if the scope changes mid-project?",
              a: "Any change to scope is agreed in writing before work continues. We use a formal change order process — no surprise charges, ever.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="space-y-2 border-b border-border pb-6 last:border-0 last:pb-0">
              <dt className="font-heading font-bold">{q}</dt>
              <dd className="font-body text-muted-foreground leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Get a written proposal</h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. We review your current setup and return a fixed-price proposal
          within five business days.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold">
          <Link href="/start-audit">Start Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
