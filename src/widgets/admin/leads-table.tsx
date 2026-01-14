"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/use-toast";
import { fetchWithCsrf } from "@/shared/lib/fetchWithCsrf";
import { useAdmin } from "@/shared/lib/hooks/useAdmin";

type Lead = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  budget: string | null;
  status: string;
  createdAt: Date;
};

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const { hasPermission } = useAdmin();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const res = await fetchWithCsrf("/api/admin/leads", {
        method: "PATCH",
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast({
        title: "Status updated",
        description: "The lead status has been updated successfully.",
      });
      
      router.refresh();
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to update lead status.",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialLeads.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              No leads found
            </TableCell>
          </TableRow>
        ) : (
          initialLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.role || "-"}</TableCell>
              <TableCell>{lead.budget}</TableCell>
              <TableCell>
                <select
                  className="bg-transparent border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  disabled={updating === lead.id || !hasPermission("leads.write")}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
