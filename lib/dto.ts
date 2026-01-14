import 'server-only';

export type UserDTO = {
  id: string;
  name: string | null;
  email: string | null;
  roles: string[];
  // No sensitive fields like passwordHash, mfaSecret
};

export function toUserDTO(user: any): UserDTO {
  const roles = user.RoleAssignment?.map((ra: any) => ra.Role?.name) || [];
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles,
  };
}

export type LeadDTO = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

export function toLeadDTO(lead: any): LeadDTO {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    status: lead.status,
    createdAt: lead.createdAt,
  };
}

// Generic helper to pick fields
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach(key => {
    ret[key] = obj[key];
  });
  return ret;
}
