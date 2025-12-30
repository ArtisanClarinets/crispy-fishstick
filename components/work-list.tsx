"use client";

import { siteConfig } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/stagger";
import { CoverArt } from "@/components/cover-art";
import { VTLink } from "@/components/vt-link";

export function WorkList() {
  return (
    <Stagger className="grid grid-cols-1 gap-12 md:gap-24">
      {siteConfig.featuredWork.map((project, i) => (
        <StaggerItem key={project.slug} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <VTLink href={`/work/${project.slug}`} className="block w-full">
            <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden card-precision">
              <motion.div
                layoutId={`cover-${project.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-secondary"
              >
                <CoverArt
                  slug={project.slug}
                  imageSrc={project.coverImage}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </VTLink>

          {/* Text Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-primary/20"></span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
            </div>

            <VTLink href={`/work/${project.slug}`}>
              <motion.h2
                layoutId={`title-${project.slug}`}
                className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors inline-block"
              >
                {project.title}
              </motion.h2>
            </VTLink>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-semibold">Outcome:</span> {project.outcome}
              </p>
              <p>
                <span className="text-foreground font-semibold">Constraints:</span> {project.constraints}
              </p>
              <p>
                <span className="text-foreground font-semibold">Role:</span> {project.role}
              </p>
            </div>

            <VTLink href={`/work/${project.slug}`} className="flex items-center text-primary font-medium group-hover:underline underline-offset-4">
              Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </VTLink>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
