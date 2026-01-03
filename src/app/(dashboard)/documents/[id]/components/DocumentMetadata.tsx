"use client";

import { Calendar, User, Database, Hash, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Document } from "@/types/document.types";
import { DocumentStatus, IngestionStatus } from "@/types/document.types";
import { formatDistanceToNow } from "date-fns";

interface DocumentMetadataProps {
  document: Document | null;
  isLoading?: boolean;
}

const statusColors: Record<
  DocumentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [DocumentStatus.PENDING]: "outline",
  [DocumentStatus.UPLOADING]: "outline",
  [DocumentStatus.UPLOADED]: "secondary",
  [DocumentStatus.PROCESSING]: "secondary",
  [DocumentStatus.PROCESSED]: "default",
  [DocumentStatus.FAILED]: "destructive",
  [DocumentStatus.DELETED]: "outline",
};

const ingestionStatusColors: Record<
  IngestionStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [IngestionStatus.PENDING]: "outline",
  [IngestionStatus.PARSING]: "secondary",
  [IngestionStatus.CHUNKING]: "secondary",
  [IngestionStatus.EMBEDDING]: "secondary",
  [IngestionStatus.INDEXING]: "secondary",
  [IngestionStatus.COMPLETED]: "default",
  [IngestionStatus.FAILED]: "destructive",
};

export function DocumentMetadata({
  document,
  isLoading,
}: DocumentMetadataProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!document) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No metadata available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant={statusColors[document.status]}>
                {document.status}
              </Badge>
              <Badge variant={ingestionStatusColors[document.ingestionStatus]}>
                {document.ingestionStatus}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Processing Stats
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Chunks:</span>{" "}
                {document.chunkCount.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Embeddings:</span>{" "}
                {document.embeddingCount.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Storage
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Bucket:</span> {document.s3Bucket}
              </p>
              <p>
                <span className="font-medium">Region:</span> {document.s3Region}
              </p>
              {document.qdrantCollectionId && (
                <p>
                  <span className="font-medium">Collection ID:</span>{" "}
                  {document.qdrantCollectionId}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timestamps
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              {document.uploadedAt && (
                <p>
                  <span className="font-medium">Uploaded:</span>{" "}
                  {formatDistanceToNow(new Date(document.uploadedAt), {
                    addSuffix: true,
                  })}
                </p>
              )}
              {document.processedAt && (
                <p>
                  <span className="font-medium">Processed:</span>{" "}
                  {formatDistanceToNow(new Date(document.processedAt), {
                    addSuffix: true,
                  })}
                </p>
              )}
              {document.ingestionStartedAt && (
                <p>
                  <span className="font-medium">Ingestion Started:</span>{" "}
                  {formatDistanceToNow(
                    new Date(document.ingestionStartedAt),
                    { addSuffix: true }
                  )}
                </p>
              )}
              {document.ingestionCompletedAt && (
                <p>
                  <span className="font-medium">Ingestion Completed:</span>{" "}
                  {formatDistanceToNow(
                    new Date(document.ingestionCompletedAt),
                    { addSuffix: true }
                  )}
                </p>
              )}
              <p>
                <span className="font-medium">Created:</span>{" "}
                {formatDistanceToNow(new Date(document.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {document.language && (
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </p>
              <p className="text-sm text-muted-foreground">
                {document.language.toUpperCase()}
              </p>
            </div>
          )}

          {document.metadata && Object.keys(document.metadata).length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Additional Metadata</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                {Object.entries(document.metadata).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium">{key}:</span>{" "}
                    {String(value)}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

