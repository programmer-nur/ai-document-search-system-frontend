"use client";

import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Document } from "@/types/document.types";
import { IngestionStatus } from "@/types/document.types";
import { formatDistanceToNow } from "date-fns";

interface ProcessingLogsProps {
  document: Document | null;
  isLoading?: boolean;
}

function safeFormatDistance(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}

const ingestionSteps: IngestionStatus[] = [
  IngestionStatus.PENDING,
  IngestionStatus.PARSING,
  IngestionStatus.CHUNKING,
  IngestionStatus.EMBEDDING,
  IngestionStatus.INDEXING,
  IngestionStatus.COMPLETED,
];

export function ProcessingLogs({ document, isLoading }: ProcessingLogsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!document) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No processing logs available</p>
        </CardContent>
      </Card>
    );
  }

  const getStepStatus = (step: IngestionStatus) => {
    const currentIndex = ingestionSteps.indexOf(document.ingestionStatus);
    const stepIndex = ingestionSteps.indexOf(step);

    if (stepIndex < currentIndex) {
      return "completed";
    } else if (stepIndex === currentIndex) {
      if (document.ingestionStatus === IngestionStatus.FAILED) {
        return "failed";
      }
      return "active";
    } else {
      return "pending";
    }
  };

  const getStepIcon = (
    status: "completed" | "active" | "failed" | "pending"
  ) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "active":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStepLabel = (step: IngestionStatus): string => {
    const labels: Record<IngestionStatus, string> = {
      [IngestionStatus.PENDING]: "Pending",
      [IngestionStatus.PARSING]: "Parsing Document",
      [IngestionStatus.CHUNKING]: "Chunking Text",
      [IngestionStatus.EMBEDDING]: "Generating Embeddings",
      [IngestionStatus.INDEXING]: "Indexing Vectors",
      [IngestionStatus.COMPLETED]: "Completed",
      [IngestionStatus.FAILED]: "Failed",
    };
    return labels[step];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ingestionSteps.map((step, index) => {
            const status = getStepStatus(step);
            const isLast = index === ingestionSteps.length - 1;

            return (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {getStepIcon(status)}
                  {!isLast && (
                    <div
                      className={`w-0.5 h-8 mt-2 ${
                        status === "completed" ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p
                      className={`text-sm font-medium ${
                        status === "active"
                          ? "text-blue-600"
                          : status === "failed"
                          ? "text-red-600"
                          : status === "completed"
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {getStepLabel(step)}
                    </p>
                    <Badge
                      variant={
                        status === "completed"
                          ? "default"
                          : status === "active"
                          ? "secondary"
                          : status === "failed"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                  {step === IngestionStatus.PARSING &&
                    document.ingestionStartedAt && (
                      <p className="text-xs text-muted-foreground">
                        Started{" "}
                        {safeFormatDistance(document.ingestionStartedAt)}
                      </p>
                    )}
                  {step === IngestionStatus.COMPLETED &&
                    document.ingestionCompletedAt && (
                      <p className="text-xs text-muted-foreground">
                        Completed{" "}
                        {safeFormatDistance(document.ingestionCompletedAt)}
                      </p>
                    )}
                  {step === IngestionStatus.FAILED &&
                    document.ingestionError && (
                      <p className="text-xs text-red-600 mt-1">
                        Error: {document.ingestionError}
                      </p>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
