import { Prisma } from '@prisma/client';

export const SAFE_USER_SELECT = {
  id: true,
  email: true,
  name: true,
  tenantId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export const SAFE_USER_WITH_ROLES_SELECT = {
  ...SAFE_USER_SELECT,
  RoleAssignment: {
    select: {
      roleId: true,
      Role: {
        select: {
          name: true,
        },
      },
    },
  },
} satisfies Prisma.UserSelect;

export type SafeUserDto = Prisma.UserGetPayload<{
  select: typeof SAFE_USER_SELECT;
}>;

export type SafeUserWithRolesDto = Prisma.UserGetPayload<{
  select: typeof SAFE_USER_WITH_ROLES_SELECT;
}>;
