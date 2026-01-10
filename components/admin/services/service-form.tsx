"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ownerId: z.string().optional().nullable(),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  lifecycle: z.enum(["production", "staging", "development", "deprecated"]),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  initialData?: any;
  users: { id: string; name: string | null; email: string | null }[];
}

export function ServiceForm({ initialData, users }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      ownerId: initialData?.ownerId || "unassigned",
      repoUrl: initialData?.repoUrl || "",
      lifecycle: initialData?.lifecycle || "production",
    },
  });

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      setLoading(true);
      
      const payload = {
        ...data,
        ownerId: data.ownerId === "unassigned" ? null : data.ownerId,
      };

      if (initialData) {
        const res = await fetchWithCsrf(`/api/admin/services/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");
        toast.success("Service updated");
      } else {
        const res = await fetchWithCsrf("/api/admin/services", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create");
        toast.success("Service created");
      }
      router.refresh();
      router.push("/admin/services");
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Service name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Service description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "unassigned"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an owner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name || user.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="repoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repository URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lifecycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lifecycle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lifecycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="deprecated">Deprecated</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
