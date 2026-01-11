import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function RoleAssignmentsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["users.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const roleAssignments = await prisma.roleAssignment.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      User: { select: { name: true, email: true } },
      Role: { select: { name: true } },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(roleAssignments, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Role Assignments</h1>
          <p className="text-muted-foreground">Manage user roles and permissions scopes.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Assignments</CardTitle>
          <CardDescription>
            Global and scoped role assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Scope Type</TableHead>
                <TableHead>Scope ID</TableHead>
                <TableHead>Assigned At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No role assignments found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{assignment.User.name}</span>
                        <span className="text-xs text-muted-foreground">{assignment.User.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{assignment.Role.name}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge>{assignment.scopeType}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{assignment.scopeId || "N/A"}</TableCell>
                    <TableCell>{formatDate(assignment.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaginationControls nextCursor={nextCursor} prevCursor={prevCursor} />
    </div>
  );
}
