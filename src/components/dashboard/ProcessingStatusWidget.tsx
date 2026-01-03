"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { DocumentStatus, IngestionStatus } from "@/types/document.types";
import { cn } from "@/lib/utils";

interface ProcessingStatusWidgetProps {
  documents: Array<{
    status: DocumentStatus;
    ingestionStatus: IngestionStatus;
  }>;
  isLoading?: boolean;
}

const statusLabels: Record<DocumentStatus, string> = {
  [DocumentStatus.PENDING]: "Pending",
  [DocumentStatus.UPLOADING]: "Uploading",
  [DocumentStatus.UPLOADED]: "Uploaded",
  [DocumentStatus.PROCESSING]: "Processing",
  [DocumentStatus.PROCESSED]: "Processed",
  [DocumentStatus.FAILED]: "Failed",
  [DocumentStatus.DELETED]: "Deleted",
};

const ingestionStatusLabels: Record<IngestionStatus, string> = {
  [IngestionStatus.PENDING]: "Pending",
  [IngestionStatus.PARSING]: "Parsing",
  [IngestionStatus.CHUNKING]: "Chunking",
  [IngestionStatus.EMBEDDING]: "Embedding",
  [IngestionStatus.INDEXING]: "Indexing",
  [IngestionStatus.COMPLETED]: "Completed",
  [IngestionStatus.FAILED]: "Failed",
};

export function ProcessingStatusWidget({
  documents,
  isLoading = false,
}: ProcessingStatusWidgetProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  const statusCounts = documents.reduce(
    (acc, doc) => {
      acc[doc.status] = (acc[doc.status] || 0) + 1;
      return acc;
    },
    {} as Record<DocumentStatus, number>
  );

  const ingestionStatusCounts = documents.reduce(
    (acc, doc) => {
      acc[doc.ingestionStatus] = (acc[doc.ingestionStatus] || 0) + 1;
      return acc;
    },
    {} as Record<IngestionStatus, number>
  );

  const total = documents.length;
  const processed = statusCounts[DocumentStatus.PROCESSED] || 0;
  const processing = statusCounts[DocumentStatus.PROCESSING] || 0;
  const failed = statusCounts[DocumentStatus.FAILED] || 0;
  const pending = statusCounts[DocumentStatus.PENDING] || statusCounts[DocumentStatus.UPLOADED] || 0;

  const processingProgress = total > 0 ? (processed / total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {processed} / {total}
            </span>
          </div>
          <Progress value={processingProgress} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Processed</span>
            <span className="font-medium">{processed}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Processing</span>
            <span className="font-medium">{processing}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pending</span>
            <span className="font-medium">{pending}</span>
          </div>
          {failed > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-destructive">Failed</span>
              <span className="font-medium text-destructive">{failed}</span>
            </div>
          )}
        </div>

        {Object.keys(ingestionStatusCounts).length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">Ingestion Status</p>
            <div className="space-y-1">
              {Object.entries(ingestionStatusCounts).map(([status, count]) => (
                <div
                  key={status}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground">
                    {ingestionStatusLabels[status as IngestionStatus]}
                  </span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

