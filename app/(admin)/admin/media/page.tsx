import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { MediaUploader } from "@/components/admin/media/media-uploader";
import { MediaItem } from "@/components/admin/media/media-item";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await requireAdmin({ permissions: ["media.read"] });

  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage uploaded images and documents.</p>
        </div>
        <MediaUploader />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {assets.map((asset) => (
          <MediaItem key={asset.id} asset={asset} />
        ))}
        {assets.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground border rounded-lg border-dashed">
            No media files uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
