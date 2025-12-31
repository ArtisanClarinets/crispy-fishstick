import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SplitText } from "@/components/react-bits/SplitText";

export const metadata: Metadata = {
  title: "About",
  description: "The philosophy and background behind Thompson Systems.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 container px-4 md:px-6 max-w-4xl mx-auto" data-system-tone="about">
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
           <SplitText text="Not a generic agency." delay={0.1} /> <br/>
           <span className="text-muted-foreground">A dedicated engineering partner.</span>
        </h1>
      </Reveal>

      <div className="prose prose-lg prose-neutral dark:prose-invert mt-12">
        <Reveal delay={0.1}>
          <p className="lead text-xl md:text-2xl leading-relaxed font-medium text-foreground">
            I founded {siteConfig.company} to solve a specific problem: the gap between &quot;good design&quot; and &quot;good engineering.&quot;
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p>
            Most teams treat these as separate disciplines. Designers hand off static files; developers rush to implement them; quality gets lost in translation. The result is software that looks okay but feels fragile.
          </p>
          <p>
            I operate differently. As a design-engineer, I bridge that gap. I build systems that are as rigorous under the hood as they are beautiful on the surface.
          </p>

          <h3>My Philosophy</h3>
          <ul>
            <li><strong>No Black Boxes:</strong> You should own your code. I hand over clean, well-documented repositories that your team can maintain.</li>
            <li><strong>Performance is a Feature:</strong> If it&apos;s not fast, it&apos;s broken. I budget for performance from day one.</li>
            <li><strong>Accessibility is Mandatory:</strong> I don&apos;t treat inclusion as an &quot;add-on&quot;. It&apos;s baked into the component library.</li>
          </ul>

          <h3>Background</h3>
          <p>
            Before going independent, I led frontend infrastructure teams at high-growth startups, shipping products to millions of users. I&apos;ve seen what breaks at scale, and I know how to prevent it.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.3}>
        <div className="mt-16 pt-16 border-t border-border/50">
           <h3 className="text-2xl font-bold mb-6">Ready to work together?</h3>
           <p className="text-lg text-muted-foreground mb-8">
              I take on a limited number of engagements per year to ensure high focus.
           </p>
           <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Check Availability</Link>
           </Button>
        </div>
      </Reveal>
    </div>
  );
}
