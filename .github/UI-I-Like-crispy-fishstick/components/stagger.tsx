"use client";

import { motion } from "framer-motion";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
