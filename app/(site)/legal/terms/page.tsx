import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Vantus Systems",
  description: "Terms governing use of the Vantus Systems website and engagement of our services.",
};

export default function TermsPage() {
  const updated = "January 1, 2025";

  return (
    <div className="flex flex-col gap-12 pb-24">
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-3">
        <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          These terms govern your use of the Vantus Systems website and engagement of our project-based
          web development services.
        </p>
      </section>

      <article className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full font-body space-y-8">
        {[
          {
            heading: "1. Services",
            body: "Vantus Systems provides project-based website design, development, and related professional services. All engagements are governed by a separate written statement of work (SOW) or project agreement signed by both parties. These website terms do not constitute an agreement to provide services.",
          },
          {
            heading: "2. Website Use",
            body: "This website is provided for informational purposes. You may not use it for any unlawful purpose, to transmit spam or malicious content, or to attempt to gain unauthorised access to any system or data.",
          },
          {
            heading: "3. Intellectual Property",
            body: "All content on this website — including text, design, code, and imagery — is owned by Vantus Systems or licensed to us. You may not reproduce, distribute, or create derivative works without written permission. Upon completion of a client project and receipt of full payment, intellectual property rights for custom deliverables are transferred as specified in the project agreement.",
          },
          {
            heading: "4. Enquiries and Audits",
            body: "Audit requests submitted through this site are evaluated on a project-by-project basis. Submission of an audit request does not constitute a contract or commitment to engage Vantus Systems. We reserve the right to decline any enquiry.",
          },
          {
            heading: "5. Disclaimer of Warranties",
            body: "This website is provided 'as is' without warranties of any kind. We do not warrant that the site will be error-free or uninterrupted. Nothing on this site constitutes professional legal, financial, or technical advice for your specific situation.",
          },
          {
            heading: "6. Limitation of Liability",
            body: "To the maximum extent permitted by law, Vantus Systems shall not be liable for any indirect, incidental, or consequential damages arising from use of this website. Our total liability in connection with any claim arising from website use shall not exceed $100 USD.",
          },
          {
            heading: "7. Governing Law",
            body: "These terms shall be governed by the laws of the State of Texas, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Harris County, Texas.",
          },
          {
            heading: "8. Changes",
            body: "We may update these terms at any time. The 'Last updated' date will reflect changes. Continued use of this site after an update constitutes acceptance.",
          },
          {
            heading: "9. Contact",
            body: "For legal enquiries: legal@vantussystems.com",
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
          <Link href="/legal/cookies" className="underline text-muted-foreground hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
        </div>
      </article>
    </div>
  );
}
