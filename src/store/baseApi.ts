import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      formData?: boolean;
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        params,
      };

      const result = await axiosInstance(config);

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<{
        message?: string;
        error?: string;
      }>;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || {
            message: err.message || "An error occurred",
          },
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "Users",
    "Auth",
    "Workspaces",
    "WorkspaceMembers",
    "Documents",
    "Search",
  ],
  endpoints: () => ({}),
});
