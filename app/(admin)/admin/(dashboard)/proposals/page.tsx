import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

import { ProposalFilters } from "@/components/admin/proposals/proposal-filters";
import { ProposalsExportButton } from "@/components/admin/proposals/proposals-export-button";
import { DollarSign, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";

export const dynamic = "force-dynamic";

export default async function ProposalsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["proposals.read"] });

  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const where: any = {};

  if (search) {
    where.title = { contains: search };
  }

  if (status && status !== "all") {
    where.status = status;
  }

  const [proposals, stats, approvedCount, pendingCount, rejectedCount] = await Promise.all([
    prisma.proposal.findMany({
      where,
      ...prismaParams,
      orderBy: { createdAt: "desc" },
      include: {
        ProposalItem: true,
        ProposalApproval: true,
      },
    }),
    prisma.proposal.aggregate({
      _sum: {
        totalAmount: true,
      },
      _count: {
        id: true,
      },
    }),
    prisma.proposal.count({ where: { status: "approved" } }),
    prisma.proposal.count({ where: { status: "pending_approval" } }),
    prisma.proposal.count({ where: { status: "rejected" } }),
  ]);

  const { data, nextCursor, prevCursor } = buildPaginationResult(proposals, params);

  const totalClosed = approvedCount + rejectedCount;
  const winRate = totalClosed > 0 ? Math.round((approvedCount / totalClosed) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats._sum.totalAmount || 0)}</div>
            <p className="text-xs text-muted-foreground">
              {stats._count.id} proposals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate}%</div>
            <p className="text-xs text-muted-foreground">
              {approvedCount} won / {totalClosed} closed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">
              Won deals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting action
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground">Manage client proposals and estimates.</p>
        </div>
        <div className="flex gap-2">
          <ProposalsExportButton proposals={data} />
          <Button asChild>
            <Link href="/admin/proposals/new">
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
            </Link>
          </Button>
        </div>
      </div>

      <ProposalFilters />

      <Card>
        <CardHeader>
          <CardTitle>All Proposals</CardTitle>
          <CardDescription>
            A list of all proposals including their status and value.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No proposals found. Create your first one!
                  </TableCell>
                </TableRow>
              ) : (
                data.map((proposal) => (
                  <TableRow key={proposal.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {proposal.title}
                        </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        proposal.status === "approved" ? "default" :
                        proposal.status === "rejected" ? "destructive" :
                        proposal.status === "sent" ? "secondary" : "outline"
                      }>
                        {proposal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(proposal.totalAmount)}</TableCell>
                    <TableCell>{proposal.ProposalItem.length}</TableCell>
                    <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/proposals/${proposal.id}`}>View</Link>
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
