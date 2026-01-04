import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function ProposalsPage() {
  await requireAdmin({ permissions: ["proposals.read"] });

  const proposals = await prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      ProposalItem: true,
      ProposalApproval: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground">Manage client proposals and estimates.</p>
        </div>
        <Button asChild>
          <Link href="/admin/proposals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Link>
        </Button>
      </div>

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
              {proposals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No proposals found. Create your first one!
                  </TableCell>
                </TableRow>
              ) : (
                proposals.map((proposal) => (
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
    </div>
  );
}
