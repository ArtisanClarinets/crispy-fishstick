import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { OFFERS, PRICING_NOTE, getOfferBySlug } from "@/lib/pricing";

interface Props {
  params: Promise<{ offerSlug: string }>;
}

export async function generateStaticParams() {
  return OFFERS.map((offer) => ({ offerSlug: offer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { offerSlug } = await params;
  const offer = getOfferBySlug(offerSlug);
  if (!offer) return {};
  return {
    title: `${offer.name} | Vantus Systems`,
    description: offer.tagline,
  };
}

export default async function OfferDetailPage({ params }: Props) {
  const { offerSlug } = await params;
  const offer = getOfferBySlug(offerSlug);
  if (!offer) notFound();

  const otherOffers = OFFERS.filter((o) => o.slug !== offer.slug);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Back */}
      <div className="pt-10 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All Services
        </Link>
      </div>

      {/* Hero */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
            Service Offer
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-balance">
            {offer.name}
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">{offer.tagline}</p>
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-sky">Best fit</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{offer.ideal}</p>
          </div>
          <Button asChild size="lg" className="rounded-full px-8 font-semibold btn-sky-glow">
            <Link href="/start-audit">
              Start Your Free Audit <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Pricing card */}
        <div className="rounded-2xl border bg-card p-8 space-y-6 card-glow border-sky">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-sky">
              Typical Investment
            </p>
            <p className="font-heading text-4xl font-black text-gradient-brand">
              {offer.rangeLabel}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky">
              Typical Timeline
            </p>
            <p className="font-body text-lg font-semibold">{offer.timeline}</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
            {PRICING_NOTE}
          </p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div>
          <span className="accent-bar" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold">What changes for your business</h2>
          <p className="font-body text-muted-foreground mt-1">Concrete outcomes delivered at project close.</p>
        </div>
        <ul className="grid md:grid-cols-2 gap-4">
          {offer.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 rounded-xl border border-border p-5 bg-card card-glow">
              <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-sky" />
              <span className="font-body leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Deliverables */}
      <section className="bg-sky-subtle border-y border-border py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <span className="accent-bar" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Technical deliverables</h2>
            <p className="font-body text-muted-foreground mt-1">Everything handed over at project close. No exceptions, no ongoing dependency on us.</p>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            {offer.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-sky" />
                <span className="font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other Offers */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <h2 className="font-heading text-xl font-bold text-muted-foreground">Other offers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {otherOffers.map((o) => (
          <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group rounded-2xl border border-border p-6 card-glow bg-card space-y-2"
            >
              <h3 className="font-heading font-bold text-lg group-hover:text-[var(--vantus-sky)] transition-colors">
                {o.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{o.tagline}</p>
              <p className="text-sm font-semibold text-gradient-brand">{o.rangeLabel}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">
          Ready to scope your project?
        </h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. We review your current setup, identify the right scope,
          and return a written fixed-price proposal within five business days — no obligation.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold btn-sky-glow">
          <Link href="/start-audit">Start Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
