"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

interface Role {
  id: string;
  name: string;
}

interface UserRolesFormProps {
  userId: string;
  availableRoles: Role[];
  assignedRoleIds: string[];
}

export function UserRolesForm({
  userId,
  availableRoles,
  assignedRoleIds,
}: UserRolesFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(assignedRoleIds);

  const handleToggleRole = (roleId: string) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetchWithCsrf(`/api/admin/users/${userId}/roles`, {
        method: "PATCH",
        body: JSON.stringify({ roleIds: selectedRoleIds }),
      });

      if (!res.ok) throw new Error("Failed to update roles");
      
      toast.success("Roles updated successfully");
      router.refresh();
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Assignment</CardTitle>
        <CardDescription>
          Manage roles assigned to this user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {availableRoles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <Checkbox
                id={`role-${role.id}`}
                checked={selectedRoleIds.includes(role.id)}
                onCheckedChange={() => handleToggleRole(role.id)}
              />
              <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
