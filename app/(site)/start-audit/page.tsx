"use client";

import { useActionState, useRef } from "react";
import { submitAudit } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2 } from "lucide-react";

type State = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
} | null;

const BUDGET_OPTIONS = [
  { value: "under-15k", label: "Under $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-125k", label: "$50,000 – $125,000" },
  { value: "over-125k", label: "Over $125,000" },
  { value: "not-sure", label: "Not sure yet" },
];

const CONCERN_OPTIONS = [
  "My site is slow or underperforming",
  "My site doesn't reflect the quality of our business",
  "I need a CMS so my team can update content",
  "I need a client or staff portal",
  "My site has security or reliability issues",
  "I'm launching a new business and need a site",
  "Other",
];

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="text-sm text-destructive mt-1">{errors[0]}</p>;
}

export default function StartAuditPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const result = await submitAudit(formData);
      if (result.success) formRef.current?.reset();
      return result;
    },
    null,
  );

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-4">
        <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold">
          Free — No Obligation
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Start Your<br className="hidden md:block" /> Free Audit
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Tell us about your current site and top concern. We will review it and return a written
          assessment within five business days — free, with no sales pressure.
        </p>
        {/* Trust strip */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
          {[
            "Written report delivered within 5 business days",
            "No sales calls unless you request one",
            "Specific findings, not generic advice",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--vantus-sky)" }} />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <section className="px-4 md:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        {state?.success ? (
          <div
            className="rounded-2xl p-10 text-center space-y-4"
            style={{ background: "var(--vantus-navy)", color: "var(--vantus-cream)" }}
          >
            <CheckCircle2 className="h-12 w-12 mx-auto" style={{ color: "var(--vantus-sky)" }} />
            <h2 className="font-heading text-2xl font-bold">Request Received</h2>
            <p className="font-body text-base opacity-80">
              {state.message ?? "We will have your written assessment ready within five business days."}
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            action={formAction}
            className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-semibold">
                Your Name <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Smith"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <FieldError errors={state?.errors?.name} />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold">
                Business Email <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@company.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <FieldError errors={state?.errors?.email} />
            </div>

            {/* Website URL */}
            <div className="space-y-1.5">
              <label htmlFor="url" className="block text-sm font-semibold">
                Current Website URL{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="url"
                name="url"
                type="url"
                autoComplete="url"
                placeholder="https://yourcompany.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Top concern */}
            <div className="space-y-1.5">
              <label htmlFor="concern" className="block text-sm font-semibold">
                Top Concern <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <select
                id="concern"
                name="concern"
                required
                defaultValue=""
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select your top concern…</option>
                {CONCERN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <FieldError errors={state?.errors?.concern} />
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <label htmlFor="budget" className="block text-sm font-semibold">
                Approximate Budget{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                defaultValue=""
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Prefer not to say</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Server-level error fallback */}
            {state?.success === false && !state.errors && (
              <p className="text-sm text-destructive">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full rounded-full font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Request My Free Audit"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to our{" "}
              <a href="/legal/privacy" className="underline hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              . We never sell your data.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
