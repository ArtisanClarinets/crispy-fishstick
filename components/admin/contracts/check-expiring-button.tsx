"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "sonner";

export function CheckExpiringButton() {
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cron/contract-reminders");
      const data = await res.json();
      
      if (data.success) {
        toast.success(`Processed ${data.processed} expiring contracts.`);
      } else {
        toast.error("Failed to check expirations.");
      }
    } catch (_error) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleCheck} disabled={loading}>
      <Bell className="mr-2 h-4 w-4" />
      {loading ? "Checking..." : "Check Expirations"}
    </Button>
  );
}
