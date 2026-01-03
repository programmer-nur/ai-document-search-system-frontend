"use client";

import { ProcessingStatusWidget } from "./ProcessingStatusWidget";
import { RecentQueriesWidget } from "./RecentQueriesWidget";
import { StorageUsageWidget } from "./StorageUsageWidget";
import type { Document } from "@/types/document.types";
import type { QueryHistoryItem } from "@/types/search.types";

interface DashboardWidgetsProps {
  documents: Document[];
  queries: QueryHistoryItem[];
  totalStorage: number;
  isLoading: boolean;
  isLoadingQueries: boolean;
  workspaceId?: string;
}

export function DashboardWidgets({
  documents,
  queries,
  totalStorage,
  isLoading,
  isLoadingQueries,
  workspaceId,
}: DashboardWidgetsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ProcessingStatusWidget documents={documents} isLoading={isLoading} />
      <RecentQueriesWidget
        queries={queries}
        isLoading={isLoadingQueries}
        workspaceId={workspaceId}
      />
      <StorageUsageWidget totalSize={totalStorage} isLoading={isLoading} />
    </div>
  );
}

