"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <LayoutGroup id="app">
      {/*
        Grid Strategy for Sync Transitions:
        We use a single-cell grid to force the exiting and entering pages
        to overlap perfectly without absolute positioning (which collapses height).
        The container height automatically adapts to the tallest element.
      */}
      <div className="grid grid-cols-1 grid-rows-1 min-h-[calc(100vh-80px)]">
      {/* min-h accounts for header height roughly to prevent collapse */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="col-start-1 row-start-1 flex flex-col w-full"
            style={{ isolation: "isolate" }} // Create new stacking context
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
