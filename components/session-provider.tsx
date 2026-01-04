"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SessionContextType {
  hasVisited: (path: string) => boolean;
}

const SessionContext = createContext<SessionContextType>({
  hasVisited: () => false,
});

export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
    // We mark the page as visited AFTER the first render
    if (!visitedPaths.has(pathname)) {
      setVisitedPaths((prev) => {
        const next = new Set(prev);
        next.add(pathname);
        return next;
      });
    }
  }, [pathname, visitedPaths]);

  const hasVisited = (path: string) => {
    return visitedPaths.has(path);
  };

  return (
    <SessionContext.Provider value={{ hasVisited }}>
      {children}
    </SessionContext.Provider>
  );
}
