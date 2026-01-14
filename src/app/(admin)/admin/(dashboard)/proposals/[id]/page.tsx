import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { formatCurrency, formatDate } from "@/shared/lib/utils";
import { ProposalActions } from "@/widgets/admin/proposals/proposal-actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default async function ProposalPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await requireAdmin({ permissions: ["proposals.read"] });

  const proposal = await prisma.proposal.findUnique({
    where: { id: params.id },
    include: {
      ProposalItem: true,
      ProposalApproval: {
        include: {
          User: true,
        },
      },
    },
  });

  if (!proposal) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/proposals">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{proposal.title}</h1>
            <Badge variant={
              proposal.status === "approved" ? "default" :
              proposal.status === "rejected" ? "destructive" :
              proposal.status === "sent" ? "secondary" : "outline"
            }>
              {proposal.status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Created on {formatDate(proposal.createdAt)}
          </p>
        </div>
        <ProposalActions proposalId={proposal.id} currentStatus={proposal.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <CardDescription>Breakdown of services and costs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proposal.ProposalItem.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.customName || "Service"}</TableCell>
                      <TableCell className="text-right">{item.hours}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(proposal.totalAmount)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Approvals</CardTitle>
              <CardDescription>Approval history.</CardDescription>
            </CardHeader>
            <CardContent>
              {proposal.ProposalApproval.length === 0 ? (
                <p className="text-sm text-muted-foreground">No approvals yet.</p>
              ) : (
                <div className="space-y-4">
                  {proposal.ProposalApproval.map((approval) => (
                    <div key={approval.id} className="flex items-start gap-2 text-sm border-b pb-2 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{approval.User.name || approval.User.email}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(approval.createdAt)}</p>
                        {approval.comment && <p className="mt-1 text-muted-foreground italic">&quot;{approval.comment}&quot;</p>}
                      </div>
                      <Badge variant={approval.status === "approved" ? "default" : "destructive"}>
                        {approval.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
