"use client";

import Link from "next/link";
import { FileText, MoreVertical, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import type { Document } from "@/types/document.types";
import { DocumentStatus, IngestionStatus } from "@/types/document.types";
import { formatDistanceToNow } from "date-fns";

interface DocumentsTableProps {
  documents: Document[];
  isLoading?: boolean;
  onDelete?: (documentId: string) => void;
}

const statusColors: Record<
  DocumentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [DocumentStatus.PENDING]: "outline",
  [DocumentStatus.UPLOADING]: "outline",
  [DocumentStatus.UPLOADED]: "secondary",
  [DocumentStatus.PROCESSING]: "secondary",
  [DocumentStatus.PROCESSED]: "default",
  [DocumentStatus.FAILED]: "destructive",
  [DocumentStatus.DELETED]: "outline",
};

const ingestionStatusColors: Record<
  IngestionStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [IngestionStatus.PENDING]: "outline",
  [IngestionStatus.PARSING]: "secondary",
  [IngestionStatus.CHUNKING]: "secondary",
  [IngestionStatus.EMBEDDING]: "secondary",
  [IngestionStatus.INDEXING]: "secondary",
  [IngestionStatus.COMPLETED]: "default",
  [IngestionStatus.FAILED]: "destructive",
};

function formatFileSize(bytes: string): string {
  const size = parseInt(bytes);
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function safeFormatDistance(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}

export function DocumentsTable({
  documents,
  isLoading = false,
  onDelete,
}: DocumentsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-md border p-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-sm font-medium mb-1">No documents yet</p>
        <p className="text-sm text-muted-foreground">
          Upload your first document to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => {
            const uploadedDate = safeFormatDistance(
              document.uploadedAt || document.createdAt
            );

            return (
              <TableRow key={document.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Link
                      href={`/dashboard/documents/${document.id}`}
                      className="font-medium hover:underline truncate"
                    >
                      {document.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{document.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant={statusColors[document.status]}>
                      {document.status}
                    </Badge>
                    {document.ingestionStatus !== IngestionStatus.COMPLETED &&
                      document.ingestionStatus !== IngestionStatus.PENDING && (
                        <Badge
                          variant={
                            ingestionStatusColors[document.ingestionStatus]
                          }
                          className="text-xs"
                        >
                          {document.ingestionStatus}
                        </Badge>
                      )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatFileSize(document.size)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {uploadedDate}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/documents/${document.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(document.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
