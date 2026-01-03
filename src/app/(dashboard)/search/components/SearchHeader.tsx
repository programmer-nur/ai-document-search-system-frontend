"use client";

import { Search } from "lucide-react";

export function SearchHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
        <Search className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-sm text-muted-foreground">
          Search across all your documents with keyword and semantic search
        </p>
      </div>
    </div>
  );
}

