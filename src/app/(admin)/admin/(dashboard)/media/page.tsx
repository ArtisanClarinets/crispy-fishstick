import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { PaginationControls } from "@/shared/ui/pagination-controls";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["media.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const media = await prisma.mediaAsset.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(media, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="aspect-square bg-muted relative">
               {/* Placeholder for actual image rendering */}
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                 <ImageIcon className="h-8 w-8" />
               </div>
            </div>
            <div className="p-3 text-sm truncate">
              {item.key}
            </div>
          </Card>
        ))}
      </div>
      
      {data.length === 0 && (
        <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
                <p>No media assets found.</p>
            </CardContent>
        </Card>
      )}

      <PaginationControls nextCursor={nextCursor} prevCursor={prevCursor} />
    </div>
  );
}
