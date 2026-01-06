import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProjectPage() {
  await requireAdmin({ permissions: ["projects.write"] });

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
          <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
          <p className="text-muted-foreground">Create a new project for a tenant.</p>
        </div>
      </div>

      <ProjectForm tenants={tenants} />
    </div>
  );
}
