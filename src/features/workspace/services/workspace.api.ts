import { baseApi } from "@/store/baseApi";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  WorkspaceQueryParams,
  AddMemberInput,
  UpdateMemberInput,
  CreateWorkspaceResponse,
  GetWorkspaceResponse,
  GetWorkspacesResponse,
  UpdateWorkspaceResponse,
  DeleteWorkspaceResponse,
  AddMemberResponse,
  GetMembersResponse,
  UpdateMemberResponse,
  RemoveMemberResponse,
} from "@/types/workspace.types";

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWorkspace: builder.mutation<CreateWorkspaceResponse, CreateWorkspaceInput>({
      query: (data) => ({
        url: "/workspaces",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Workspaces"],
    }),

    getWorkspaces: builder.query<GetWorkspacesResponse, WorkspaceQueryParams | void>({
      query: (params) => ({
        url: "/workspaces",
        method: "GET",
        params: params
          ? {
              ...(params.page && { page: params.page.toString() }),
              ...(params.limit && { limit: params.limit.toString() }),
              ...(params.search && { search: params.search }),
              ...(params.isActive !== undefined && {
                isActive: params.isActive.toString(),
              }),
            }
          : undefined,
      }),
      providesTags: ["Workspaces"],
    }),

    getWorkspaceById: builder.query<GetWorkspaceResponse, string>({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Workspaces", id }],
    }),

    updateWorkspace: builder.mutation<
      UpdateWorkspaceResponse,
      { id: string; data: UpdateWorkspaceInput }
    >({
      query: ({ id, data }) => ({
        url: `/workspaces/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Workspaces", id },
        "Workspaces",
      ],
    }),

    deleteWorkspace: builder.mutation<DeleteWorkspaceResponse, string>({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspaces"],
    }),

    getWorkspaceMembers: builder.query<GetMembersResponse, string>({
      query: (id) => ({
        url: `/workspaces/${id}/members`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Workspaces", id },
        { type: "WorkspaceMembers", id },
      ],
    }),

    addMember: builder.mutation<
      AddMemberResponse,
      { workspaceId: string; data: AddMemberInput }
    >({
      query: ({ workspaceId, data }) => ({
        url: `/workspaces/${workspaceId}/members`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Workspaces", id: workspaceId },
        { type: "WorkspaceMembers", id: workspaceId },
      ],
    }),

    updateMember: builder.mutation<
      UpdateMemberResponse,
      { workspaceId: string; memberId: string; data: UpdateMemberInput }
    >({
      query: ({ workspaceId, memberId, data }) => ({
        url: `/workspaces/${workspaceId}/members/${memberId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Workspaces", id: workspaceId },
        { type: "WorkspaceMembers", id: workspaceId },
      ],
    }),

    removeMember: builder.mutation<
      RemoveMemberResponse,
      { workspaceId: string; memberId: string }
    >({
      query: ({ workspaceId, memberId }) => ({
        url: `/workspaces/${workspaceId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Workspaces", id: workspaceId },
        { type: "WorkspaceMembers", id: workspaceId },
      ],
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useGetWorkspacesQuery,
  useGetWorkspaceByIdQuery,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useRemoveMemberMutation,
} = workspaceApi;

