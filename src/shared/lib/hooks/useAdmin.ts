import { useSession } from "next-auth/react";

export function useAdmin() {
  const { data: session, status } = useSession();

  const user = session?.user;

  const hasPermission = (permission: string) => {
    if (!user?.permissions) return false;
    if (user.permissions.includes("*")) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string) => {
    if (!user?.roles) return false;
    return user.roles.includes(role);
  };

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    hasPermission,
    hasRole,
  };
}
