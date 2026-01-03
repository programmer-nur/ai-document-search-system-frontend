import { baseApi } from "@/store/baseApi";
import type {
  SearchInput,
  QuestionInput,
  QueryHistoryParams,
  SearchApiResponse,
  QuestionApiResponse,
  GetQueryHistoryResponse,
} from "@/types/search.types";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.mutation<SearchApiResponse, { workspaceId: string; data: SearchInput }>({
      query: ({ workspaceId, data }) => ({
        url: `/workspaces/${workspaceId}/search`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Search", id: workspaceId },
        "Search",
      ],
    }),

    askQuestion: builder.mutation<
      QuestionApiResponse,
      { workspaceId: string; data: QuestionInput }
    >({
      query: ({ workspaceId, data }) => ({
        url: `/workspaces/${workspaceId}/question`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Search", id: workspaceId },
        "Search",
      ],
    }),

    getQueryHistory: builder.query<
      GetQueryHistoryResponse,
      { workspaceId: string; params?: QueryHistoryParams }
    >({
      query: ({ workspaceId, params }) => ({
        url: `/workspaces/${workspaceId}/queries`,
        method: "GET",
        params: params
          ? {
              ...(params.page && { page: params.page.toString() }),
              ...(params.limit && { limit: params.limit.toString() }),
              ...(params.type && { type: params.type }),
            }
          : undefined,
      }),
      providesTags: (result, error, { workspaceId }) => [
        { type: "Search", id: workspaceId },
      ],
    }),
  }),
});

export const {
  useSearchMutation,
  useAskQuestionMutation,
  useGetQueryHistoryQuery,
} = searchApi;

