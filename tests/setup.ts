import "@testing-library/jest-dom";
import path from 'path';
import dotenv from 'dotenv';

// Load env vars from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Ensure secure defaults if env missing
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "e67jcdS2iFcrpNRvcvtgv2/7qMsaFBg2wSVho0wZKAU=";
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

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
