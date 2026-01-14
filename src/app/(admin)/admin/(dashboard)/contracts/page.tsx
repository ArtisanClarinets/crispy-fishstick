import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { formatDate } from "@/shared/lib/utils";

import { ContractFilters } from "@/widgets/admin/contracts/contract-filters";
import { CheckExpiringButton } from "@/widgets/admin/contracts/check-expiring-button";
import { addDays } from "date-fns";
import { PaginationControls } from "@/shared/ui/pagination-controls";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";

export const dynamic = "force-dynamic";

export default async function ContractsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["contracts.read"] });

  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;
  const expiring = typeof searchParams.expiring === "string" ? searchParams.expiring : undefined;

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const where: any = {};

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { Tenant: { name: { contains: search } } },
    ];
  }

  if (status && status !== "all") {
    where.status = status;
  }

  if (expiring === "true") {
    const today = new Date();
    const thirtyDaysFromNow = addDays(today, 30);
    where.endDate = {
      gte: today,
      lte: thirtyDaysFromNow,
    };
  }

  const contracts = await prisma.contract.findMany({
    where,
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      Tenant: true,
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(contracts, params);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "draft": return "secondary";
      case "terminated": return "destructive";
      case "expired": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground">Manage client contracts and agreements.</p>
        </div>
        <div className="flex gap-2">
          <CheckExpiringButton />
          <Button asChild>
            <Link href="/admin/contracts/new">
              <Plus className="mr-2 h-4 w-4" />
              New Contract
            </Link>
          </Button>
        </div>
      </div>

      <ContractFilters />

      <Card>
        <CardHeader>
          <CardTitle>All Contracts</CardTitle>
          <CardDescription>
            List of all contracts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No contracts found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {contract.title}
                        </div>
                    </TableCell>
                    <TableCell>{contract.Tenant?.name || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(contract.status) as any}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(contract.value)}
                    </TableCell>
                    <TableCell>{formatDate(contract.startDate)}</TableCell>
                    <TableCell>{contract.endDate ? formatDate(contract.endDate) : "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/contracts/${contract.id}`}>Edit</Link>
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
