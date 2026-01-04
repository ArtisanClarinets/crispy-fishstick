import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Vantus Systems website and services.",
};

export default function TermsPage() {
  const lastUpdated = "2024-11-15";

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground">
              These Terms of Service govern your access to and use of {siteConfig.company}&apos;s
              website and services. By accessing the site, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Engagements</h2>
            <p className="text-muted-foreground">
              Project engagements are defined in a written statement of work. Deliverables, timelines,
              and acceptance criteria are documented prior to project start.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              Unless otherwise stated, you own the deliverables upon full payment. Pre-existing
              frameworks and tooling remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Limitations</h2>
            <p className="text-muted-foreground">
              The website and services are provided &quot;as is&quot; without warranties of any kind,
              except where explicitly stated in a signed agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Questions about these terms can be directed to {siteConfig.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
