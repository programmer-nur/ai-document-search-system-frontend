"use client";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useGetDocumentsQuery } from "@/features/document/services";
import { useGetQueryHistoryQuery } from "@/features/search/services";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { DashboardWidgets } from "./DashboardWidgets";

export function DashboardContent() {
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
    const aiQuestionsCount = queries.filter((q) => q.type === "QUESTION").length;

    return {
      totalDocuments,
      processedDocuments,
      totalQueries,
      totalStorage,
      aiQuestionsCount,
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
      <DashboardHeader />
      <DashboardStats
        stats={stats}
        isLoading={isLoading}
        isLoadingQueries={isLoadingQueries}
      />
      <DashboardWidgets
        documents={documents}
        queries={queries}
        totalStorage={stats.totalStorage}
        isLoading={isLoading}
        isLoadingQueries={isLoadingQueries}
        workspaceId={workspaceId}
      />
    </div>
  );
}

