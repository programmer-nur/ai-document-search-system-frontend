import type { PaginationMeta } from "./user.types";

export enum DocumentStatus {
  PENDING = "PENDING",
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
  FAILED = "FAILED",
  DELETED = "DELETED",
}

export enum DocumentType {
  PDF = "PDF",
  DOCX = "DOCX",
  DOC = "DOC",
  XLSX = "XLSX",
  XLS = "XLS",
  PPTX = "PPTX",
  PPT = "PPT",
  TXT = "TXT",
  MD = "MD",
  CSV = "CSV",
  OTHER = "OTHER",
}

export enum IngestionStatus {
  PENDING = "PENDING",
  PARSING = "PARSING",
  CHUNKING = "CHUNKING",
  EMBEDDING = "EMBEDDING",
  INDEXING = "INDEXING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Document {
  id: string;
  workspaceId: string;
  name: string;
  originalName: string;
  type: DocumentType;
  mimeType: string;
  size: string; // BigInt is serialized as string
  status: DocumentStatus;
  s3Key: string;
  s3Bucket: string;
  s3Region: string;
  s3Url: string | null;
  thumbnailUrl: string | null;
  pageCount: number | null;
  wordCount: number | null;
  language: string | null;
  metadata: Record<string, unknown> | null;
  ingestionStatus: IngestionStatus;
  ingestionStartedAt: string | null;
  ingestionCompletedAt: string | null;
  ingestionError: string | null;
  chunkCount: number;
  embeddingCount: number;
  qdrantCollectionId: string | null;
  uploadedAt: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentInput {
  name: string;
  originalName: string;
  type: DocumentType;
  mimeType: string;
  size: number;
  s3Key: string;
  s3Bucket: string;
  s3Region: string;
  s3Url?: string;
  thumbnailUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDocumentInput {
  name?: string;
  metadata?: Record<string, unknown>;
}

export interface DocumentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: DocumentType;
  status?: DocumentStatus;
  ingestionStatus?: IngestionStatus;
}

export interface GetUploadUrlParams {
  fileName: string;
  contentType: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  s3Key: string;
  expiresIn: number;
}

export interface GetUploadUrlResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UploadUrlResponse;
}

export interface CreateDocumentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Document;
}

export interface GetDocumentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Document;
}

export interface GetDocumentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Document[];
  meta: PaginationMeta;
}

export interface UpdateDocumentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Document;
}

export interface DeleteDocumentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}

