import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";

export const dynamic = "force-dynamic";

export default async function AuditLogsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["audit.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const logs = await prisma.auditLog.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(logs, params);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">View system activity and security events.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{log.actorEmail}</span>
                      <span className="text-xs text-muted-foreground">{log.ip}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{log.resource}</span>
                      <span className="text-xs text-muted-foreground">{log.resourceId}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate font-mono text-xs">
                    {log.after ? JSON.stringify(JSON.parse(log.after), null, 2) : "-"}
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No logs found.
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
