import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function IncidentsPage() {
  await requireAdmin({ permissions: ["incidents.read"] });

  const incidents = await prisma.incident.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      Service: true,
      User: true,
    },
  });

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
              {incidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No incidents found.
                  </TableCell>
                </TableRow>
              ) : (
                incidents.map((incident) => (
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
    </div>
  );
}
