"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { CoverArt } from "@/components/cover-art";
import { VTLink } from "@/components/vt-link";
import { Stagger, StaggerItem } from "@/components/stagger";

export function HomeFeaturedWork() {
  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {siteConfig.featuredWork.map((project) => (
        <StaggerItem key={project.slug}>
          <VTLink href={`/work/${project.slug}`} className="group block h-full">
            <motion.div
              layoutId={`cover-${project.slug}`}
              className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/3] mb-6 border border-border/50"
            >
              <CoverArt slug={project.slug} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="self-end p-2 bg-background/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="text-white h-5 w-5" />
                </div>
                <motion.h3 layoutId={`title-${project.slug}`} className="text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </motion.h3>
              </div>
            </motion.div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-primary/60 uppercase tracking-wider">Case Study</p>
              <p className="text-muted-foreground line-clamp-2">{project.description}</p>
              <div className="text-sm text-foreground/80">
                <span className="font-semibold text-foreground">Outcome:</span> {project.outcome}
              </div>
            </div>
          </VTLink>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
