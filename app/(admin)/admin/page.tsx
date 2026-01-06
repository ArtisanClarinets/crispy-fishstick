import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Activity, Briefcase, ShieldAlert } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin({ permissions: ["admin.access"] });

  const [
    leadsCount,
    activeProjectsCount,
    openIncidentsCount,
    activeProposalsCount,
    recentAuditLogs
  ] = await Promise.all([
    prisma.lead.count({ where: { status: "new" } }),
    prisma.project.count({ where: { status: "active" } }),
    prisma.incident.count({ where: { status: "open" } }),
    prisma.proposal.count({ where: { status: "draft" } }),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsCount}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProposalsCount}</div>
            <p className="text-xs text-muted-foreground">
              Draft status
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjectsCount}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{openIncidentsCount}</div>
            <p className="text-xs text-muted-foreground">
              System alerts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest audit logs and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAuditLogs.map((log) => (
                <div key={log.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                  <Activity className="mr-4 h-4 w-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {log.action} <span className="text-muted-foreground">on</span> {log.resource}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      by {log.actorEmail || "System"} at {log.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    {log.ip}
                  </div>
                </div>
              ))}
              {recentAuditLogs.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No recent activity
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for quick actions */}
            <p className="text-sm text-muted-foreground">
              Select an option from the sidebar to manage resources.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
