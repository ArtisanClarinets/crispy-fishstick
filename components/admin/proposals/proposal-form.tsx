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
import { Loader2, Plus, Trash } from "lucide-react";

const proposalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["draft", "sent", "approved", "rejected"]),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    hours: z.number().min(0, "Hours must be non-negative"),
    rate: z.number().min(0, "Rate must be non-negative"),
  })).min(1, "At least one item is required"),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

export function ProposalForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      status: "draft",
      items: [{ description: "", hours: 0, rate: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const totalAmount = items.reduce((sum, item) => sum + (item.hours * item.rate), 0);

  async function onSubmit(data: ProposalFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create proposal");
      }

      toast({
        title: "Success",
        description: "Proposal created successfully",
      });

      router.push("/admin/proposals");
      router.refresh();
    } catch (error) {
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
        <CardTitle>Proposal Details</CardTitle>
        <CardDescription>
          Create a new proposal for a potential client.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Website Redesign Proposal"
                {...register("title")}
                disabled={isLoading}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.status && (
                <p className="text-sm text-destructive">{errors.status.message}</p>
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
                onClick={() => append({ description: "", hours: 0, rate: 0 })}
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
                    <Label htmlFor={`items.${index}.hours`} className="text-xs">Hours</Label>
                    <Input
                      id={`items.${index}.hours`}
                      type="number"
                      step="0.1"
                      {...register(`items.${index}.hours`, { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                    {errors.items?.[index]?.hours && (
                      <p className="text-xs text-destructive">{errors.items[index]?.hours?.message}</p>
                    )}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor={`items.${index}.rate`} className="text-xs">Rate</Label>
                    <Input
                      id={`items.${index}.rate`}
                      type="number"
                      step="0.01"
                      {...register(`items.${index}.rate`, { valueAsNumber: true })}
                      disabled={isLoading}
                    />
                    {errors.items?.[index]?.rate && (
                      <p className="text-xs text-destructive">{errors.items[index]?.rate?.message}</p>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                     <div className="flex-1 pt-6 text-sm font-medium text-right">
                        ${(items[index]?.hours * items[index]?.rate || 0).toFixed(2)}
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
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="ml-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Proposal
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
