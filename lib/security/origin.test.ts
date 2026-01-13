import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { assertSameOrigin } from './origin';
import { NextRequest } from 'next/server';

describe('assertSameOrigin', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, NEXTAUTH_URL: 'https://example.com' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should pass if Origin matches NEXTAUTH_URL', () => {
    const req = new NextRequest('https://example.com/api/foo', {
      headers: { origin: 'https://example.com' },
    });
    expect(() => assertSameOrigin(req)).not.toThrow();
  });

  it('should fail if Origin does not match', () => {
    const req = new NextRequest('https://example.com/api/foo', {
      headers: { origin: 'https://evil.com' },
    });
    expect(() => assertSameOrigin(req)).toThrow('Invalid Origin header');
  });

  it('should pass if Referer starts with NEXTAUTH_URL (fallback)', () => {
    const req = new NextRequest('https://example.com/api/foo', {
      headers: { referer: 'https://example.com/admin/page' },
    });
    expect(() => assertSameOrigin(req)).not.toThrow();
  });

  it('should fail if Referer is external', () => {
    const req = new NextRequest('https://example.com/api/foo', {
      headers: { referer: 'https://evil.com/page' },
    });
    expect(() => assertSameOrigin(req)).toThrow('Invalid Referer header');
  });

  it('should fail if neither header is present', () => {
    const req = new NextRequest('https://example.com/api/foo');
    expect(() => assertSameOrigin(req)).toThrow('Missing Origin or Referer header');
  });
});
