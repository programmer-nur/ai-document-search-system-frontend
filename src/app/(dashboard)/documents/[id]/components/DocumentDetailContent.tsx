"use client";

import { useParams } from "next/navigation";
import { useGetDocumentByIdQuery, useReindexDocumentMutation, useDeleteDocumentMutation } from "@/features/document/services";
import { DocumentDetailHeader } from "./DocumentDetailHeader";
import { DocumentPreview } from "./DocumentPreview";
import { DocumentMetadata } from "./DocumentMetadata";
import { ProcessingLogs } from "./ProcessingLogs";
import { DocumentActions } from "./DocumentActions";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DocumentDetailContent() {
  const params = useParams();
  const documentId = params.id as string;

  const {
    data: documentData,
    isLoading,
    refetch,
  } = useGetDocumentByIdQuery(documentId);

  const [reindexDocument, { isLoading: isReindexing }] =
    useReindexDocumentMutation();
  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();

  const document = documentData?.data;

  const handleReindex = async () => {
    if (!documentId) return;
    await reindexDocument(documentId).unwrap();
    // Refetch document to get updated status
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  const handleDelete = async () => {
    if (!documentId) return;
    await deleteDocument(documentId).unwrap();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[600px]" />
          <div className="space-y-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="space-y-6">
        <DocumentDetailHeader />
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Document not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DocumentDetailHeader />
        <DocumentActions
          document={document}
          onReindex={handleReindex}
          onDelete={handleDelete}
          isReindexing={isReindexing}
          isDeleting={isDeleting}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DocumentPreview document={document} />
        </div>
        <div className="space-y-6">
          <DocumentMetadata document={document} />
          <ProcessingLogs document={document} />
        </div>
      </div>
    </div>
  );
}

