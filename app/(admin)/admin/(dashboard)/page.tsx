import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Activity, Briefcase, ShieldAlert, Plus, Camera, Clock } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guards";
import { TrustWidget } from "@/components/trust-widget";
import Link from "next/link";

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
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground transition-colors">Dashboard</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Overview</span>
        </div>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
            <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[var(--signal-success)] animate-pulse"></span>
                <span className="text-sm font-medium text-[var(--signal-success)]">Operational</span>
            </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed border-2 hover:border-solid hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Link href="/admin/invoices/new">
                <Plus className="h-5 w-5" />
                <span>New Invoice</span>
            </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed border-2 hover:border-solid hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Link href="/admin/media/new">
                <Camera className="h-5 w-5" />
                <span>Add Photo</span>
            </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed border-2 hover:border-solid hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Link href="/admin/time-entries/new">
                <Clock className="h-5 w-5" />
                <span>Edit Hours</span>
            </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed border-2 hover:border-solid hover:border-primary/50 hover:bg-primary/5 transition-all">
             <Link href="/admin/incidents/new">
                <ShieldAlert className="h-5 w-5" />
                <span>Report Incident</span>
            </Link>
        </Button>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-precision">
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
        
        <Card className="card-precision">
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
        
        <Card className="card-precision">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjectsCount}</div>
            <p className="text-xs text-[var(--signal-success)]">
              In progress
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-precision">
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
        <Card className="col-span-4 card-precision">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest audit logs and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAuditLogs.map((log) => (
                <div key={log.id} className="flex items-center border-b border-border/50 pb-4 last:border-0 last:pb-0">
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
        
        <div className="col-span-3 flex flex-col gap-4">
            <TrustWidget />

            <Card className="card-precision flex-1">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Infrastructure status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-[var(--signal-success)] h-2 rounded-full" style={{ width: '99%' }}></div>
                    </div>
                    <span className="text-xs font-mono">99.9%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All systems operational. No latency detected in US-EAST-1.
                </p>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
