import Link from "next/link";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { AmbientBackground } from "@/components/ui/kinetic/ambient-background";
import { HeroBadge } from "@/components/ui/kinetic/hero-badge";
import { TextReveal } from "@/components/ui/kinetic/text-reveal";
import { OFFERS } from "@/lib/pricing";

const PROOF_STRIP = [
  { stat: "100%", label: "Projects delivered on written scope" },
  { stat: "0", label: "Billing disputes — ever" },
  { stat: "< 5 days", label: "From first contact to written proposal" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Free Audit",
    body: "We review your current site and return written findings in five business days — free, with no sales call attached.",
  },
  {
    num: "02",
    title: "Fixed Proposal",
    body: "One number. One scope. You know exactly what you are getting before you sign. No hourly billing, ever.",
  },
  {
    num: "03",
    title: "We Build It",
    body: "Our engineers handle everything. You get weekly updates in plain English. No tech jargon, no being left in the dark.",
  },
  {
    num: "04",
    title: "You Own It",
    body: "Full source code, logins, and documentation handed to you. No platform dependency, no ongoing fees to us.",
  },
];

const PAIN_POINTS = [
  {
    problem: "Your site loads in 5+ seconds",
    why: "Google penalises slow sites. Customers bounce before they read a word. You lose leads you never knew existed.",
  },
  {
    problem: "You can't update your own content",
    why: "Paying a developer to change a phone number or swap a photo is money and time you cannot afford to waste.",
  },
  {
    problem: "Your site looks like it's from 2015",
    why: "Customers form their first impression in milliseconds. A dated site signals a dated business — even if yours isn't.",
  },
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-sky" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky" />
              </span>
              Now accepting clients — Gulf Coast &amp; remote
            </span>
          </HeroBadge>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance">
            <TextReveal text="Your website should work as hard as you do." />
          </h1>

          <Reveal delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
              We build production-grade websites for small businesses — fast, secure, and fully yours.
              Fixed price. Written before we start. No hourly billing.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-semibold btn-sky-glow">
                <Link href="/start-audit">Get a Free Audit</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-base hover:border-[var(--vantus-sky)] hover:text-[var(--vantus-sky)] transition-colors">
                <Link href="/proof">See Our Work</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2">
              {[
                "Free written audit — no strings",
                "Fixed price before any work starts",
                "Full code ownership at handoff",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-sky" />
                  <span>{item}</span>
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
            className="rounded-2xl grid grid-cols-3 divide-x divide-white/10 glow-sky bg-navy text-cream"
          >
            {PROOF_STRIP.map((item) => (
              <div key={item.stat} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <span className="font-heading text-3xl md:text-4xl font-bold text-gradient-brand">
                  {item.stat}
                </span>
                <span className="font-body text-xs md:text-sm mt-1 opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Pain Points ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <Reveal>
          <div className="space-y-3">
            <span className="accent-bar-gold" />
            <Badge variant="secondary" className="badge-gold uppercase tracking-wider text-xs font-semibold">
              Sound Familiar?
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Most small business websites are quietly{" "}
              <span className="text-gradient-gold">costing you customers.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAIN_POINTS.map((pp) => (
            <Reveal key={pp.problem}>
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3 card-glow h-full">
                <p className="font-heading font-bold text-base text-gold">{pp.problem}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{pp.why}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <Reveal>
          <div className="space-y-3">
            <span className="accent-bar" />
            <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">What We Build</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Three offers. <span className="text-gradient-brand">No hidden tiers.</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-xl">
              Every engagement is a fixed-price project. You own every deliverable outright — code, credentials, documentation.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFERS.map((offer) => (
            <Reveal key={offer.slug}>
              <Link
                href={`/services/${offer.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 card-glow h-full"
              >
                {offer.featured && (
                  <Badge className="badge-featured self-start text-xs">
                    Most Popular
                  </Badge>
                )}
                <div className="flex-1 space-y-2">
                  <h3 className="font-heading text-lg font-bold group-hover:text-[var(--vantus-sky)] transition-colors">
                    {offer.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{offer.tagline}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge-sky text-xs font-semibold">{offer.rangeLabel}</span>
                  <span className="font-body text-xs text-muted-foreground">{offer.timeline}</span>
                </div>
                <span className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all text-[var(--vantus-sky)]">
                  Full scope details <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center pt-2">
            <Button asChild variant="outline" className="rounded-full hover:border-[var(--vantus-sky)] hover:text-[var(--vantus-sky)] transition-colors">
              <Link href="/pricing">Full pricing breakdown →</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ── Process ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <Reveal>
          <div className="space-y-3">
            <span className="accent-bar" />
            <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">How It Works</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">From enquiry to handoff in four steps.</h2>
            <p className="font-body text-muted-foreground max-w-xl">
              No ambiguity. You know exactly what happens, and when, at every stage — in writing.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step) => (
            <Reveal key={step.num}>
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3 card-glow h-full">
                <span className="font-heading text-3xl font-bold text-gradient-brand">
                  {step.num}
                </span>
                <h3 className="font-heading text-base font-bold">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Social proof ── */}
      <Reveal>
        <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 flex flex-col items-center text-center gap-4 card-glow">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-current text-gold" />
              ))}
            </div>
            <blockquote className="font-body text-xl md:text-2xl leading-relaxed max-w-2xl text-balance italic">
              &ldquo;We finally have a website that actually brings in customers. It loads fast, looks professional, and I can update it myself. Worth every dollar.&rdquo;
            </blockquote>
            <p className="text-sm text-muted-foreground font-semibold">— Gulf Coast Retailer · Website Rebuild project</p>
          </div>
        </section>
      </Reveal>

      {/* ── Standards teaser ── */}
      <Reveal>
        <section
          className="mx-4 md:mx-6 lg:mx-8 rounded-2xl px-8 md:px-16 py-16 text-center space-y-6 max-w-5xl lg:mx-auto glow-sky bg-navy text-cream"
        >
          <Badge className="badge-sky uppercase tracking-wider text-xs font-semibold border">
            Our Guarantee
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            We don&apos;t ship until it&apos;s right.
          </h2>
          <p className="font-body text-base opacity-75 max-w-2xl mx-auto">
            Every project passes the same checklist: sub-2s load time, OWASP security hardening,
            WCAG accessibility compliance, and zero known defects at handoff. Not aspirational — contractual.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/20 hover:bg-white/10 hover:border-white/40 transition-colors text-cream"
          >
            <Link href="/standards">See our engineering standards →</Link>
          </Button>
        </section>
      </Reveal>

      {/* ── Final CTA ── */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <Reveal>
          <div className="space-y-4">
            <span className="accent-bar mx-auto" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Ready to stop losing customers<br className="hidden md:block" /> to a slow, outdated site?
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              A free audit is the fastest way to see exactly what your site needs — and what it will cost to fix.
              Written report in five business days. No sales pressure.
            </p>
            <Button asChild size="lg" className="rounded-full px-12 font-semibold btn-sky-glow">
              <Link href="/start-audit">Start Your Free Audit</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
