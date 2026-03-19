"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { submitContact } from "@/app/actions";
import { Loader2, Mail, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});
    try {
      const result = await submitContact(formData);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrors(result.errors || {});
      }
    } catch (_e) {
      setErrors({ form: ["Something went wrong. Please try again or email us directly."] });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-4">
        <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
          Get in Touch
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Let&apos;s talk about{" "}
          <span className="text-gradient-brand">your business.</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
          No sales pitch. No pressure. Just a straight conversation about what you need and
          whether we&apos;re a fit.
        </p>
      </section>

      {/* Two-column layout */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-start">

        {/* Left: info + book a call */}
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 icon-bg-sky">
                <Mail className="h-5 w-5 text-sky" />
              </div>
              <div>
                <h3 className="font-heading font-bold">Email</h3>
                <a
                  href="mailto:hello@vantus.systems"
                  className="font-body text-muted-foreground link-sky"
                >
                  hello@vantus.systems
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 icon-bg-sky">
                <MapPin className="h-5 w-5 text-sky" />
              </div>
              <div>
                <h3 className="font-heading font-bold">Service Area</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Gulf Coast, Texas — working with small businesses across North America.
                </p>
              </div>
            </div>
          </div>

          {/* Book a call card */}
          <div className="rounded-2xl border p-6 space-y-4 card-glow border-sky">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-sky" />
              <h3 className="font-heading font-bold">Prefer to talk?</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Skip the back-and-forth. Grab a free 15-minute call and we&apos;ll scope your
              situation in plain English.
            </p>
            <Button asChild variant="outline" className="w-full rounded-full font-semibold">
              <a href="/start-audit">Start with the Free Audit →</a>
            </Button>
          </div>

          {/* Why contact us */}
          <ul className="space-y-3">
            {[
              "We reply within one business day",
              "No pitch until you ask for one",
              "We tell you honestly if we\u2019re not the right fit",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky" />
                <span className="font-body text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div className="rounded-2xl border border-border bg-card p-8 space-y-6 card-glow">
          <div>
            <h2 className="font-heading text-xl font-bold">Send a message</h2>
            <p className="font-body text-sm text-muted-foreground mt-1">We usually reply within one business day.</p>
          </div>

          {isSuccess ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="h-10 w-10 mx-auto text-sky" />
              <h3 className="font-heading font-bold text-lg">Message received</h3>
              <p className="font-body text-muted-foreground text-sm">We&apos;ll be in touch within one business day.</p>
              <Button onClick={() => setIsSuccess(false)} variant="link" className="text-sm text-sky">
                Send another message
              </Button>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-sm font-semibold">Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="focus-visible:ring-[var(--vantus-sky)]"
                />
                {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email" className="text-sm font-semibold">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@yourbusiness.com"
                  className="focus-visible:ring-[var(--vantus-sky)]"
                />
                {errors.email && <p className="text-destructive text-xs">{errors.email[0]}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="text-sm font-semibold">How can we help?</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Tell us about your business and what you&apos;re trying to fix or build..."
                  className="min-h-[120px] focus-visible:ring-[var(--vantus-sky)]"
                />
                {errors.message && <p className="text-destructive text-xs">{errors.message[0]}</p>}
              </div>
              {errors.form && (
                <p className="text-sm text-destructive">{errors.form[0]}</p>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-full font-semibold btn-sky-glow"
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
