import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Vantus Systems",
  description: "How Vantus Systems collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  const updated = "January 1, 2025";

  return (
    <div className="flex flex-col gap-12 pb-24">
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-3">
        <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          Vantus Systems operates <strong>vantussystems.com</strong>. This policy explains what information
          we collect, how we use it, and your rights.
        </p>
      </section>

      <article className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full font-body prose prose-neutral dark:prose-invert max-w-none space-y-8">
        {[
          {
            heading: "1. Information We Collect",
            body: "We collect information you provide directly: your name, email address, website URL, and the details you submit via our audit request and contact forms. We do not collect payment card information through this website.",
          },
          {
            heading: "2. How We Use Your Information",
            body: "We use your information solely to respond to audit requests and contact form submissions, to deliver the services you have engaged us for, and to fulfil any legal obligations. We do not use your information for marketing without your explicit consent.",
          },
          {
            heading: "3. Data Retention",
            body: "We retain enquiry data for a maximum of 24 months from the date of submission, or for the duration of any active client engagement plus 12 months, whichever is longer. You may request deletion at any time.",
          },
          {
            heading: "4. Third-Party Services",
            body: "We use Vercel for hosting (subject to Vercel's privacy policy), and may use transactional email services to deliver correspondence. We do not sell, rent, or trade your personal data to any third parties.",
          },
          {
            heading: "5. Cookies",
            body: "Our website uses only essential cookies required for site function and security. We do not use advertising or tracking cookies. See our Cookie Policy for full details.",
          },
          {
            heading: "6. Security",
            body: "All data in transit is encrypted via TLS. We apply the OWASP Top 10 security standards across our systems and conduct regular security reviews.",
          },
          {
            heading: "7. Your Rights",
            body: "You have the right to access, correct, or delete the personal data we hold about you. To exercise these rights, contact us at privacy@vantussystems.com. We will respond within 30 days.",
          },
          {
            heading: "8. Changes to This Policy",
            body: "We may update this policy periodically. The 'Last updated' date at the top of this page will reflect any changes. Continued use of this site after an update constitutes acceptance of the revised policy.",
          },
          {
            heading: "9. Contact",
            body: "For privacy enquiries: privacy@vantussystems.com — or use the contact form at vantussystems.com/contact.",
          },
        ].map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="font-heading text-xl font-bold">{section.heading}</h2>
            <p className="text-base leading-relaxed text-foreground/80">{section.body}</p>
          </section>
        ))}

        <div className="pt-4 flex gap-4 text-sm">
          <Link href="/legal/terms" className="underline text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/legal/cookies" className="underline text-muted-foreground hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
        </div>
      </article>
    </div>
  );
}
