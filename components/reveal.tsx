"use client";

import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useVisitedPath } from "@/components/visited-path-provider";
import { usePathname } from "next/navigation";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0.25,
  duration = 0.5,
  yOffset = 20,
  className
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const { hasVisited } = useVisitedPath();
  const pathname = usePathname();
  const shouldAnimate = !hasVisited(pathname);

  useEffect(() => {
    if (isInView && shouldAnimate) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls, shouldAnimate]);

  if (prefersReducedMotion || !shouldAnimate) {
    return (
      <div ref={ref} style={{ position: "relative", width }} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
