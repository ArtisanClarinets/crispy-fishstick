import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function WebhookDeliveriesPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["webhooks.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const deliveries = await prisma.webhookDelivery.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      WebhookEndpoint: { select: { url: true } },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(deliveries, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Webhook Deliveries</h1>
          <p className="text-muted-foreground">Log of webhook delivery attempts.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Log</CardTitle>
          <CardDescription>
            Recent webhook delivery attempts and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No deliveries found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.event}</TableCell>
                    <TableCell className="font-mono text-xs max-w-[200px] truncate" title={delivery.WebhookEndpoint.url}>
                      {delivery.WebhookEndpoint.url}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        delivery.status === "success" ? "default" :
                        delivery.status === "pending" ? "secondary" : "destructive"
                      }>
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{delivery.statusCode || "-"}</TableCell>
                    <TableCell>{delivery.attempts}</TableCell>
                    <TableCell>{formatDate(delivery.createdAt)}</TableCell>
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
