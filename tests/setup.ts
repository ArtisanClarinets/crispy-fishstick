import "@testing-library/jest-dom";
import path from 'path';
import dotenv from 'dotenv';
import { vi } from 'vitest';

// Load env vars from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Ensure secure defaults if env missing
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "e67jcdS2iFcrpNRvcvtgv2/7qMsaFBg2wSVho0wZKAU=";
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

// Global mock for ioredis to prevent connection errors
vi.mock('ioredis', () => {
  const Redis = vi.fn();
  Redis.prototype.hgetall = vi.fn().mockResolvedValue({});
  Redis.prototype.hmset = vi.fn().mockResolvedValue('OK');
  Redis.prototype.expireat = vi.fn().mockResolvedValue(1);
  Redis.prototype.hincrby = vi.fn().mockResolvedValue(1);
  Redis.prototype.quit = vi.fn();
  Redis.prototype.on = vi.fn();
  Redis.prototype.disconnect = vi.fn();

  return {
    Redis: Redis,
    default: Redis,
  };
});

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
