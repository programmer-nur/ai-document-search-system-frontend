"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useUpdateWorkspaceMutation } from "@/features/workspace/services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Loader2 } from "lucide-react";

const workspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  description: z.string().optional(),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

export function WorkspaceTab() {
  const { data: workspacesData, isLoading } = useGetWorkspacesQuery({});
  const [updateWorkspace, { isLoading: isUpdating }] = useUpdateWorkspaceMutation();

  const workspace = workspacesData?.data?.[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: workspace?.name || "",
      description: workspace?.description || "",
    },
  });

  // Reset form when workspace data loads
  if (workspace && !isLoading) {
    reset({
      name: workspace.name,
      description: workspace.description || "",
    });
  }

  const onSubmit = async (data: WorkspaceFormValues) => {
    if (!workspace) return;

    try {
      await updateWorkspace({
        id: workspace.id,
        data: {
          name: data.name,
          description: data.description || null,
        },
      }).unwrap();

      toast.success("Workspace updated", {
        description: "Your workspace settings have been successfully updated.",
      });
    } catch (error: any) {
      toast.error("Update failed", {
        description:
          error?.data?.message || "Failed to update workspace. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!workspace) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-muted-foreground text-center">
            No workspace found. Please create a workspace first.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Settings</CardTitle>
        <CardDescription>
          Manage your workspace information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Workspace Name</Label>
            <Input
              id="name"
              placeholder="My Workspace"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your workspace"
              rows={4}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Workspace Slug</Label>
            <Input value={workspace.slug} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Slug cannot be changed
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Label>Status</Label>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                workspace.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {workspace.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Building2 className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

