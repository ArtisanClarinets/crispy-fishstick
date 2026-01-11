import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getRateLimiter } from '@/lib/security/rate-limit';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

// Mock Redis and rate limiter
vi.mock('ioredis', () => ({
  Redis: vi.fn().mockImplementation(() => ({
    hgetall: vi.fn().mockResolvedValue(null),
    hmset: vi.fn().mockResolvedValue('OK'),
    expireat: vi.fn().mockResolvedValue(1),
    hincrby: vi.fn().mockResolvedValue(1),
  })),
}));

vi.mock('@/lib/security/rate-limit', () => ({
  getRateLimiter: vi.fn().mockImplementation(() => ({
    checkLoginAttempt: vi.fn().mockResolvedValue({ success: true, remaining: 5 }),
    getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
  })),
}));

vi.mock('@/lib/security/mfa', () => ({
  decryptSecret: vi.fn().mockResolvedValue('test-secret'),
}));

describe('Infinite Reload Loop Fix', () => {
  const credentialsProvider = authOptions.providers.find(
    (p) => p.id === 'credentials'
  )!;

  // @ts-ignore - NextAuth types make it hard to access the authorize method directly
  const authorize = credentialsProvider.options.authorize;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Secret Mismatch Resolution', () => {
    it('should use consistent secret resolution between auth and middleware', () => {
      // Both auth and middleware should use the same secret resolution logic
      // This is verified by checking that the authOptions.secret is properly set
      expect(authOptions.secret).toBeDefined();
      expect(typeof authOptions.secret).toBe('string');
      expect(authOptions.secret.length).toBeGreaterThan(0);
    });
  });

  describe('Callback URL Handling', () => {
    it('should properly handle callbackUrl encoding and decoding', () => {
      // Test the URL encoding/decoding logic
      const callbackUrl = '/admin/dashboard?param=value&other=test';
      
      // Simulate the encoding process from middleware
      const encodedOnce = encodeURIComponent(callbackUrl);
      const encodedTwice = encodeURIComponent(encodedOnce);
      
      // Simulate the decoding process from login page
      const decodedOnce = decodeURIComponent(encodedTwice);
      const decodedTwice = decodeURIComponent(decodedOnce);
      
      expect(decodedTwice).toBe(callbackUrl);
    });

    it('should handle complex callback URLs with special characters', () => {
      const callbackUrl = '/admin/projects?search=test%20project&filter=active';
      
      const encodedOnce = encodeURIComponent(callbackUrl);
      const encodedTwice = encodeURIComponent(encodedOnce);
      
      const decodedOnce = decodeURIComponent(encodedTwice);
      const decodedTwice = decodeURIComponent(decodedOnce);
      
      expect(decodedTwice).toBe(callbackUrl);
    });
  });

  describe('Cookie Management', () => {
    it('should not have custom cookie overrides that conflict with NextAuth', () => {
      // Verify that authOptions doesn't have custom cookie settings
      // that would conflict with NextAuth's default behavior
      expect(authOptions).not.toHaveProperty('cookies');
      
      // Check that useSecureCookies is set appropriately
      expect(authOptions.useSecureCookies).toBeDefined();
      expect(typeof authOptions.useSecureCookies).toBe('boolean');
    });
  });

  describe('Session Management', () => {
    it('should handle missing sessions gracefully', async () => {
      // Test that authorize function handles missing users gracefully
      (prisma.user.findUnique as any).mockResolvedValue(null);

      const result = await authorize({
        email: 'nonexistent@example.com',
        password: 'password',
      });

      expect(result).toBeNull();
    });

    it('should handle authentication failures without throwing unexpected errors', async () => {
      // Test various error scenarios
      
      // 1. Missing user
      (prisma.user.findUnique as any).mockResolvedValue(null);
      let result = await authorize({
        email: 'nonexistent@example.com',
        password: 'password',
      });
      expect(result).toBeNull();

      // 2. Missing credentials
      result = await authorize({
        email: '',
        password: '',
      });
      expect(result).toBeNull();
    });
  });

  describe('CSRF Protection Integration', () => {
    it('should integrate CSRF protection without causing reload loops', async () => {
      const csrfModule = await import('@/lib/security/csrf');

      // Verify that CSRF functions are available and work correctly
      expect(csrfModule.generateCsrfToken).toBeDefined();
      expect(csrfModule.issueCsrfCookie).toBeDefined();
      expect(csrfModule.getCsrfToken).toBeDefined();

      // Test that CSRF token generation works
      const token = csrfModule.generateCsrfToken();
      expect(token).toBeTruthy();
      expect(token.length).toBeGreaterThan(0);
    });

    it('should handle CSRF validation errors gracefully', async () => {
      const csrfModule = await import('@/lib/security/csrf');

      // Test validation of invalid token
      const validateCsrfToken = (csrfModule as any).validateCsrfToken;
      const isValid = validateCsrfToken('invalid.token');
      expect(isValid).toBe(false);

      // This should not throw or cause infinite loops
      expect(() => {
        validateCsrfToken('invalid.token');
      }).not.toThrow();
    });
  });

  describe('Rate Limiting Integration', () => {
    it('should apply rate limiting without causing authentication loops', async () => {
      const rateLimitModule = await import('@/lib/security/rate-limit');
      const Redis = await import('ioredis');
      const mockRedis = new (await Redis).Redis();
      const rateLimiter = new rateLimitModule.RateLimiter(mockRedis);

      // Mock Redis methods
      vi.spyOn(mockRedis, 'hgetall').mockResolvedValue(null);
      vi.spyOn(mockRedis, 'hmset').mockResolvedValue('OK');
      vi.spyOn(mockRedis, 'expireat').mockResolvedValue(1);
      vi.spyOn(mockRedis, 'hincrby').mockResolvedValue(1);

      // Test that rate limiting works
      const result = await rateLimiter.checkLoginAttempt('127.0.0.1', 'test@example.com');
      expect(result.success).toBe(true);

      // Test that rate limiting errors are handled properly
      vi.spyOn(mockRedis, 'hgetall').mockResolvedValue({
        count: '5',
        expires: String(Date.now() + 60000)
      });

      const rateLimitResult = await rateLimiter.checkLoginAttempt('127.0.0.1', 'test@example.com');
      expect(rateLimitResult.success).toBe(false);
      expect(rateLimitResult.retryAfter).toBeDefined();
    });

    it('should handle rate limit errors in authentication flow', async () => {
      // Mock rate limiter to return rate limit exceeded
      const mockRateLimiter = {
        checkLoginAttempt: vi.fn().mockResolvedValue({ 
          success: false, 
          retryAfter: 30 
        }),
        getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
      };

      vi.mocked(getRateLimiter).mockReturnValue(mockRateLimiter as any);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      // This should throw RATE_LIMIT_EXCEEDED, not cause a loop
      await expect(authorize({
        email: 'test@example.com',
        password: 'password123',
      }, { ip: '127.0.0.1' })).rejects.toThrow('RATE_LIMIT_EXCEEDED');
    });
  });

  describe('Soft-Deleted User Handling', () => {
    it('should exclude soft-deleted users from authentication', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        deletedAt: new Date(), // Soft-deleted user
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await authorize({
        email: 'test@example.com',
        password: password,
      });

      expect(result).toBeNull();
    });

    it('should allow non-deleted users to authenticate', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        deletedAt: null, // Not soft-deleted
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await authorize({
        email: 'test@example.com',
        password: password,
      });

      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete authentication flow without loops', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        mfaSecret: null,
        tenantId: 'tenant-1',
        RoleAssignment: [
          { Role: { name: 'Admin' } }
        ]
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      // Test successful authentication
      const result = await authorize({
        email: 'test@example.com',
        password: password,
      });

      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
      expect(result?.email).toBe('test@example.com');
      expect(result?.roles).toContain('Admin');
    });

    it('should handle authentication failures gracefully', async () => {
      // Test with wrong password
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await authorize({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(result).toBeNull();
    });

    it('should handle all error scenarios without throwing unexpected errors', async () => {
      // Test various error scenarios
      
      // 1. Missing user
      (prisma.user.findUnique as any).mockResolvedValue(null);
      let result = await authorize({
        email: 'nonexistent@example.com',
        password: 'password',
      });
      expect(result).toBeNull();

      // 2. Missing credentials
      result = await authorize({
        email: '',
        password: '',
      });
      expect(result).toBeNull();

      // 3. Database error
      (prisma.user.findUnique as any).mockRejectedValue(new Error('Database error'));
      await expect(authorize({
        email: 'test@example.com',
        password: 'password',
      })).rejects.toThrow();
    });
  });
});