"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Skill {
  name: string;
  level: number; // 0-100
  category?: string;
}

interface SkillBarsProps {
  skills: Skill[];
  className?: string;
}

export function SkillBars({ skills, className = "" }: SkillBarsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">
                {skill.level}%
              </span>
            </div>
            <div
              className="h-2 bg-secondary rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={isVisible ? skill.level : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${skill.name} skill level: ${skill.level}%`}
            >
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: isVisible ? `${skill.level}%` : 0,
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SkillCategoriesProps {
  categories: {
    name: string;
    skills: Skill[];
  }[];
  className?: string;
}

export function SkillCategories({
  categories,
  className = "",
}: SkillCategoriesProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-semibold mb-6">{category.name}</h3>
            <SkillBars skills={category.skills} />
          </div>
        ))}
      </div>
    </div>
  );
}
