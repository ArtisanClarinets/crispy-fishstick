"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function ContractFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [expiring, setExpiring] = useState(searchParams.get("expiring") || "false");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      
      if (status && status !== "all") {
        params.set("status", status);
      } else {
        params.delete("status");
      }

      if (expiring === "true") {
        params.set("expiring", "true");
      } else {
        params.delete("expiring");
      }
      
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, expiring, router, searchParams]);

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setExpiring("false");
    router.push("?");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input 
          placeholder="Search contract title or client..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        <Select value={expiring} onValueChange={setExpiring}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Expiration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Any Date</SelectItem>
            <SelectItem value="true">Expiring Soon (30d)</SelectItem>
          </SelectContent>
        </Select>
        
        {(search || status !== "all" || expiring === "true") && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
