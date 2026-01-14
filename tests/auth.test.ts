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
  class Redis {
    constructor() {}
    hgetall = vi.fn().mockResolvedValue(null);
    hmset = vi.fn().mockResolvedValue('OK');
    expireat = vi.fn().mockResolvedValue(1);
    hincrby = vi.fn().mockResolvedValue(1);
    quit = vi.fn();
    on = vi.fn();
    disconnect = vi.fn();
  }

  return {
    Redis: Redis,
    default: Redis,
  };
});

// Create a persistent mock instance using vi.hoisted
const { mockRateLimiterInstance } = vi.hoisted(() => ({
  mockRateLimiterInstance: {
    checkLoginAttempt: vi.fn().mockResolvedValue({ success: true, remaining: 5 }),
    getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
  },
}));

vi.mock('@/lib/security/rate-limit', () => ({
  getRateLimiter: vi.fn().mockReturnValue(mockRateLimiterInstance),
  RateLimiter: class {
    constructor() {}
    checkLoginAttempt(...args: any[]) { return mockRateLimiterInstance.checkLoginAttempt(...args); }
  }
}));

// Mock MFA
vi.mock('@/lib/security/mfa', () => ({
  decryptSecret: vi.fn().mockResolvedValue('test-secret'),
}));

// Mock authenticator
vi.spyOn(authenticator, 'check').mockReturnValue(true);

// Import authOptions AFTER mocking dependencies
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

describe('Authentication Logic', () => {
  const credentialsProvider = authOptions.providers.find(
    (p) => p.id === 'credentials'
  )!;

  // @ts-ignore - NextAuth types make it hard to access the authorize method directly
  const authorize = credentialsProvider.options.authorize;

  let hashedPassword = '';

  beforeEach(async () => {
    vi.clearAllMocks();
    mockRateLimiterInstance.checkLoginAttempt.mockReset();
    mockRateLimiterInstance.checkLoginAttempt.mockResolvedValue({ success: true, remaining: 5 });
    hashedPassword = await bcrypt.hash('password123', 10);
  });

  describe('Login Page Callback URL Handling', () => {
    it('should return user for valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: hashedPassword,
        mfaSecret: null,
        tenantId: 'tenant-1',
        RoleAssignment: [
          { Role: { name: 'Admin', permissions: '[]' } }
        ]
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await authorize({
        email: 'test@example.com',
        password: 'password123',
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

  describe('Custom Cookie Overrides', () => {
    it('should use NextAuth default cookie handling', () => {
      expect(authOptions.useSecureCookies).toBeDefined();
    });
  });

  describe('Soft-Deleted Users', () => {
    it('should exclude soft-deleted users from login', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        deletedAt: new Date(),
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const result = await authorize({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toBeNull();
    });
  });

  describe('MFA Support', () => {
    it('should require MFA code when user has MFA enabled', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        mfaSecret: 'encrypted-secret',
        RoleAssignment: []
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      await expect(authorize({
        email: 'test@example.com',
        password: 'password123',
      })).rejects.toThrow('MFA_REQUIRED');
    });
  });
});
