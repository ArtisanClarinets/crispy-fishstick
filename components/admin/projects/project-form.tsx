"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash2 } from "lucide-react";
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

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tenantId: z.string().min(1, "Tenant is required"),
  status: z.enum(["active", "completed", "archived"]).default("active"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface Tenant {
  id: string;
  name: string;
}

interface ProjectFormProps {
  tenants: Tenant[];
  initialData?: {
    id: string;
    name: string;
    tenantId: string;
    status: string;
  };
}

export function ProjectForm({ tenants, initialData }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      tenantId: initialData.tenantId,
      status: initialData.status as "active" | "completed" | "archived",
    } : {
      status: "active",
      name: "",
      tenantId: "",
    },
  });

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true);

    try {
      const url = initialData 
        ? `/api/admin/projects/${initialData.id}` 
        : "/api/admin/projects";
      const method = initialData ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(initialData ? "Failed to update project" : "Failed to create project");
      }

      toast({
        title: "Success",
        description: initialData ? "Project updated successfully" : "Project created successfully",
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    if (!initialData) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/projects/${initialData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      setIsDeleting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Project" : "Project Details"}</CardTitle>
        <CardDescription>
          {initialData ? "Update project details." : "Create a new project for a tenant."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="e.g. Website Redesign"
              {...register("name")}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenantId">Tenant</Label>
            <select
              id="tenantId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("tenantId")}
              disabled={isLoading}
            >
              <option value="">Select a tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
            {errors.tenantId && (
              <p className="text-sm text-destructive">{errors.tenantId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("status")}
              disabled={isLoading}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
            {errors.status && (
              <p className="text-sm text-destructive">{errors.status.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
             <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
                Cancel
             </Button>
             {initialData && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive" disabled={isLoading || isDeleting}>
                      {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
             )}
          </div>
          <Button type="submit" disabled={isLoading || isDeleting}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Project" : "Create Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
