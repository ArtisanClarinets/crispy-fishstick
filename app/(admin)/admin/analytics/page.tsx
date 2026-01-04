import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Users, FolderKanban, Receipt, Activity } from "lucide-react";

export default async function AnalyticsPage() {
  await requireAdmin({ permissions: ["analytics.read"] });

  const [
    leadStats,
    projectStats,
    invoiceStats,
    auditStats
  ] = await Promise.all([
    // Leads
    prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    }),
    // Projects
    prisma.project.groupBy({
      by: ['status'],
      _count: true,
    }),
    // Invoices
    prisma.invoice.findMany({
      select: {
        status: true,
        totalAmount: true,
      }
    }),
    // Recent Activity (last 24h)
    prisma.auditLog.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    })
  ]);

  // Process Stats
  const totalLeads = leadStats.reduce((acc, curr) => acc + curr._count, 0);
  const newLeads = leadStats.find(s => s.status === 'new')?._count || 0;
  const wonLeads = leadStats.find(s => s.status === 'won')?._count || 0;

  const totalProjects = projectStats.reduce((acc, curr) => acc + curr._count, 0);
  const activeProjects = projectStats.find(s => s.status === 'active')?._count || 0;

  const totalRevenue = invoiceStats
    .filter(i => i.status === 'paid')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);
  
  const pendingRevenue = invoiceStats
    .filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(pendingRevenue)} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Pipeline</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {newLeads} new, {wonLeads} won
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              out of {totalProjects} total projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats}</div>
            <p className="text-xs text-muted-foreground">
              actions in last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
