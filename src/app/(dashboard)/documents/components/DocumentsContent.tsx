"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import {
  useGetDocumentsQuery,
  useUploadDocumentsMutation,
  useDeleteDocumentMutation,
} from "@/features/document/services";
import { DocumentsHeader } from "./DocumentsHeader";
import { DocumentUpload } from "./DocumentUpload";
import { DocumentsTable } from "./DocumentsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DocumentsContent() {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = useState(false);

  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useGetWorkspacesQuery({ limit: 1 });

  const workspaceId = workspacesData?.data?.[0]?.id;

  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    refetch,
  } = useGetDocumentsQuery(
    workspaceId
      ? {
          workspaceId,
          params: { limit: 100, page: 1 },
        }
      : { workspaceId: "", params: {} },
    { skip: !workspaceId }
  );

  const [uploadDocuments] = useUploadDocumentsMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (!workspaceId) {
        toast.error("No workspace found");
        return;
      }

      if (files.length === 0) {
        return;
      }

      setIsUploading(true);
      const progress: Record<string, number> = {};

      // Initialize progress for all files
      files.forEach((file) => {
        progress[file.name] = 0;
      });
      setUploadProgress({ ...progress });

      try {
        // Upload all files at once using the new endpoint
        progress[files[0].name] = 50; // Show progress for first file
        setUploadProgress({ ...progress });

        const result = await uploadDocuments({
          workspaceId,
          files,
        }).unwrap();

        // Mark all files as complete
        files.forEach((file) => {
          progress[file.name] = 100;
        });
        setUploadProgress({ ...progress });

        const uploadedCount = result.data?.length || files.length;
        toast.success(
          `${uploadedCount} file${
            uploadedCount > 1 ? "s" : ""
          } uploaded successfully`
        );

        await refetch();
      } catch (err) {
        const error = err as { data?: { message?: string }; message?: string };
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to upload files. Please try again.";
        toast.error("Upload failed", {
          description: errorMessage,
        });

        // Reset progress on error
        files.forEach((file) => {
          delete progress[file.name];
        });
        setUploadProgress({ ...progress });
      } finally {
        setIsUploading(false);
        setTimeout(() => {
          setUploadProgress({});
        }, 2000);
      }
    },
    [workspaceId, uploadDocuments, refetch]
  );

  const handleDelete = useCallback(
    async (documentId: string) => {
      if (!confirm("Are you sure you want to delete this document?")) {
        return;
      }

      try {
        await deleteDocument(documentId).unwrap();
        toast.success("Document deleted successfully");
        await refetch();
      } catch (error) {
        toast.error("Failed to delete document");
      }
    },
    [deleteDocument, refetch]
  );

  const isLoading: boolean =
    isLoadingWorkspaces || (!!workspaceId && isLoadingDocuments);

  if (isLoadingWorkspaces) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No workspace found. Please create a workspace to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const documents = documentsData?.data || [];

  return (
    <div className="space-y-6">
      <DocumentsHeader />
      <DocumentUpload
        onFilesSelected={handleFilesSelected}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />
      <DocumentsTable
        documents={documents}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
    </div>
  );
}
