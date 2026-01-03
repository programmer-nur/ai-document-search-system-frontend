"use client";

import { History } from "lucide-react";

export function ActivityHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
        <History className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Activity & History</h1>
        <p className="text-sm text-muted-foreground">
          View your search history, AI questions, and audit logs
        </p>
      </div>
    </div>
  );
}

