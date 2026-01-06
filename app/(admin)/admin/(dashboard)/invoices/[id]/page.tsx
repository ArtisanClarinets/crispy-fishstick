import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoiceActions } from "@/components/admin/invoices/invoice-actions";

export default async function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  await requireAdmin({ permissions: ["invoices.read"] });

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      Tenant: true,
      InvoiceItem: true,
    },
  });

  if (!invoice) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-bold tracking-tight">Invoice Details</h1>
        <InvoiceActions invoiceId={invoice.id} status={invoice.status} />
      </div>

      <div className="space-y-6 print:space-y-4">
        <Card className="print:shadow-none print:border-none">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">INVOICE</CardTitle>
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{invoice.number}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-semibold text-lg">{invoice.Tenant.name}</div>
              <div className="mt-4">
                <Badge variant={
                  invoice.status === "paid" ? "default" :
                  invoice.status === "overdue" ? "destructive" :
                  invoice.status === "sent" ? "secondary" : "outline"
                } className="print:border-black print:text-black">
                  {invoice.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Issue Date</p>
                <p className="font-medium">{formatDate(invoice.issueDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Due Date</p>
                <p className="font-medium">{formatDate(invoice.dueDate)}</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.InvoiceItem.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(invoice.totalAmount)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {invoice.notes && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-1">Notes</p>
                <p className="text-sm text-muted-foreground">{invoice.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
