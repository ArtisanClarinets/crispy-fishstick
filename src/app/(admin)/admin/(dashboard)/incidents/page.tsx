import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { formatDate } from "@/shared/lib/utils";
import { PaginationControls } from "@/shared/ui/pagination-controls";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";

export const dynamic = "force-dynamic";

export default async function IncidentsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["incidents.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const incidents = await prisma.incident.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      Service: true,
      User: true,
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(incidents, params);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive"; // or orange
      case "medium": return "default"; // or yellow
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "open": return "destructive";
      case "investigating": return "default";
      case "mitigated": return "secondary";
      case "resolved": return "outline";
      case "closed": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted-foreground">Manage system incidents and postmortems.</p>
        </div>
        <Button asChild>
          <Link href="/admin/incidents/new">
            <Plus className="mr-2 h-4 w-4" />
            New Incident
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
          <CardDescription>
            List of all incidents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Commander</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No incidents found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            {incident.title}
                        </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(incident.severity) as any}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(incident.status) as any}>
                            {incident.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{incident.Service?.name || "-"}</TableCell>
                    <TableCell>{incident.User?.name || incident.User?.email || "-"}</TableCell>
                    <TableCell>{formatDate(incident.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/incidents/${incident.id}`}>Edit</Link>
                      </Button>
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
