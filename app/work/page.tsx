"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CoverArt } from "@/components/cover-art";

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
          <div key={project.slug} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Image Column - Wrapped in Reveal but LayoutId on motion.div */}
            <Reveal delay={i * 0.1} className="w-full">
               <Link href={`/work/${project.slug}`} className="block w-full">
                  <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden card-precision">
                    <motion.div
                      layoutId={`cover-${project.slug}`}
                      className="relative aspect-[16/10] w-full overflow-hidden bg-secondary"
                    >
                      <CoverArt slug={project.slug} />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  </div>
               </Link>
            </Reveal>

            {/* Text Column */}
            <Reveal delay={i * 0.1 + 0.05} className="space-y-6">
                 <div className="flex items-center gap-4">
                    <span className="h-px w-12 bg-primary/20"></span>
                    <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
                 </div>

                 <Link href={`/work/${project.slug}`}>
                    <motion.h2
                      layoutId={`title-${project.slug}`}
                      className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors inline-block"
                    >
                        {project.title}
                    </motion.h2>
                 </Link>

                 <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                 </p>
                 <Link href={`/work/${project.slug}`} className="flex items-center text-primary font-medium group-hover:underline underline-offset-4">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </Link>
            </Reveal>

          </div>
        ))}
      </div>
    </div>
  );
}
