"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import {
  useGetDocumentsQuery,
  useLazyGetUploadUrlQuery,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
} from "@/features/document/services";
import { DocumentsHeader } from "./DocumentsHeader";
import { DocumentUpload } from "./DocumentUpload";
import { DocumentsTable } from "./DocumentsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentType } from "@/types/document.types";

const FILE_TYPE_MAP: Record<string, DocumentType> = {
  pdf: DocumentType.PDF,
  docx: DocumentType.DOCX,
  doc: DocumentType.DOC,
  xlsx: DocumentType.XLSX,
  xls: DocumentType.XLS,
  pptx: DocumentType.PPTX,
  ppt: DocumentType.PPT,
  txt: DocumentType.TXT,
  md: DocumentType.MD,
  csv: DocumentType.CSV,
};

function getDocumentType(file: File): DocumentType {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  return FILE_TYPE_MAP[extension] || "OTHER";
}

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

  const [getUploadUrl] = useLazyGetUploadUrlQuery();
  const [createDocument] = useCreateDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (!workspaceId) {
        toast.error("No workspace found");
        return;
      }

      setIsUploading(true);
      const progress: Record<string, number> = {};

      try {
        for (const file of files) {
          progress[file.name] = 0;
          setUploadProgress({ ...progress });

          try {
            const uploadUrlResponse = await getUploadUrl({
              workspaceId,
              params: {
                fileName: file.name,
                contentType: file.type,
              },
            }).unwrap();

            const { uploadUrl, s3Key } = uploadUrlResponse.data;

            progress[file.name] = 25;
            setUploadProgress({ ...progress });

            const uploadResponse = await fetch(uploadUrl, {
              method: "PUT",
              body: file,
              headers: {
                "Content-Type": file.type,
              },
            });

            if (!uploadResponse.ok) {
              throw new Error("Upload failed");
            }

            progress[file.name] = 75;
            setUploadProgress({ ...progress });

            const documentType = getDocumentType(file);
            const s3Bucket =
              process.env.NEXT_PUBLIC_S3_BUCKET || "default-bucket";
            const s3Region = process.env.NEXT_PUBLIC_S3_REGION || "us-east-1";

            await createDocument({
              workspaceId,
              data: {
                name: file.name,
                originalName: file.name,
                type: documentType,
                mimeType: file.type,
                size: file.size,
                s3Key,
                s3Bucket,
                s3Region,
              },
            }).unwrap();

            progress[file.name] = 100;
            setUploadProgress({ ...progress });

            toast.success(`${file.name} uploaded successfully`);
          } catch (error) {
            console.error(`Error uploading ${file.name}:`, error);
            toast.error(`Failed to upload ${file.name}`);
            delete progress[file.name];
            setUploadProgress({ ...progress });
          }
        }

        await refetch();
      } finally {
        setIsUploading(false);
        setTimeout(() => {
          setUploadProgress({});
        }, 2000);
      }
    },
    [workspaceId, getUploadUrl, createDocument, refetch]
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
        console.error("Error deleting document:", error);
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
