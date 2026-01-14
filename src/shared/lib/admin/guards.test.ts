import { describe, it, expect, vi, beforeEach } from 'vitest';
import { requireAdmin, getSessionUser } from './guards';
import { getServerSession } from 'next-auth';
import { prisma } from '@/shared/lib/prisma';

// Mock next-auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: vi.fn(),
    },
    role: {
      findMany: vi.fn(),
    },
  },
}));

// Mock authOptions
vi.mock('@/lib/auth', () => ({
  authOptions: {},
}));

describe('Admin Guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSessionUser', () => {
    it('should return null if no session exists', async () => {
      (getServerSession as any).mockResolvedValue(null);
      const user = await getSessionUser();
      expect(user).toBeNull();
    });

    it('should return null if user not found in db', async () => {
      (getServerSession as any).mockResolvedValue({ user: { email: 'test@example.com' } });
      (prisma.user.findFirst as any).mockResolvedValue(null);
      
      const user = await getSessionUser();
      expect(user).toBeNull();
    });

    it('should return user context with permissions', async () => {
      (getServerSession as any).mockResolvedValue({ user: { email: 'admin@example.com' } });
      
      const mockUser = {
        id: 'user-1',
        email: 'admin@example.com',
        name: 'Admin User',
        tenantId: null,
        RoleAssignment: [
          {
            Role: {
              name: 'Admin',
              permissions: JSON.stringify(['leads.view', 'leads.edit']),
            },
          },
        ],
        JitAccessRequest: [],
      };

      (prisma.user.findFirst as any).mockResolvedValue(mockUser);

      const user = await getSessionUser();
      expect(user).not.toBeNull();
      expect(user?.email).toBe('admin@example.com');
      expect(user?.roles).toContain('Admin');
      expect(user?.permissions).toContain('leads.view');
      expect(user?.permissions).toContain('leads.edit');
    });

    it('should include JIT permissions', async () => {
        (getServerSession as any).mockResolvedValue({ user: { email: 'jit@example.com' } });
        
      const mockUser = {
        id: 'user-jit',
        email: 'jit@example.com',
        name: 'JIT User',
        tenantId: null,
        RoleAssignment: [],
        JitAccessRequest: [
            {
                roleId: 'role-jit',
                status: 'approved',
                expiresAt: new Date(Date.now() + 10000), // future
            }
        ],
      };
  
        (prisma.user.findFirst as any).mockResolvedValue(mockUser);
        
        const mockJitRoles = [
            {
                id: 'role-jit',
                permissions: JSON.stringify(['jit.access']),
            }
        ];
        (prisma.role.findMany as any).mockResolvedValue(mockJitRoles);
  
        const user = await getSessionUser();
        expect(user).not.toBeNull();
        expect(user?.permissions).toContain('jit.access');
      });
  });

  describe('requireAdmin', () => {
    it('should throw "Unauthorized" if no user', async () => {
      (getServerSession as any).mockResolvedValue(null);
      await expect(requireAdmin()).rejects.toThrow('Unauthorized');
    });

    it('should throw "Forbidden" if missing permissions', async () => {
       (getServerSession as any).mockResolvedValue({ user: { email: 'user@example.com' } });
       
       const mockUser = {
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        tenantId: null,
        RoleAssignment: [],
        JitAccessRequest: [],
      };
      
      (prisma.user.findFirst as any).mockResolvedValue(mockUser);
      
      await expect(requireAdmin({ permissions: ['admin.super'] })).rejects.toThrow('Forbidden');
    });

    it('should pass if user has permissions', async () => {
       (getServerSession as any).mockResolvedValue({ user: { email: 'admin@example.com' } });
       
       const mockUser = {
        id: 'user-1',
        email: 'admin@example.com',
        name: 'Admin User',
        tenantId: null,
        RoleAssignment: [
          {
            Role: {
              name: 'Admin',
              permissions: JSON.stringify(['admin.super']),
            },
          },
        ],
        JitAccessRequest: [],
      };
      
      (prisma.user.findFirst as any).mockResolvedValue(mockUser);
      
      const user = await requireAdmin({ permissions: ['admin.super'] });
      expect(user.email).toBe('admin@example.com');
    });
  });
});
