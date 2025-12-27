import { baseApi } from "@/store/baseApi";
import type {
  User,
  UpdateUserInput,
  GetUsersQueryParams,
  GetUsersResponse,
  GetUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from "@/types/user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersQueryParams>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: {
          ...(params.page && { page: params.page.toString() }),
          ...(params.limit && { limit: params.limit.toString() }),
          ...(params.search && { search: params.search }),
          ...(params.role && { role: params.role }),
          ...(params.isActive !== undefined && {
            isActive: params.isActive.toString(),
          }),
        },
      }),
      providesTags: ["Users"],
    }),

    getUserById: builder.query<GetUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    updateUser: builder.mutation<
      UpdateUserResponse,
      { id: string; data: UpdateUserInput }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        "Users",
      ],
    }),

    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
