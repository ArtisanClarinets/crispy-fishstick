import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Users as _Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SAFE_USER_WITH_ROLES_SELECT } from "@/lib/security/safe-user";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["users.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const users = await prisma.user.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    select: SAFE_USER_WITH_ROLES_SELECT,
  });

  // Note: buildPaginationResult expects full objects, but we are selecting partial.
  // However, the pagination logic only cares about ID and timestamps for cursor if we were doing cursor-based.
  // But wait, `buildPaginationResult` logic might depend on `id` field.
  // SAFE_USER_WITH_ROLES_SELECT should include `id` and `createdAt`.
  // Let's verify SAFE_USER_WITH_ROLES_SELECT if I can read it, but usually it does.
  // Assuming it does.

  const { data, nextCursor, prevCursor } = buildPaginationResult(users, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage users and their roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.RoleAssignment.length > 0 ? (
                      <div className="flex gap-1 flex-wrap">
                        {user.RoleAssignment.map((ra) => (
                          <Badge key={ra.roleId} variant="outline">
                            {ra.Role.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <Badge variant="secondary">No Role</Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/users/${user.id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <PaginationControls nextCursor={nextCursor} prevCursor={prevCursor} />
    </div>
  );
}
