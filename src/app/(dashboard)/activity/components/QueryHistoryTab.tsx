"use client";

import { useState } from "react";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useGetQueryHistoryQuery } from "@/features/search/services";
import { QueryHistoryItem } from "./QueryHistoryItem";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { QueryType } from "@/types/search.types";

export function QueryHistoryTab() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<QueryType | undefined>(undefined);
  const limit = 20;

  const { data: workspacesData } = useGetWorkspacesQuery({});
  const workspaceId = workspacesData?.data?.[0]?.id;

  const {
    data: queryHistoryData,
    isLoading,
    isFetching,
  } = useGetQueryHistoryQuery(
    workspaceId
      ? {
          workspaceId,
          params: {
            page,
            limit,
            type,
          },
        }
      : { workspaceId: "", params: {} },
    { skip: !workspaceId }
  );

  const queries = queryHistoryData?.data || [];
  const meta = queryHistoryData?.meta;

  const handleTypeChange = (value: string) => {
    setType(value === "all" ? undefined : (value as QueryType));
    setPage(1);
  };

  if (!workspaceId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-muted-foreground text-center">
            No workspace found. Please create a workspace first.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={type || "all"} onValueChange={handleTypeChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value={QueryType.SEARCH}>Searches</TabsTrigger>
            <TabsTrigger value={QueryType.QUESTION}>AI Questions</TabsTrigger>
          </TabsList>
        </Tabs>

        {meta && (
          <p className="text-sm text-muted-foreground">
            Showing {queries.length} of {meta.total} queries
          </p>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-3">
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      ) : queries.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No queries found</p>
            <p className="text-sm text-muted-foreground text-center">
              {type
                ? `No ${type === QueryType.QUESTION ? "AI questions" : "searches"} found in your history.`
                : "Your search and question history will appear here."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {queries.map((query) => (
              <QueryHistoryItem key={query.id} item={query} />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!meta.hasPrevPage || isLoading}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!meta.hasNextPage || isLoading}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

