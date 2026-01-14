import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users, Shield, Key } from "lucide-react";
import { requireAdmin } from "@/shared/lib/admin/guards";

export default async function SettingsPage() {
  await requireAdmin({ permissions: ["settings.read"] });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/settings/users">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">User Management</CardTitle>
              </div>
              <CardDescription>
                Manage admin users, assign roles, and control access.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Card className="opacity-50 h-full">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Roles & Permissions</CardTitle>
            </div>
            <CardDescription>
              Configure RBAC roles and granular permissions. (Coming Soon)
            </CardDescription>
          </CardHeader>
        </Card>

        <Link href="/admin/settings/security">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Security</CardTitle>
              </div>
              <CardDescription>
                MFA settings, session policies, and password requirements.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
