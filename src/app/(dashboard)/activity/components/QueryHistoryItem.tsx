"use client";

import { Search, MessageSquare, Clock, TrendingUp, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { QueryHistoryItem as QueryHistoryItemType } from "@/types/search.types";
import { QueryType } from "@/types/search.types";
import { formatDistanceToNow } from "date-fns";

interface QueryHistoryItemProps {
  item: QueryHistoryItemType;
}

export function QueryHistoryItem({ item }: QueryHistoryItemProps) {
  const isQuestion = item.type === QueryType.QUESTION;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
                  isQuestion
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-green-100 dark:bg-green-900/30"
                }`}
              >
                {isQuestion ? (
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={isQuestion ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {isQuestion ? "AI Question" : "Search"}
                  </Badge>
                  {item.aiModel && (
                    <Badge variant="outline" className="text-xs">
                      <Bot className="h-3 w-3 mr-1" />
                      {item.aiModel}
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium line-clamp-2">{item.query}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })}
              </div>
              {item.resultCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {item.resultCount} result{item.resultCount === 1 ? "" : "s"}
                </Badge>
              )}
            </div>
          </div>

          {isQuestion && item.aiResponse && (
            <div className="pl-13 pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-1">AI Response:</p>
              <p className="text-sm line-clamp-2">{item.aiResponse}</p>
            </div>
          )}

          <div className="flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground">
            {item.responseTime !== null && (
              <span>Response: {item.responseTime}ms</span>
            )}
            {item.tokensUsed !== null && (
              <span>Tokens: {item.tokensUsed.toLocaleString()}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

