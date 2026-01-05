"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Proposal } from "@prisma/client";

interface ProposalsExportButtonProps {
  proposals: Proposal[];
}

export function ProposalsExportButton({ proposals }: ProposalsExportButtonProps) {
  const handleExport = () => {
    const headers = ["ID", "Title", "Status", "Total Amount", "Created At"];
    const csvContent = [
      headers.join(","),
      ...proposals.map(p => [
        p.id,
        `"${p.title.replace(/"/g, '""')}"`,
        p.status,
        p.totalAmount,
        new Date(p.createdAt).toISOString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "proposals_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}
