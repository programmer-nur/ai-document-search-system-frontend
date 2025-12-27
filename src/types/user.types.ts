export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
}

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User[];
  meta: PaginationMeta;
}

export interface GetUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface UpdateUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface DeleteUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}
