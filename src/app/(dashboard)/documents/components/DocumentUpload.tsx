"use client";

import { useCallback, useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FileWithProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

interface DocumentUploadProps {
  onFilesSelected: (files: File[]) => void;
  isUploading?: boolean;
  uploadProgress?: Record<string, number>;
}

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/vnd.ms-powerpoint", // .ppt
  "text/plain", // .txt
  "text/markdown", // .md
  "text/csv", // .csv
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

function getFileType(file: File): string {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension || "unknown";
}

export function DocumentUpload({
  onFilesSelected,
  isUploading = false,
  uploadProgress = {},
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "File type not supported";
    }
    return null;
  };

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      const newErrors: Record<string, string> = {};

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors[file.name] = error;
        } else {
          validFiles.push(file);
        }
      });

      setErrors(newErrors);
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const removeFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== fileName));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fileName];
      return newErrors;
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-4">
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              {isDragging ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supported: PDF, DOCX, XLSX, PPTX, TXT, MD, CSV (Max 100MB)
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={isUploading}
          >
            Select Files
          </Button>
          <input
            id="file-input"
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES.join(",")}
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
        </CardContent>
      </Card>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Selected Files</h3>
          <div className="space-y-2">
            {selectedFiles.map((file) => {
              const progress = uploadProgress[file.name] || 0;
              const isUploadingFile =
                isUploading && progress > 0 && progress < 100;

              return (
                <Card key={file.name} className="p-4">
                  <div className="flex items-start gap-3">
                    <File className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeFile(file.name)}
                          disabled={isUploadingFile}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{getFileType(file).toUpperCase()}</span>
                        <span>•</span>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                      {isUploadingFile && (
                        <div className="mt-2">
                          <Progress value={progress} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {progress}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="space-y-2">
          {Object.entries(errors).map(([fileName, error]) => (
            <div
              key={fileName}
              className="rounded-md bg-destructive/10 border border-destructive/20 p-3"
            >
              <p className="text-sm font-medium text-destructive">{fileName}</p>
              <p className="text-xs text-destructive/80 mt-1">{error}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
