"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function InvoiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  // Debounce search input
  // If useDebounce doesn't exist, I'll just use useEffect with timeout
  // Let's assume standard implementation or just use timeout here
  
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
      
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, router, searchParams]);

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    router.push("?");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input 
          placeholder="Search client or invoice number..." 
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
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="void">Void</SelectItem>
          </SelectContent>
        </Select>
        
        {(search || status !== "all") && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
