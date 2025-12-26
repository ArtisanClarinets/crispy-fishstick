
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock IntersectionObserver for Playwright
if (typeof window !== "undefined") {
  const IntersectionObserverMock = function () {
    return {
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    };
  };

  (window as any).IntersectionObserver = IntersectionObserverMock;
}
