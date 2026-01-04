"use client";

import { FileText, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { QuestionResponse } from "@/types/search.types";

interface SourceCitationsProps {
  sources: QuestionResponse["sources"];
}

export function SourceCitations({ sources }: SourceCitationsProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 bg-muted/50">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Sources</p>
          <Badge variant="secondary" className="ml-auto">
            {sources.length}
          </Badge>
        </div>
        <div className="space-y-2">
          {sources.map((source, index) => (
            <div
              key={`${source.documentId}-${source.chunkId}-${index}`}
              className="flex items-start gap-3 p-3 rounded-md bg-background border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/documents/${source.documentId}`}
                    className="text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    {source.documentName}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  {source.pageNumber && (
                    <Badge variant="outline" className="text-xs">
                      Page {source.pageNumber}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {source.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

