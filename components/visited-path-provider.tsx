"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface VisitedPathContextType {
  hasVisited: (path: string) => boolean;
}

const VisitedPathContext = createContext<VisitedPathContextType>({
  hasVisited: () => false,
});

export const useVisitedPath = () => useContext(VisitedPathContext);

export function VisitedPathProvider({ children }: { children: React.ReactNode }) {
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
     
    setVisitedPaths((prev) => {
      if (prev.has(pathname)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(pathname);
      return next;
    });
  }, [pathname]);

  const hasVisited = (path: string) => {
    return visitedPaths.has(path);
  };

  return (
    <VisitedPathContext.Provider value={{ hasVisited }}>
      {children}
    </VisitedPathContext.Provider>
  );
}
