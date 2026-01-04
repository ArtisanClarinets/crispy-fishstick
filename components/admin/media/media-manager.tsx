'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';

interface MediaAsset {
  id: string;
  key: string;
  url: string;
  mime: string;
  size: number;
  uploadedBy: string | null;
  createdAt: string;
}

export function MediaManager() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAssets = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setAssets(data);
      }
    } catch (error) {
      console.error("Failed to fetch assets", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      fetchAssets();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file",
      });
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Media Library</h2>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Button disabled={isUploading} asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload Asset'}
            </label>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading assets...</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No media assets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden group">
              <CardContent className="p-0 aspect-square relative">
                {asset.mime.startsWith('image/') ? (
                  <div className="relative w-full h-full bg-muted/10">
                    <Image
                      src={asset.url}
                      alt={asset.key}
                      fill
                      className="object-cover"
                      unoptimized // For local uploads
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted/20">
                    <FileIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   {/* Add delete/copy buttons here later */}
                   <span className="text-white text-xs px-2 truncate w-full text-center">
                    {formatSize(asset.size)}
                   </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
