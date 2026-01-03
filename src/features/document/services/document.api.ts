import { baseApi } from "@/store/baseApi";
import type {
  CreateDocumentInput,
  UpdateDocumentInput,
  DocumentQueryParams,
  GetUploadUrlParams,
  GetUploadUrlResponse,
  CreateDocumentResponse,
  GetDocumentResponse,
  GetDocumentsResponse,
  UpdateDocumentResponse,
  DeleteDocumentResponse,
} from "@/types/document.types";

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUploadUrl: builder.query<GetUploadUrlResponse, { workspaceId: string; params: GetUploadUrlParams }>({
      query: ({ workspaceId, params }) => ({
        url: `/workspaces/${workspaceId}/documents/upload-url`,
        method: "GET",
        params: {
          fileName: params.fileName,
          contentType: params.contentType,
        },
      }),
    }),

    createDocument: builder.mutation<
      CreateDocumentResponse,
      { workspaceId: string; data: CreateDocumentInput }
    >({
      query: ({ workspaceId, data }) => ({
        url: `/workspaces/${workspaceId}/documents`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Documents", id: workspaceId },
        "Documents",
      ],
    }),

    getDocuments: builder.query<
      GetDocumentsResponse,
      { workspaceId: string; params?: DocumentQueryParams }
    >({
      query: ({ workspaceId, params }) => ({
        url: `/workspaces/${workspaceId}/documents`,
        method: "GET",
        params: params
          ? {
              ...(params.page && { page: params.page.toString() }),
              ...(params.limit && { limit: params.limit.toString() }),
              ...(params.search && { search: params.search }),
              ...(params.type && { type: params.type }),
              ...(params.status && { status: params.status }),
              ...(params.ingestionStatus && { ingestionStatus: params.ingestionStatus }),
            }
          : undefined,
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: "Documents", id: workspaceId },
      ],
    }),

    getDocumentById: builder.query<GetDocumentResponse, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Documents", id }],
    }),

    updateDocument: builder.mutation<
      UpdateDocumentResponse,
      { id: string; data: UpdateDocumentInput }
    >({
      query: ({ id, data }) => ({
        url: `/documents/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Documents", id },
        "Documents",
      ],
    }),

    deleteDocument: builder.mutation<DeleteDocumentResponse, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Documents", id },
        "Documents",
      ],
    }),

    reindexDocument: builder.mutation<
      { success: boolean; statusCode: number; message: string; data: null },
      string
    >({
      query: (id) => ({
        url: `/documents/${id}/reindex`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Documents", id },
        "Documents",
      ],
    }),
  }),
});

export const {
  useGetUploadUrlQuery,
  useLazyGetUploadUrlQuery,
  useCreateDocumentMutation,
  useGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useReindexDocumentMutation,
} = documentApi;

