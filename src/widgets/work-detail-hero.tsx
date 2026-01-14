"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/widgets/reveal";
import { motion } from "framer-motion";
import { CoverArt } from "@/widgets/cover-art";

interface WorkDetailHeroProps {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
}

export function WorkDetailHero({
  slug,
  title,
  description,
  tags,
}: WorkDetailHeroProps) {
  return (
    <div className={`relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-12 md:pb-24 overflow-hidden`}>
      {/* Shared Element Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-secondary"
      >
        <CoverArt slug={slug} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </motion.div>

      <div className="container relative z-10">
        <Link
          href="/work"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Work
        </Link>

        {/* Shared Element Title */}
        <div className="mb-6">
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance inline-block"
           >
             {title}
           </motion.h1>
        </div>

        <Reveal delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
