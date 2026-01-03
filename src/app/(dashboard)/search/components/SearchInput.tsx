"use client";

import { useState, KeyboardEvent } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchInputProps {
  onSearch: (query: string, searchType: "keyword" | "semantic") => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function SearchInput({
  onSearch,
  isLoading = false,
  disabled = false,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"keyword" | "semantic">(
    "semantic"
  );

  const handleSearch = () => {
    if (query.trim() && !isLoading && !disabled) {
      onSearch(query.trim(), searchType);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Tabs
          value={searchType}
          onValueChange={(value) =>
            setSearchType(value as "keyword" | "semantic")
          }
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="semantic">Semantic Search</TabsTrigger>
            <TabsTrigger value="keyword">Keyword Search</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                searchType === "semantic"
                  ? "Search by meaning and context..."
                  : "Search by keywords..."
              }
              className="pl-9"
              disabled={isLoading || disabled}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={!query.trim() || isLoading || disabled}
            className="shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

