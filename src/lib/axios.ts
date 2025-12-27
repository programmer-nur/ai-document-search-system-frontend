import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        handleUnauthorized();
      }

      const normalizedError = normalizeError(error);
      return Promise.reject(normalizedError);
    }

    if (error.request) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
        status: 0,
      });
    }

    return Promise.reject({
      message: "An unexpected error occurred",
      status: 500,
    });
  }
);

function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  return token || null;
}

function handleUnauthorized() {
  if (typeof window !== "undefined") {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  }
}

function normalizeError(error: AxiosError) {
  const response = error.response;

  if (!response) {
    return {
      message: "Network error. Please check your connection.",
      status: 0,
    };
  }

  const data = response.data as { message?: string; error?: string };

  return {
    message:
      data?.message || data?.error || "An error occurred. Please try again.",
    status: response.status,
    data: response.data,
  };
}

export default axiosInstance;
