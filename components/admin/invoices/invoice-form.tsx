"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";
import { useAdmin } from "@/hooks/useAdmin";

const invoiceSchema = z.object({
  tenantId: z.string().min(1, "Tenant is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["draft", "sent", "paid", "overdue", "void"]).default("draft"),
  notes: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(0.01, "Quantity must be positive"),
    unitPrice: z.number().min(0, "Unit price must be non-negative"),
  })).min(1, "At least one item is required"),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface Tenant {
  id: string;
  name: string;
}

interface InvoiceFormProps {
  tenants: Tenant[];
}

export function InvoiceForm({ tenants }: InvoiceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { hasPermission } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const canCreate = hasPermission("invoices.create");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      status: "draft",
      tenantId: "",
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  async function onSubmit(data: InvoiceFormValues) {
    setIsLoading(true);

    try {
      const response = await fetchWithCsrf("/api/admin/invoices", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create invoice");
      }

      toast({
        title: "Success",
        description: "Invoice created successfully",
      });

      router.push("/admin/invoices");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          Create a new invoice for a tenant.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="void">Void</option>
              </select>
              {errors.status && (
                <p className="text-sm text-destructive">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                {...register("issueDate")}
                disabled={isLoading}
              />
              {errors.issueDate && (
                <p className="text-sm text-destructive">{errors.issueDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                {...register("dueDate")}
                disabled={isLoading}
              />
              {errors.dueDate && (
                <p className="text-sm text-destructive">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-6 space-y-2">
                    <Label htmlFor={`items.${index}.description`} className="text-xs">Description</Label>
                    <Input
                      id={`items.${index}.description`}
                      {...register(`items.${index}.description`)}
                      placeholder="Item description"
                      disabled={isLoading}
                    />
                    {errors.items?.[index]?.description && (
                      <p className="text-xs text-destructive">{errors.items[index]?.description?.message}</p>
                    )}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor={`items.${index}.quantity`} className="text-xs">Qty</Label>
                    <Input
                      id={`items.${index}.quantity`}
                      type="number"
                      step="0.01"
                      {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-xs text-destructive">{errors.items[index]?.quantity?.message}</p>
                    )}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor={`items.${index}.unitPrice`} className="text-xs">Price</Label>
                    <Input
                      id={`items.${index}.unitPrice`}
                      type="number"
                      step="0.01"
                      {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                    {errors.items?.[index]?.unitPrice && (
                      <p className="text-xs text-destructive">{errors.items[index]?.unitPrice?.message}</p>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                     <div className="flex-1 pt-6 text-sm font-medium text-right">
                        ${(items[index]?.quantity * items[index]?.unitPrice || 0).toFixed(2)}
                     </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className="mb-0.5"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <div className="text-lg font-bold">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              placeholder="Payment terms, additional info..."
              {...register("notes")}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          {canCreate && (
            <Button type="submit" loading={isLoading} className="ml-auto">
              Create Invoice
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
