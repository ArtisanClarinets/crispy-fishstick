import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { AmbientBackground } from "@/components/ui/kinetic/ambient-background";
import { HeroBadge } from "@/components/ui/kinetic/hero-badge";
import { TextReveal } from "@/components/ui/kinetic/text-reveal";
import { OFFERS } from "@/lib/pricing";

const PROOF_STRIP = [
  { stat: "100%", label: "Projects delivered on scope" },
  { stat: "0", label: "Billing disputes" },
  { stat: "< 5 days", label: "From enquiry to written proposal" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery", body: "We review your current site, goals, and constraints. Written findings delivered within 5 business days." },
  { num: "02", title: "Scope", body: "Fixed-price proposal with exact deliverables, timeline, and payment schedule. No surprises." },
  { num: "03", title: "Build", body: "Our team implements everything. Weekly written updates. You see progress before the final handoff." },
  { num: "04", title: "Handoff", body: "We hand over credentials, documentation, and a training session. You own and control everything." },
];

const VALUE_PROPS = [
  { label: "Engineering-grade quality", vs: "vs. cheap theme sites" },
  { label: "Fixed price, written scope", vs: "vs. open-ended hourly billing" },
  { label: "You own the result", vs: "vs. subscription lock-in" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 md:gap-32 pb-24 md:pb-32 relative">
      <AmbientBackground />

      {/* ── Hero ── */}
      <section className="relative pt-12 md:pt-28 lg:pt-36 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6 md:gap-8">
          <HeroBadge>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--vantus-sky)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--vantus-sky)" }} />
              </span>
              Accepting New Clients — Gulf Coast &amp; Remote
            </span>
          </HeroBadge>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance">
            <TextReveal text="Custom websites built by engineers. Owned by you." />
          </h1>

          <Reveal delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
              Project-based web development for businesses that need a site that works, performs, and lasts. Fixed scope. Written proposal. No hourly billing.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-semibold shadow-lg">
                <Link href="/start-audit">Get a Free Audit</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-base">
                <Link href="/proof">View Our Work</Link>
              </Button>
            </div>
          </Reveal>

          {/* Value props */}
          <Reveal delay={0.4}>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2">
              {VALUE_PROPS.map((vp) => (
                <li key={vp.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--vantus-sky)" }} />
                  <span><strong className="text-foreground">{vp.label}</strong> {vp.vs}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Proof strip ── */}
      <Reveal>
        <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div
            className="rounded-2xl grid grid-cols-3 divide-x divide-white/10"
            style={{ background: "var(--vantus-navy)", color: "var(--vantus-cream)" }}
          >
            {PROOF_STRIP.map((item) => (
              <div key={item.stat} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <span className="font-heading text-3xl md:text-4xl font-bold" style={{ color: "var(--vantus-sky)" }}>
                  {item.stat}
                </span>
                <span className="font-body text-xs md:text-sm mt-1 opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Services ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <Reveal>
          <div className="space-y-3">
            <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold">What We Build</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">Three offers. No hidden tiers.</h2>
            <p className="font-body text-muted-foreground max-w-xl">
              Each engagement is scoped and priced as a one-time project. You own every deliverable outright.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFERS.map((offer) => (
            <Reveal key={offer.slug}>
              <Link
                href={`/services/${offer.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-[var(--vantus-sky)] transition-colors h-full"
              >
                {offer.featured && (
                  <Badge className="self-start text-xs" style={{ background: "var(--vantus-sky)", color: "var(--vantus-navy)" }}>
                    Most Popular
                  </Badge>
                )}
                <div className="flex-1 space-y-2">
                  <h3 className="font-heading text-lg font-bold group-hover:text-[var(--vantus-sky)] transition-colors">
                    {offer.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{offer.tagline}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-heading text-2xl font-bold">{offer.startingAt}</p>
                  <p className="font-body text-xs text-muted-foreground">{offer.rangeLabel} · {offer.timeline}</p>
                </div>
                <span className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: "var(--vantus-sky)" }}>
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center pt-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/pricing">Full pricing breakdown →</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ── Process ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <Reveal>
          <div className="space-y-3">
            <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold">How It Works</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">Four steps. Every project.</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step) => (
            <Reveal key={step.num}>
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3 h-full">
                <span className="font-heading text-3xl font-bold" style={{ color: "var(--vantus-sky)" }}>
                  {step.num}
                </span>
                <h3 className="font-heading text-base font-bold">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Standards teaser ── */}
      <Reveal>
        <section
          className="mx-4 md:mx-6 lg:mx-8 rounded-2xl px-8 md:px-16 py-16 text-center space-y-6 max-w-5xl lg:mx-auto"
          style={{ background: "var(--vantus-navy)", color: "var(--vantus-cream)" }}
        >
          <Badge className="uppercase tracking-wider text-xs font-semibold" style={{ background: "rgba(255,255,255,0.1)", color: "var(--vantus-sky)" }}>
            Engineering Standards
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Lighthouse 90+. OWASP hardened. WCAG AA.
          </h2>
          <p className="font-body text-base opacity-70 max-w-2xl mx-auto">
            Every project passes the same quality bar — not because it is on a checklist, but because it is the minimum acceptable standard for work that carries our name.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/20 hover:bg-white/10"
            style={{ color: "var(--vantus-cream)" }}
          >
            <Link href="/standards">See our standards →</Link>
          </Button>
        </section>
      </Reveal>

      {/* ── Final CTA ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <Reveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            Not sure where to start?
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            A free audit is the fastest way to understand what your site needs and roughly what it will cost to fix. Written report in five business days. No sales pressure.
          </p>
          <Button asChild size="lg" className="rounded-full px-12 font-semibold">
            <Link href="/start-audit">Start Your Free Audit</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
