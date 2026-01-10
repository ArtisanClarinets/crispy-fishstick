
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe('Authentication Logic', () => {
  const credentialsProvider = authOptions.providers.find(
    (p) => p.id === 'credentials'
  )!;

  // @ts-ignore - NextAuth types make it hard to access the authorize method directly
  const authorize = credentialsProvider.options.authorize;

  beforeEach(() => {
    vi.clearAllMocks();
  });

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
