"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Database } from "lucide-react";

interface StorageUsageWidgetProps {
  totalSize: number; // in bytes
  limit?: number; // in bytes, optional
  isLoading?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function StorageUsageWidget({
  totalSize,
  limit,
  isLoading = false,
}: StorageUsageWidgetProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </Card>
    );
  }

  const usagePercentage = limit ? (totalSize / limit) * 100 : 0;
  const formattedTotal = formatBytes(totalSize);
  const formattedLimit = limit ? formatBytes(limit) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          Storage Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Used</span>
            <span className="text-sm text-muted-foreground">
              {formattedTotal}
              {formattedLimit && ` / ${formattedLimit}`}
            </span>
          </div>
          {limit ? (
            <Progress
              value={usagePercentage}
              className="h-2"
              data-state={usagePercentage > 90 ? "warning" : "normal"}
            />
          ) : (
            <div className="h-2 bg-muted rounded-full">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>

        {limit && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available</span>
            <span className="font-medium">
              {formatBytes(Math.max(0, limit - totalSize))}
            </span>
          </div>
        )}

        {limit && usagePercentage > 80 && (
          <p className="text-xs text-amber-600">
            {usagePercentage > 90
              ? "Storage almost full. Consider upgrading your plan."
              : "Storage usage is high."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

