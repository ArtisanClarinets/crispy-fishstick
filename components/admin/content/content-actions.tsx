"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";
import { useAdmin } from "@/hooks/useAdmin";

interface ContentActionsProps {
  id: string;
}

export function ContentActions({ id }: ContentActionsProps) {
  const router = useRouter();
  const { hasPermission } = useAdmin();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      setDeleting(true);
      const res = await fetchWithCsrf(`/api/admin/content/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Content deleted");
      router.refresh();
    } catch (_error) {
      toast.error("Failed to delete content");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {hasPermission("content.edit") && (
        <Link href={`/admin/content/${id}`}>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      )}
      {hasPermission("content.delete") && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDelete}
          disabled={deleting}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
