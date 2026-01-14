import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { formatDate } from "@/shared/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { PaginationControls } from "@/shared/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function WebhookEndpointsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["webhooks.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const endpoints = await prisma.webhookEndpoint.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      Tenant: { select: { name: true } },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(endpoints, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Webhook Endpoints</h1>
          <p className="text-muted-foreground">Manage webhook subscriptions.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
          <CardDescription>
            Registered webhook endpoints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No webhook endpoints found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((endpoint) => (
                  <TableRow key={endpoint.id}>
                    <TableCell className="font-mono text-xs">{endpoint.url}</TableCell>
                    <TableCell>{endpoint.Tenant.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {endpoint.events.split(",").map((event) => (
                          <Badge key={event} variant="secondary" className="text-xs">
                            {event.trim()}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                        {endpoint.active ? (
                            <Badge variant="default">Active</Badge>
                        ) : (
                            <Badge variant="outline">Inactive</Badge>
                        )}
                    </TableCell>
                    <TableCell>{formatDate(endpoint.createdAt)}</TableCell>
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
