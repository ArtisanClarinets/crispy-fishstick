"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function MediaUploader() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("File uploaded successfully");
      router.refresh();
      setOpen(false);
    } catch (_error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Select an image or file to upload to the media library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*,application/pdf"
          />
          {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
