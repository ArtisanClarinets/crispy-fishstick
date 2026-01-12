"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";
import { useAdmin } from "@/hooks/useAdmin";

interface MediaItemProps {
  asset: {
    id: string;
    url: string;
    key: string;
    mime: string;
    size: number;
    uploadedBy: string | null;
    createdAt: Date;
  };
}

export function MediaItem({ asset }: MediaItemProps) {
  const router = useRouter();
  const { hasPermission } = useAdmin();
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetchWithCsrf(`/api/admin/media/${asset.id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Delete failed");
      
      toast.success("File deleted");
      setOpen(false);
      router.refresh();
    } catch (_error) {
      toast.error("Failed to delete file");
    } finally {
      setDeleting(false);
    }
  };

  const isImage = asset.mime.startsWith("image/");

  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0 aspect-square relative bg-muted flex items-center justify-center">
        {isImage ? (
          <div className="relative w-full h-full">
             {/* eslint-disable-next-line */}
             <img 
               src={asset.url} 
               alt={asset.key} 
               className="object-cover w-full h-full"
             />
          </div>
        ) : (
          <FileText className="h-12 w-12 text-muted-foreground" />
        )}
      </CardContent>
      <CardFooter className="p-2 flex items-center justify-between">
        <div className="text-xs truncate max-w-[120px]" title={asset.key}>
          {asset.key}
        </div>
        
        <AlertDialog open={open} onOpenChange={setOpen}>
          {hasPermission("media.delete") && (
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete &quot;{asset.key}&quot; from the media library.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
