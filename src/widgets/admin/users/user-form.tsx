"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/shared/ui/form";
import { Card, CardContent } from "@/shared/ui/card";
import { toast } from "sonner";
import { SafeUserWithRolesDto } from "@/shared/lib/security/safe-user";
import { fetchWithCsrf } from "@/shared/lib/fetchWithCsrf";
import { useAdmin } from "@/shared/lib/hooks/useAdmin";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  roleIds: z.array(z.string()),
  password: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  /**
   * The initial user data for editing.
   * MUST be a SafeUserWithRolesDto to ensure no sensitive data (like passwordHash) is passed.
   */
  initialData?: SafeUserWithRolesDto;
  /**
   * List of available roles for assignment.
   */
  roles: { id: string; name: string }[];
}

/**
 * Form for creating or editing a user.
 * 
 * Security Updates (Phase 7):
 * - Uses SafeUserWithRolesDto for type safety and data protection.
 * - Password field added back for creation/updates (securely handled by API).
 * - Roles selection preserved.
 */
export function UserForm({ initialData, roles }: UserFormProps) {
  const router = useRouter();
  const { hasPermission } = useAdmin();
  const [loading, setLoading] = useState(false);

  const canSubmit = initialData ? hasPermission("users.edit") : hasPermission("users.create");

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      roleIds: initialData?.RoleAssignment?.map((r) => r.roleId) || [],
      password: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      // Validate password for creation
      if (!initialData && (!data.password || data.password.length < 12)) {
        form.setError("password", { message: "Password must be at least 12 characters for new users" });
        return;
      }

      // If editing and password is empty, don't send it
      if (initialData && !data.password) {
        delete data.password;
      }

      setLoading(true);
      
      const payload = { ...data };

      if (initialData) {
        const res = await fetchWithCsrf(`/api/admin/users/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");
        toast.success("User updated");
      } else {
        const res = await fetchWithCsrf("/api/admin/users", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create");
        toast.success("User created");
      }
      router.refresh();
      router.push("/admin/users");
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
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{initialData ? "New Password (Optional)" : "Password"}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={initialData ? "Leave blank to keep current" : "Secure password"}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be at least 12 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleIds"
                render={() => (
                  <FormItem className="col-span-2">
                    <div className="mb-4">
                      <FormLabel className="text-base">Roles</FormLabel>
                      <FormDescription>
                        Select the roles to assign to this user.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {roles.map((role) => (
                        <FormField
                          key={role.id}
                          control={form.control}
                          name="roleIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={role.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, role.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== role.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {role.name}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/users")}
                disabled={loading}
              >
                Cancel
              </Button>
              {canSubmit && (
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : initialData ? "Update User" : "Create User"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
