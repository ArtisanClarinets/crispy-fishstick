import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function TimeEntriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await requireAdmin({ permissions: ["time.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const timeEntries = await prisma.timeEntry.findMany({
    ...prismaParams,
    orderBy: { date: "desc" },
    include: {
      User: {
        select: { name: true, email: true },
      },
      Project: {
        select: { name: true, Tenant: { select: { name: true } } },
      },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(timeEntries, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Time Entries</h1>
          <p className="text-muted-foreground">Monitor time tracking across projects.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
          <CardDescription>
            List of all time entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Billable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No time entries found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{entry.User.name}</span>
                        <span className="text-xs text-muted-foreground">{entry.User.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{entry.Project.name}</TableCell>
                    <TableCell>{entry.Project.Tenant.name}</TableCell>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell>{entry.hours}</TableCell>
                    <TableCell>
                      <Badge variant={
                        entry.status === "approved" ? "default" :
                        entry.status === "rejected" ? "destructive" :
                        entry.status === "submitted" ? "secondary" : "outline"
                      }>
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        {entry.billable ? (
                            <Badge variant="outline">Yes</Badge>
                        ) : (
                            <span className="text-muted-foreground text-sm">No</span>
                        )}
                    </TableCell>
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
