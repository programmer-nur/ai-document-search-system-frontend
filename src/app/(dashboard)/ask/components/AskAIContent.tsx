"use client";

import { useState, useRef, useEffect } from "react";
import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useAskQuestionMutation } from "@/features/search/services";
import { toast } from "sonner";
import { AskAIHeader } from "./AskAIHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { QuestionResponse } from "@/types/search.types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  response?: QuestionResponse;
  isLoading?: boolean;
}

export function AskAIContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useGetWorkspacesQuery({});
  const workspaceId = workspacesData?.data?.[0]?.id;

  const [askQuestion, { isLoading: isAsking }] = useAskQuestionMutation();

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!workspaceId) {
      toast.error("Error", {
        description: "No workspace found. Please create a workspace first.",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Add loading assistant message
    const loadingMessage: Message = {
      id: `assistant-loading-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await askQuestion({
        workspaceId,
        data: {
          question: content,
          limit: 5,
        },
      }).unwrap();

      // Update loading message with response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: response.data.answer,
                response: response.data,
                isLoading: false,
              }
            : msg
        )
      );

      toast.success("Answer generated", {
        description: "AI has provided an answer based on your documents.",
      });
    } catch (error: any) {
      // Update loading message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content:
                  error?.data?.message ||
                  "Sorry, I couldn't process your question. Please try again.",
                isLoading: false,
              }
            : msg
        )
      );

      toast.error("Error", {
        description:
          error?.data?.message || "Failed to get answer. Please try again.",
      });
    }
  };

  const handleFollowUpClick = (question: string) => {
    handleSendMessage(question);
  };

  if (isLoadingWorkspaces) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-64" />
        <Card className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="space-y-6">
        <AskAIHeader />
        <Card className="p-6">
          <p className="text-muted-foreground text-center">
            No workspace found. Please create a workspace first.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-6">
      <AskAIHeader />

      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-6 pb-4">
            {messages.length === 0 ? (
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Ask questions about your documents and get AI-powered
                      answers with source citations.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {[
                      "What are the main points?",
                      "Can you summarize this?",
                      "What does this document say about...?",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSendMessage(suggestion)}
                        className="px-4 py-2 text-sm rounded-md border bg-background hover:bg-accent transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onFollowUpClick={handleFollowUpClick}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4">
          <ChatInput
            onSend={handleSendMessage}
            isLoading={isAsking}
            disabled={!workspaceId}
          />
        </div>
      </div>
    </div>
  );
}
