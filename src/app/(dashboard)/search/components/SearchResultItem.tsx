"use client";

import { FileText, ExternalLink, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { SearchResult } from "@/types/search.types";

interface SearchResultItemProps {
  result: SearchResult;
  index: number;
  query?: string;
}

export function SearchResultItem({
  result,
  index,
  query,
}: SearchResultItemProps) {
  const highlightText = (text: string, query?: string): JSX.Element => {
    if (!query) {
      return <span>{text}</span>;
    }

    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let searchIndex = textLower.indexOf(queryLower);

    while (searchIndex !== -1) {
      if (searchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, searchIndex));
      }
      parts.push(
        <mark
          key={`highlight-${searchIndex}`}
          className="bg-yellow-200 dark:bg-yellow-900 px-0.5 rounded"
        >
          {text.substring(searchIndex, searchIndex + query.length)}
        </mark>
      );
      lastIndex = searchIndex + query.length;
      searchIndex = textLower.indexOf(queryLower, lastIndex);
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return <span>{parts.length > 0 ? parts : text}</span>;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 0.8) return "text-green-600 dark:text-green-400";
    if (score >= 0.6) return "text-blue-600 dark:text-blue-400";
    if (score >= 0.4) return "text-yellow-600 dark:text-yellow-400";
    return "text-muted-foreground";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <Link
                  href={`/documents/${result.documentId}`}
                  className="text-sm font-semibold hover:underline flex items-center gap-1 truncate"
                >
                  {result.documentName}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </Link>
                {result.pageNumber && (
                  <Badge variant="outline" className="text-xs shrink-0">
                    Page {result.pageNumber}
                  </Badge>
                )}
              </div>
              {result.sectionTitle && (
                <p className="text-xs text-muted-foreground mb-2">
                  {result.sectionTitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TrendingUp
                className={`h-4 w-4 ${getScoreColor(result.score)}`}
              />
              <span
                className={`text-xs font-medium ${getScoreColor(
                  result.score
                )}`}
              >
                {(result.score * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {highlightText(result.content, query)}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Rank #{index + 1}
              </span>
            </div>
            <Link
              href={`/documents/${result.documentId}`}
              className="text-xs text-primary hover:underline"
            >
              View Document →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

