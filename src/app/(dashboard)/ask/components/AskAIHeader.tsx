"use client";

import { Sparkles } from "lucide-react";

export function AskAIHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Ask AI</h1>
        <p className="text-sm text-muted-foreground">
          Ask questions about your documents and get AI-powered answers
        </p>
      </div>
    </div>
  );
}

