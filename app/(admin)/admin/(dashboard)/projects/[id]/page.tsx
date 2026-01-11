import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProjectPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  await requireAdmin({ permissions: ["projects.write"] });

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      Tenant: true,
    },
  });

  if (!project) {
    notFound();
  }

  const tenants = await prisma.tenant.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">Manage project details.</p>
        </div>
      </div>

      <ProjectForm tenants={tenants} initialData={project} />
    </div>
  );
}
