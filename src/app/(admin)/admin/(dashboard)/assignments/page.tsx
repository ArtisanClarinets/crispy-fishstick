import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { formatDate } from "@/shared/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { PaginationControls } from "@/shared/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function AssignmentsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["projects.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const assignments = await prisma.assignment.findMany({
    ...prismaParams,
    orderBy: { startDate: "desc" },
    include: {
      User: { select: { name: true, email: true } },
      Project: { select: { name: true } },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(assignments, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resource Assignments</h1>
          <p className="text-muted-foreground">Manage project resource allocations.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
          <CardDescription>
            Active and past project assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No assignments found.
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
                    <TableCell>{assignment.Project.name}</TableCell>
                    <TableCell>{assignment.role || "-"}</TableCell>
                    <TableCell>{assignment.allocationPercentage}%</TableCell>
                    <TableCell>{formatDate(assignment.startDate)}</TableCell>
                    <TableCell>{assignment.endDate ? formatDate(assignment.endDate) : "Ongoing"}</TableCell>
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
