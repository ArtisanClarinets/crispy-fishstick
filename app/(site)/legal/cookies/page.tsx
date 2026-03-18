import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Vantus Systems",
  description: "How Vantus Systems uses cookies and similar technologies on this website.",
};

export default function CookiesPage() {
  const updated = "January 1, 2025";

  return (
    <div className="flex flex-col gap-12 pb-24">
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-3">
        <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          This policy explains how this website uses cookies and what choices you have.
        </p>
      </section>

      <article className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full font-body space-y-8">
        {[
          {
            heading: "What are cookies?",
            body: "Cookies are small text files stored on your device by a website. They allow the site to recognise your browser on subsequent visits and to retain preferences or session state.",
          },
          {
            heading: "Cookies we use",
            body: "We use only essential cookies that are strictly necessary for the website to function correctly. These include session security tokens and CSRF protection cookies. We do not use advertising cookies, tracking cookies, or third-party analytics cookies.",
          },
          {
            heading: "Essential cookies (cannot be disabled)",
            body: "__Host-authjs.csrf-token: Protects against cross-site request forgery attacks. Expires at end of session. — __Secure-authjs.session-token: Maintains authenticated sessions where applicable. Encrypted, HTTP-only. Expires per session settings.",
          },
          {
            heading: "Third-party cookies",
            body: "We do not embed third-party advertising, social media widgets, or analytics tools that set tracking cookies. If this changes, this policy will be updated.",
          },
          {
            heading: "Your choices",
            body: "Because we only use essential cookies, there is no cookie consent banner — there is nothing optional to consent to. If you disable cookies entirely in your browser, certain site features (such as form submissions) may not function correctly.",
          },
          {
            heading: "Changes",
            body: "If we introduce non-essential cookies in the future, we will update this policy and implement appropriate consent mechanisms before doing so.",
          },
          {
            heading: "Contact",
            body: "For questions about cookies: privacy@vantussystems.com",
          },
        ].map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="font-heading text-xl font-bold">{section.heading}</h2>
            <p className="text-base leading-relaxed text-foreground/80">{section.body}</p>
          </section>
        ))}

        <div className="pt-4 flex gap-4 text-sm">
          <Link href="/legal/privacy" className="underline text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/legal/terms" className="underline text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </article>
    </div>
  );
}
