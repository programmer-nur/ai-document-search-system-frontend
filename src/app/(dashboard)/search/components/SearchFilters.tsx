"use client";

import { Calendar, FileText, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DocumentType } from "@/types/document.types";

interface SearchFiltersProps {
  documentType?: DocumentType;
  dateRange?: "all" | "today" | "week" | "month" | "year";
  onDocumentTypeChange?: (type: DocumentType | undefined) => void;
  onDateRangeChange?: (range: "all" | "today" | "week" | "month" | "year") => void;
  onClear?: () => void;
}

export function SearchFilters({
  documentType,
  dateRange = "all",
  onDocumentTypeChange,
  onDateRangeChange,
  onClear,
}: SearchFiltersProps) {
  const hasActiveFilters = documentType || dateRange !== "all";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filters</CardTitle>
          {hasActiveFilters && onClear && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-7 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Type
          </label>
          <Select
            value={documentType || "all"}
            onValueChange={(value) =>
              onDocumentTypeChange?.(
                value === "all" ? undefined : (value as DocumentType)
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={DocumentType.PDF}>PDF</SelectItem>
              <SelectItem value={DocumentType.DOCX}>DOCX</SelectItem>
              <SelectItem value={DocumentType.DOC}>DOC</SelectItem>
              <SelectItem value={DocumentType.XLSX}>XLSX</SelectItem>
              <SelectItem value={DocumentType.XLS}>XLS</SelectItem>
              <SelectItem value={DocumentType.PPTX}>PPTX</SelectItem>
              <SelectItem value={DocumentType.PPT}>PPT</SelectItem>
              <SelectItem value={DocumentType.TXT}>TXT</SelectItem>
              <SelectItem value={DocumentType.MD}>Markdown</SelectItem>
              <SelectItem value={DocumentType.CSV}>CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </label>
          <Select
            value={dateRange}
            onValueChange={(value) =>
              onDateRangeChange?.(
                value as "all" | "today" | "week" | "month" | "year"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {documentType && (
              <Badge variant="secondary" className="text-xs">
                Type: {documentType}
              </Badge>
            )}
            {dateRange !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

