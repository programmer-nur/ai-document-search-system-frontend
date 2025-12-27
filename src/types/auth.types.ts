import type { User, UserRole } from "./user.types";

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthResponse;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthResponse;
}

export interface GetCurrentUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface ChangePasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}

