import type { PaginationMeta } from "./user.types";

export enum QueryType {
  SEARCH = "SEARCH",
  QUESTION = "QUESTION",
}

export interface SearchInput {
  query: string;
  limit?: number;
  documentIds?: string[];
}

export interface QuestionInput {
  question: string;
  limit?: number;
  documentIds?: string[];
  model?: string;
}

export interface SearchResult {
  chunkId: string;
  documentId: string;
  documentName: string;
  content: string;
  score: number;
  pageNumber?: number;
  sectionTitle?: string;
  metadata?: Record<string, unknown>;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  metadata?: {
    vectorResults?: number;
    keywordResults?: number;
    searchTime?: number;
  };
}

export interface QuestionResponse {
  answer: string;
  sources: Array<{
    chunkId: string;
    documentId: string;
    documentName: string;
    content: string;
    pageNumber?: number;
  }>;
  query: string;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    responseTime?: number;
    searchTime?: number;
  };
}

export interface QueryHistoryParams {
  page?: number;
  limit?: number;
  type?: QueryType;
}

export interface QueryHistoryItem {
  id: string;
  type: QueryType;
  query: string;
  resultCount: number;
  aiResponse: string | null;
  aiModel: string | null;
  tokensUsed: number | null;
  responseTime: number | null;
  createdAt: string;
}

export interface SearchApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SearchResponse;
}

export interface QuestionApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: QuestionResponse;
}

export interface GetQueryHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: QueryHistoryItem[];
  meta: PaginationMeta;
}

