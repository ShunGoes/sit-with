import { api } from "@/lib/axios";
import { buildQueryString, getApiError } from "@/lib/utils";

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
  _count: {
    purchases: number;
    campRegistrations: number;
    consultations: number;
  };
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: AdminUser[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

export const getAllUsers = async (params = {}): Promise<UsersResponse> => {
  const queryString = buildQueryString(params);
  const url = queryString ? `/admin/users?${queryString}` : `/admin/users`; 
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
