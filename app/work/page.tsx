import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies of high-performance engineering systems.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen py-24 container px-4 md:px-6">
      <div className="max-w-2xl mb-16 md:mb-24">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Selected Work</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A collection of technical deep dives. I specialize in complex, data-heavy applications where performance and reliability are non-negotiable.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-12 md:gap-24">
        {siteConfig.featuredWork.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <Link href={`/work/${project.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image Column */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary border border-border/50">
                 <div className={`absolute inset-0 bg-gradient-to-br ${siteConfig.workPlaceholders[project.slug as keyof typeof siteConfig.workPlaceholders]?.gradient || 'from-gray-800 to-black'} opacity-80 transition-transform duration-700 group-hover:scale-105`} />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="sr-only">{project.title}</span>
                 </div>
              </div>

              {/* Text Column */}
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <span className="h-px w-12 bg-primary/20"></span>
                    <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                 </h2>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                 </p>
                 <div className="flex items-center text-primary font-medium group-hover:underline underline-offset-4">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
