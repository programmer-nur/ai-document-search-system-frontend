"use client";

import { useMemo } from "react";
import { FileText, Search, MessageSquare, Database } from "lucide-react";
import {
  StatsCard,
  ProcessingStatusWidget,
  RecentQueriesWidget,
  StorageUsageWidget,
} from "@/components/dashboard";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useGetDocumentsQuery } from "@/features/document/services";
import { useGetQueryHistoryQuery } from "@/features/search/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useGetWorkspacesQuery({ limit: 1 });

  const workspaceId = workspacesData?.data?.[0]?.id;

  const { data: documentsData, isLoading: isLoadingDocuments } =
    useGetDocumentsQuery(
      workspaceId
        ? {
            workspaceId,
            params: { limit: 1000 },
          }
        : { workspaceId: "", params: {} },
      { skip: !workspaceId }
    );

  const { data: queriesData, isLoading: isLoadingQueries } =
    useGetQueryHistoryQuery(
      workspaceId
        ? {
            workspaceId,
            params: { limit: 5 },
          }
        : { workspaceId: "", params: {} },
      { skip: !workspaceId }
    );

  const documents = documentsData?.data || [];
  const queries = queriesData?.data || [];

  const stats = useMemo(() => {
    const totalDocuments = documents.length;
    const processedDocuments =
      documents.filter((doc) => doc.status === "PROCESSED").length;
    const totalQueries = queries.length;
    const totalStorage = documents.reduce((sum, doc) => {
      return sum + (parseInt(doc.size) || 0);
    }, 0);

    return {
      totalDocuments,
      processedDocuments,
      totalQueries,
      totalStorage,
    };
  }, [documents, queries]);

  const isLoading =
    isLoadingWorkspaces || (workspaceId && isLoadingDocuments);

  if (isLoadingWorkspaces) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your documents, queries, and storage usage
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Documents"
          value={stats.totalDocuments}
          icon={FileText}
          description={`${stats.processedDocuments} processed`}
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Queries"
          value={stats.totalQueries}
          icon={Search}
          description="Searches and questions"
          isLoading={isLoadingQueries}
        />
        <StatsCard
          title="AI Questions"
          value={queries.filter((q) => q.type === "QUESTION").length}
          icon={MessageSquare}
          description="Questions answered"
          isLoading={isLoadingQueries}
        />
        <StatsCard
          title="Storage Used"
          value={
            stats.totalStorage > 0
              ? `${(stats.totalStorage / 1024 / 1024).toFixed(2)} MB`
              : "0 MB"
          }
          icon={Database}
          description="Total document size"
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProcessingStatusWidget
          documents={documents}
          isLoading={isLoading}
        />
        <RecentQueriesWidget
          queries={queries}
          isLoading={isLoadingQueries}
          workspaceId={workspaceId}
        />
        <StorageUsageWidget
          totalSize={stats.totalStorage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

