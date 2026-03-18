import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { OFFERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Services | Vantus Systems",
  description:
    "Project-based web engineering for small businesses. Website rebuilds, CMS integrations, and custom business portals. We deliver—you own it.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center space-y-4">
        <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold">
          What We Deliver
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Project-based engineering.<br className="hidden md:block" /> You own everything.
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
          Our team implements production-grade web systems for Gulf Coast and US-based small businesses.
          Fixed scope. Full source-code handoff. No recurring licence fees.
        </p>
      </section>

      {/* Offer Detail Cards — scope & outcome focused, no prices */}
      <section className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Three fixed-scope offers. Each ships as a complete, production-grade system.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {OFFERS.map((offer) => (
            <div
              key={offer.slug}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 gap-6 hover:shadow-lg transition-shadow ${
                offer.featured ? "border-[var(--vantus-sky)] ring-1 ring-[var(--vantus-sky)]" : "border-border"
              }`}
            >
              {offer.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--vantus-sky)] text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Requested
                </span>
              )}

              <div className="space-y-2">
                <h2 className="font-heading text-2xl font-bold tracking-tight">{offer.name}</h2>
                <p className="font-body text-muted-foreground leading-relaxed">{offer.tagline}</p>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <span className="block font-semibold text-foreground text-xs uppercase tracking-wider">Ideal for</span>
                <p className="font-body leading-relaxed">{offer.ideal}</p>
              </div>

              <div>
                <span className="block font-semibold text-foreground text-xs uppercase tracking-wider mb-2">What you get</span>
                <ul className="space-y-2 flex-1">
                  {offer.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[var(--vantus-sky)] mt-0.5 shrink-0" />
                      <span className="font-body">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-muted-foreground border-t border-border pt-4">
                <span className="font-semibold text-foreground">Timeline:</span> {offer.timeline}
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild size="sm" variant="outline" className="w-full rounded-full">
                  <Link href={`/services/${offer.slug}`}>
                    Full scope details <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  <Link href="/pricing" className="underline underline-offset-2 hover:text-foreground transition-colors">
                    See investment ranges →
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Strip */}
      <section className="bg-muted/30 border-y border-border py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">How we work</h2>
            <p className="font-body text-muted-foreground">Every engagement follows the same disciplined sequence.</p>
          </div>
          <ol className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", body: "We interview stakeholders, audit existing systems, and document scope before writing a line of code." },
              { step: "02", title: "Scope & Proposal", body: "You receive a written, fixed-price proposal with milestones. No vague estimates." },
              { step: "03", title: "Build", body: "Our team implements in weekly sprints with demo checkpoints. You see progress continuously." },
              { step: "04", title: "Handoff", body: "We deliver full source code, documentation, and credentials. You own everything." },
            ].map(({ step, title, body }) => (
              <li key={step} className="space-y-2">
                <span className="font-heading text-4xl font-black text-[var(--vantus-sky)] opacity-60">{step}</span>
                <h3 className="font-heading font-bold text-lg">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Not sure which offer fits?</h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. We&apos;ll review your current setup and recommend the right scope—no obligation.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold">
          <Link href="/start-audit">Start Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
