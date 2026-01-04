"use client";

import { FileText, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResultItem } from "./SearchResultItem";
import type { SearchResponse } from "@/types/search.types";

interface SearchResultsProps {
  results: SearchResponse | null;
  isLoading?: boolean;
  query?: string;
}

export function SearchResults({
  results,
  isLoading = false,
  query,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!results) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Enter a search query to find documents
          </p>
        </CardContent>
      </Card>
    );
  }

  if (results.results.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">No results found</p>
          <p className="text-sm text-muted-foreground text-center">
            Try adjusting your search query or filters
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Found <span className="font-semibold text-foreground">
              {results.total}
            </span>{" "}
            {results.total === 1 ? "result" : "results"}
          </p>
          {results.metadata && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {results.metadata.vectorResults !== undefined && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>
                    {results.metadata.vectorResults} semantic
                    {results.metadata.vectorResults === 1 ? "" : "s"}
                  </span>
                </div>
              )}
              {results.metadata.keywordResults !== undefined && (
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>
                    {results.metadata.keywordResults} keyword
                    {results.metadata.keywordResults === 1 ? "" : "s"}
                  </span>
                </div>
              )}
              {results.metadata.searchTime !== undefined && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{(results.metadata.searchTime / 1000).toFixed(2)}s</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {results.results.map((result, index) => (
          <SearchResultItem
            key={`${result.documentId}-${result.chunkId}-${index}`}
            result={result}
            index={index}
            query={query}
          />
        ))}
      </div>
    </div>
  );
}

