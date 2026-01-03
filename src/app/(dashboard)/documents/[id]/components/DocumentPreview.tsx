"use client";

import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Document } from "@/types/document.types";
import { DocumentType } from "@/types/document.types";

interface DocumentPreviewProps {
  document: Document | null;
  isLoading?: boolean;
}

export function DocumentPreview({
  document,
  isLoading,
}: DocumentPreviewProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!document) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Document not found</p>
        </CardContent>
      </Card>
    );
  }


  const renderPreview = () => {
    if (document.s3Url) {
      if (document.type === DocumentType.PDF) {
        return (
          <iframe
            src={document.s3Url}
            className="w-full h-[600px] border rounded-md"
            title={document.name}
          />
        );
      } else if (document.thumbnailUrl) {
        return (
          <img
            src={document.thumbnailUrl}
            alt={document.name}
            className="w-full h-auto rounded-md"
          />
        );
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-md">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">
          Preview not available for this document type
        </p>
        {document.s3Url && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.open(document.s3Url!, "_blank")}
          >
            <Download className="h-4 w-4 mr-2" />
            Download to View
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Preview
          </CardTitle>
          <Badge variant="outline">{document.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {renderPreview()}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">File Information</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Name:</span> {document.originalName}
              </p>
              <p>
                <span className="font-medium">Size:</span>{" "}
                {formatFileSize(parseInt(document.size))}
              </p>
              {document.pageCount && (
                <p>
                  <span className="font-medium">Pages:</span> {document.pageCount}
                </p>
              )}
              {document.wordCount && (
                <p>
                  <span className="font-medium">Words:</span>{" "}
                  {document.wordCount.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

