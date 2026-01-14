import { prisma } from "@/shared/lib/prisma";
import { ContentForm } from "@/widgets/admin/content/content-form";
import { notFound } from "next/navigation";

interface EditContentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditContentPage(props: EditContentPageProps) {
  const params = await props.params;
  const item = await prisma.content.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  // Cast type/status to match Zod schema enum
  const formattedItem = {
    ...item,
    type: item.type as "post" | "page" | "article",
    status: item.status as "draft" | "published" | "archived",
    content: item.content || "",
    excerpt: item.excerpt || "",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Content</h1>
      <div className="max-w-3xl">
        <ContentForm initialData={formattedItem} />
      </div>
    </div>
  );
}
