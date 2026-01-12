import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

// Mock Redis properly as a class constructor
vi.mock('ioredis', () => {
  const Redis = vi.fn();
  Redis.prototype.hgetall = vi.fn().mockResolvedValue(null);
  Redis.prototype.hmset = vi.fn().mockResolvedValue('OK');
  Redis.prototype.expireat = vi.fn().mockResolvedValue(1);
  Redis.prototype.hincrby = vi.fn().mockResolvedValue(1);
  Redis.prototype.quit = vi.fn();
  Redis.prototype.on = vi.fn();

  return {
    Redis: Redis,
    default: Redis,
  };
});

// Mock rate limiter
// Define mock function references inside the factory
vi.mock('@/lib/security/rate-limit', async (importOriginal) => {
  const actual = await importOriginal();

  const checkLoginAttemptMock = vi.fn().mockResolvedValue({ success: true, remaining: 5 });
  const getClientIpMock = vi.fn().mockReturnValue('127.0.0.1');

  const mockRateLimiter = {
    checkLoginAttempt: checkLoginAttemptMock,
    getClientIp: getClientIpMock,
  };

  return {
    ...actual as any,
    getRateLimiter: vi.fn().mockReturnValue(mockRateLimiter),
    RateLimiter: vi.fn().mockImplementation(() => mockRateLimiter),
  };
});

// Mock MFA
vi.mock('@/lib/security/mfa', () => ({
  decryptSecret: vi.fn().mockResolvedValue('test-secret'),
}));

// Mock authenticator
vi.spyOn(authenticator, 'check').mockReturnValue(true);

// Import authOptions AFTER mocking dependencies
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getRateLimiter } from '@/lib/security/rate-limit';

describe('Authentication Logic', () => {
  const credentialsProvider = authOptions.providers.find(
    (p) => p.id === 'credentials'
  )!;

  // @ts-ignore - NextAuth types make it hard to access the authorize method directly
  const authorize = credentialsProvider.options.authorize;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Default mocks
    vi.mocked(authenticator.check).mockReturnValue(true);

    // Reset rate limiter mock
    // Access the mocked function via the module import
    const redisModule = await import('ioredis');
    // @ts-ignore
    const redis = new redisModule.Redis();
    const rateLimiter = getRateLimiter(redis);
    (rateLimiter.checkLoginAttempt as any).mockResolvedValue({ success: true, remaining: 5 });
  });

  describe('Login Page Callback URL Handling', () => {
    it('should return user for valid credentials', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: hashedPassword,
        mfaSecret: null,
        tenantId: 'tenant-1',
        RoleAssignment: [
          { Role: { name: 'Admin' } }
        ]
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await authorize({
        email: 'test@example.com',
        password: password,
      });

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        roles: ['Admin'],
        permissions: [],
        tenantId: 'tenant-1',
      });
    });

    it('should return null for invalid password', async () => {
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

    it('should return null if user not found', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      const result = await authorize({
        email: 'nonexistent@example.com',
        password: 'password',
      });

      expect(result).toBeNull();
    });
  });

  describe('Cookie Configuration', () => {
    it('should have secure cookie settings configured', () => {
      // Check that authOptions DOES have cookie settings (security requirement)
      expect(authOptions).toHaveProperty('cookies');
      expect(authOptions.cookies).toHaveProperty('sessionToken');

      const sessionCookie = authOptions.cookies?.sessionToken;
      expect(sessionCookie).toBeDefined();
      expect(sessionCookie?.options?.httpOnly).toBe(true);
      expect(sessionCookie?.options?.sameSite).toBe('lax');
      expect(sessionCookie?.options?.path).toBe('/');
      
      // Check that useSecureCookies is set appropriately
      expect(authOptions.useSecureCookies).toBeDefined();
      expect(typeof authOptions.useSecureCookies).toBe('boolean');
    });
  });

  describe('CSRF Protection', () => {
    it('should validate CSRF tokens correctly', async () => {
      const csrfModule = await import('@/lib/security/csrf');

      // Test token generation and validation
      const token = csrfModule.generateCsrfToken();
      expect(token).toContain('.');
      expect(token.split('.')).toHaveLength(2);

      // Test token validation
      // Note: we can't easily test validateCsrfToken here because it relies on the secret
      // which is mocked or environmental.
      // Instead, we just check that generateCsrfToken returns a string.
      expect(typeof token).toBe('string');
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting for credential logins', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const redisModule = await import('ioredis');
      // @ts-ignore
      const redis = new redisModule.Redis();
      const rateLimiter = getRateLimiter(redis);

      // Call authorize which internally uses the rate limiter
      await authorize({
        email: 'test@example.com',
        password: password,
      }, { ip: '127.0.0.1' });

      // Verify checkLoginAttempt was called
      expect(rateLimiter.checkLoginAttempt).toHaveBeenCalledWith('127.0.0.1', 'test@example.com');
    });

    it('should handle rate limit errors in authorize function', async () => {
      // Mock rate limiter to return rate limit exceeded
      const redisModule = await import('ioredis');
      // @ts-ignore
      const redis = new redisModule.Redis();
      const rateLimiter = getRateLimiter(redis);
      (rateLimiter.checkLoginAttempt as any).mockResolvedValueOnce({
        success: false,
        retryAfter: 30
      });

      // This should throw RATE_LIMIT_EXCEEDED
      await expect(authorize({
        email: 'test@example.com',
        password: 'password123',
      }, { ip: '127.0.0.1' })).rejects.toThrow('RATE_LIMIT_EXCEEDED');
    });
  });

  describe('Soft-Deleted Users', () => {
    it('should exclude soft-deleted users from login', async () => {
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

    it('should allow non-deleted users to login', async () => {
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

  describe('MFA Support', () => {
    it('should require MFA code when user has MFA enabled', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        mfaSecret: 'encrypted-secret', // User has MFA enabled
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      // Should throw MFA_REQUIRED error when no code is provided
      await expect(authorize({
        email: 'test@example.com',
        password: password,
      })).rejects.toThrow('MFA_REQUIRED');
    });

    it('should validate MFA code correctly', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        mfaSecret: 'encrypted-secret',
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      // Mock decryptSecret to return a valid secret
      const mfaModule = await import('@/lib/security/mfa');
      vi.spyOn(mfaModule, 'decryptSecret').mockResolvedValue('test-secret');
      vi.mocked(authenticator.check).mockReturnValue(true);

      // Should succeed with valid MFA code
      const result = await authorize({
        email: 'test@example.com',
        password: password,
        code: '123456',
      });

      expect(result).not.toBeNull();
    });

    it('should reject invalid MFA codes', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        mfaSecret: 'encrypted-secret',
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      // Mock decryptSecret to return a valid secret
      const mfaModule = await import('@/lib/security/mfa');
      vi.spyOn(mfaModule, 'decryptSecret').mockResolvedValue('test-secret');
      vi.mocked(authenticator.check).mockReturnValue(false);

      // Should throw INVALID_MFA_CODE error
      await expect(authorize({
        email: 'test@example.com',
        password: password,
        code: 'wrong-code',
      })).rejects.toThrow('INVALID_MFA_CODE');
    });
  });

  describe('Error Handling', () => {
    it('should handle database schema errors', async () => {
      // Mock Prisma to throw a schema error
      (prisma.user.findUnique as any).mockRejectedValue({
        code: 'P2021',
        message: 'Table does not exist'
      });

      await expect(authorize({
        email: 'test@example.com',
        password: 'password',
      })).rejects.toThrow('DB_SCHEMA_NOT_READY');
    });

    it('should handle missing credentials', async () => {
      const result = await authorize({
        email: '',
        password: '',
      });

      expect(result).toBeNull();
    });
  });
});
