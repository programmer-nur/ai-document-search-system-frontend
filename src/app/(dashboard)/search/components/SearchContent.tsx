"use client";

import { useState, useMemo } from "react";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useGetDocumentsQuery } from "@/features/document/services";
import { useSearchMutation } from "@/features/search/services";
import { toast } from "sonner";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import type { DocumentType } from "@/types/document.types";
import type { SearchResponse } from "@/types/search.types";

type DateRange = "all" | "today" | "week" | "month" | "year";

export function SearchContent() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"keyword" | "semantic">(
    "semantic"
  );
  const [documentType, setDocumentType] = useState<DocumentType | undefined>();
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );

  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useGetWorkspacesQuery({});
  const workspaceId = workspacesData?.data?.[0]?.id;

  const { data: documentsData } = useGetDocumentsQuery(
    workspaceId
      ? {
          workspaceId,
          params: { limit: 1000, page: 1 },
        }
      : { workspaceId: "", params: {} },
    { skip: !workspaceId }
  );

  const [search, { isLoading: isSearching }] = useSearchMutation();

  // Filter documents based on selected filters
  const filteredDocumentIds = useMemo(() => {
    if (!documentsData?.data) return undefined;

    let filtered = documentsData.data;

    // Filter by document type
    if (documentType) {
      filtered = filtered.filter((doc) => doc.type === documentType);
    }

    // Filter by date range
    if (dateRange !== "all") {
      const now = new Date();
      const dateFilters: Record<DateRange, (date: Date) => boolean> = {
        all: () => true,
        today: (date) => {
          const today = new Date(now);
          today.setHours(0, 0, 0, 0);
          return date >= today;
        },
        week: (date) => {
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return date >= weekAgo;
        },
        month: (date) => {
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return date >= monthAgo;
        },
        year: (date) => {
          const yearAgo = new Date(now);
          yearAgo.setFullYear(yearAgo.getFullYear() - 1);
          return date >= yearAgo;
        },
      };

      filtered = filtered.filter((doc) => {
        const docDate = new Date(doc.createdAt);
        return dateFilters[dateRange](docDate);
      });
    }

    return filtered.map((doc) => doc.id);
  }, [documentsData?.data, documentType, dateRange]);

  const handleSearch = async (searchQuery: string, type: "keyword" | "semantic") => {
    if (!workspaceId) {
      toast.error("Error", {
        description: "No workspace found. Please create a workspace first.",
      });
      return;
    }

    setQuery(searchQuery);
    setSearchType(type);

    try {
      const response = await search({
        workspaceId,
        data: {
          query: searchQuery,
          limit: 20,
          documentIds: filteredDocumentIds && filteredDocumentIds.length > 0 
            ? filteredDocumentIds 
            : undefined,
        },
      }).unwrap();

      setSearchResults(response.data);

      if (response.data.results.length === 0) {
        toast.info("No results", {
          description: "No documents found matching your search criteria.",
        });
      } else {
        toast.success("Search completed", {
          description: `Found ${response.data.total} result${response.data.total === 1 ? "" : "s"}.`,
        });
      }
    } catch (error: any) {
      toast.error("Search failed", {
        description:
          error?.data?.message || "Failed to perform search. Please try again.",
      });
      setSearchResults(null);
    }
  };

  const handleClearFilters = () => {
    setDocumentType(undefined);
    setDateRange("all");
  };

  if (isLoadingWorkspaces) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="space-y-6">
        <SearchHeader />
        <Card className="p-6">
          <p className="text-muted-foreground text-center">
            No workspace found. Please create a workspace first.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <SearchInput
            onSearch={handleSearch}
            isLoading={isSearching}
            disabled={!workspaceId}
          />

          <SearchResults
            results={searchResults}
            isLoading={isSearching}
            query={query}
          />
        </div>

        <div className="lg:col-span-1">
          <SearchFilters
            documentType={documentType}
            dateRange={dateRange}
            onDocumentTypeChange={setDocumentType}
            onDateRangeChange={setDateRange}
            onClear={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
}

