"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Printer, Send, CreditCard, Ban } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { fetchWithCsrf } from "@/shared/lib/fetchWithCsrf";
import { useAdmin } from "@/shared/lib/hooks/useAdmin";

interface InvoiceActionsProps {
  invoiceId: string;
  status: string;
}

export function InvoiceActions({ invoiceId, status: _status }: InvoiceActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { hasPermission } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const updateStatus = async (newStatus: string) => {
    try {
      setIsLoading(true);
      const response = await fetchWithCsrf(`/api/admin/invoices/${invoiceId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast({
        title: "Status updated",
        description: `Invoice status changed to ${newStatus}`,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update invoice status",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print / Export
      </Button>
      
      {hasPermission("invoices.edit") && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={isLoading}>
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => updateStatus("sent")}>
              <Send className="mr-2 h-4 w-4" />
              Mark as Sent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus("paid")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Mark as Paid
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => updateStatus("void")} className="text-destructive">
              <Ban className="mr-2 h-4 w-4" />
              Void Invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
