import type { PaginationMeta } from "./user.types";

export enum WorkspaceRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  isActive: boolean;
  settings: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkspaceInput {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  settings?: Record<string, unknown>;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
  settings?: Record<string, unknown>;
}

export interface WorkspaceQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
  };
  joinedAt: string;
  createdAt: string;
}

export interface AddMemberInput {
  userId: string;
  role: WorkspaceRole;
}

export interface UpdateMemberInput {
  role: WorkspaceRole;
}

export interface CreateWorkspaceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Workspace;
}

export interface GetWorkspaceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Workspace;
}

export interface GetWorkspacesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Workspace[];
  meta: PaginationMeta;
}

export interface UpdateWorkspaceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Workspace;
}

export interface DeleteWorkspaceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}

export interface AddMemberResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: WorkspaceMember;
}

export interface GetMembersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: WorkspaceMember[];
}

export interface UpdateMemberResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: WorkspaceMember;
}

export interface RemoveMemberResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}

