import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Plus, FolderKanban } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { formatDate } from "@/shared/lib/utils";

import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { PaginationControls } from "@/shared/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function ProjectsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["projects.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const projects = await prisma.project.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      Tenant: true,
      _count: {
        select: { Assignment: true, TimeEntry: true },
      },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(projects, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage ongoing projects and resource allocation.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>
            Overview of all projects across tenants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team Size</TableHead>
                <TableHead>Time Entries</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No projects found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <FolderKanban className="h-4 w-4 text-muted-foreground" />
                            {project.name}
                        </div>
                    </TableCell>
                    <TableCell>{project.Tenant.name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        project.status === "active" ? "default" :
                        project.status === "completed" ? "secondary" : "outline"
                      }>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project._count.Assignment}</TableCell>
                    <TableCell>{project._count.TimeEntry}</TableCell>
                    <TableCell>{formatDate(project.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/projects/${project.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaginationControls nextCursor={nextCursor} prevCursor={prevCursor} />
    </div>
  );
}
