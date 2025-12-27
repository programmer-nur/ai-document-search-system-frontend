import { baseApi } from "@/store/baseApi";
import type {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
  RegisterResponse,
  LoginResponse,
  GetCurrentUserResponse,
  ChangePasswordResponse,
} from "@/types/auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterInput>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<LoginResponse, LoginInput>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),

    getCurrentUser: builder.query<GetCurrentUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordInput>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useChangePasswordMutation,
} = authApi;

