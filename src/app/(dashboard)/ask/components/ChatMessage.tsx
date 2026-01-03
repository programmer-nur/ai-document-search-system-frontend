"use client";

import { User, Bot, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { SourceCitations } from "./SourceCitations";
import { FollowUpQuestions } from "./FollowUpQuestions";
import type { QuestionResponse } from "@/types/search.types";
import { Markdown } from "@/components/ui/markdown";

interface ChatMessageProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    response?: QuestionResponse;
    isLoading?: boolean;
  };
  onFollowUpClick?: (question: string) => void;
}

export function ChatMessage({ message, onFollowUpClick }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } animate-in slide-in-from-bottom-4 duration-300`}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={isUser ? "bg-primary text-primary-foreground" : "bg-muted"}
        >
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex-1 space-y-2 max-w-3xl ${
          isUser ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <Card
          className={`p-4 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {message.isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {isUser ? (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              ) : (
                <Markdown content={message.content} />
              )}
            </div>
          )}
        </Card>

        {!isUser && message.response && (
          <>
            <SourceCitations sources={message.response.sources} />
            {message.response.sources.length > 0 && (
              <FollowUpQuestions
                question={message.content}
                onQuestionClick={onFollowUpClick}
              />
            )}
          </>
        )}

        <span className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

