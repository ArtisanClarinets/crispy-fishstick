import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function JitRequestsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await requireAdmin({ permissions: ["jit.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const requests = await prisma.jitAccessRequest.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      User: { select: { name: true, email: true } },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(requests, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">JIT Access Requests</h1>
          <p className="text-muted-foreground">Manage Just-In-Time access requests.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>
            Pending and processed access requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No requests found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{request.User.name}</span>
                        <span className="text-xs text-muted-foreground">{request.User.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate" title={request.reason}>
                      {request.reason}
                    </TableCell>
                    <TableCell>{request.durationMin} min</TableCell>
                    <TableCell>
                      <Badge variant={
                        request.status === "approved" ? "default" :
                        request.status === "rejected" ? "destructive" :
                        request.status === "pending" ? "secondary" : "outline"
                      }>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(request.createdAt)}</TableCell>
                    <TableCell>{request.expiresAt ? formatDate(request.expiresAt) : "-"}</TableCell>
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
