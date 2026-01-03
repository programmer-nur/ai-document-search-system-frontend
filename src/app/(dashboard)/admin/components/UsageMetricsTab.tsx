"use client";

import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useGetDocumentsQuery } from "@/features/document/services";
import { useGetQueryHistoryQuery } from "@/features/search/services";
import { useGetUsersQuery } from "@/features/user/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FileText, Search, Database, TrendingUp, Clock } from "lucide-react";
import { StatsCard } from "@/app/(dashboard)/dashboard/components/StatsCard";
import { QueryType } from "@/types/search.types";

export function UsageMetricsTab() {
  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useGetWorkspacesQuery({});
  const workspaceId = workspacesData?.data?.[0]?.id;

  const { data: documentsData, isLoading: isLoadingDocuments } =
    useGetDocumentsQuery(
      workspaceId
        ? {
            workspaceId,
            params: { limit: 1000, page: 1 },
          }
        : { workspaceId: "", params: {} },
      { skip: !workspaceId }
    );

  const { data: queryHistoryData, isLoading: isLoadingQueries } =
    useGetQueryHistoryQuery(
      workspaceId
        ? {
            workspaceId,
            params: { limit: 1000, page: 1 },
          }
        : { workspaceId: "", params: {} },
      { skip: !workspaceId }
    );

  const { data: usersData, isLoading: isLoadingUsers } = useGetUsersQuery({
    limit: 1000,
    page: 1,
  });

  const isLoading =
    isLoadingWorkspaces ||
    isLoadingDocuments ||
    isLoadingQueries ||
    isLoadingUsers;

  const documents = documentsData?.data || [];
  const queries = queryHistoryData?.data || [];
  const users = usersData?.data || [];

  const totalDocuments = documents.length;
  const processedDocuments = documents.filter(
    (doc) => doc.status === "PROCESSED"
  ).length;
  const totalQueries = queries.length;
  const searchQueries = queries.filter(
    (q) => q.type === QueryType.SEARCH
  ).length;
  const questionQueries = queries.filter(
    (q) => q.type === QueryType.QUESTION
  ).length;
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;

  const totalTokens = queries.reduce(
    (sum, q) => sum + (q.tokensUsed || 0),
    0
  );
  const avgResponseTime =
    queries.length > 0
      ? queries.reduce((sum, q) => sum + (q.responseTime || 0), 0) /
        queries.length
      : 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users"
          value={totalUsers.toString()}
          description={`${activeUsers} active`}
          icon={Users}
        />
        <StatsCard
          title="Total Documents"
          value={totalDocuments.toString()}
          description={`${processedDocuments} processed`}
          icon={FileText}
        />
        <StatsCard
          title="Total Queries"
          value={totalQueries.toString()}
          description={`${searchQueries} searches, ${questionQueries} questions`}
          icon={Search}
        />
        <StatsCard
          title="Total Tokens Used"
          value={totalTokens.toLocaleString()}
          description="Across all AI queries"
          icon={Database}
        />
        <StatsCard
          title="Avg Response Time"
          value={`${avgResponseTime.toFixed(0)}ms`}
          description="Average query response time"
          icon={Clock}
        />
        <StatsCard
          title="Processing Rate"
          value={`${totalDocuments > 0 ? ((processedDocuments / totalDocuments) * 100).toFixed(1) : 0}%`}
          description="Documents successfully processed"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { status: "PROCESSED", count: processedDocuments, color: "bg-green-500" },
                {
                  status: "PROCESSING",
                  count: documents.filter((d) => d.status === "PROCESSING").length,
                  color: "bg-blue-500",
                },
                {
                  status: "FAILED",
                  count: documents.filter((d) => d.status === "FAILED").length,
                  color: "bg-red-500",
                },
                {
                  status: "PENDING",
                  count: documents.filter((d) => d.status === "PENDING").length,
                  color: "bg-yellow-500",
                },
              ].map(({ status, count, color }) => (
                <div key={status} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{status}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} transition-all`}
                      style={{
                        width: `${
                          totalDocuments > 0
                            ? (count / totalDocuments) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  type: "Search Queries",
                  count: searchQueries,
                  color: "bg-blue-500",
                },
                {
                  type: "AI Questions",
                  count: questionQueries,
                  color: "bg-purple-500",
                },
              ].map(({ type, count, color }) => (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{type}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} transition-all`}
                      style={{
                        width: `${
                          totalQueries > 0 ? (count / totalQueries) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

