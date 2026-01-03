"use client";

import { RefreshCw, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Document } from "@/types/document.types";

interface DocumentActionsProps {
  document: Document | null;
  onReindex: () => Promise<void>;
  onDelete: () => Promise<void>;
  isReindexing?: boolean;
  isDeleting?: boolean;
}

export function DocumentActions({
  document,
  onReindex,
  onDelete,
  isReindexing = false,
  isDeleting = false,
}: DocumentActionsProps) {
  const router = useRouter();

  const handleReindex = async () => {
    try {
      await onReindex();
      toast.success("Re-indexing started", {
        description: "The document is being re-indexed. This may take a few minutes.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to start re-indexing. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success("Document deleted", {
        description: "The document has been successfully deleted.",
      });
      router.push("/documents");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete document. Please try again.",
      });
    }
  };

  if (!document) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleReindex}
        disabled={isReindexing}
      >
        {isReindexing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Re-indexing...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Re-index
          </>
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              document "{document.name}" and all associated data including
              chunks and embeddings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

