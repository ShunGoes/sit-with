import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface ContactPayload {
  subject: string;
  message: string;
}

export const contactFacilitator = async (data: {
  programId: string;
  payload: ContactPayload;
}) => {
  try {
    const res = await api.post(
      `/dashboard/programs/${data.programId}/contact-facilitator`,
      data.payload,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const contactSupport = async (data: ContactPayload) => {
  try {
    const res = await api.post("/dashboard/support/contact", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export interface SubmitContactPayload {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export const submitContactForm = async (data: SubmitContactPayload) => {
  try {
    const res = await api.post("/contact", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  createdAt: string;
}

export interface GetAdminContactSubmissionsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetAdminContactSubmissionsResponse {
  success: boolean;
  message: string;
  data: ContactSubmission[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAdminContactSubmissions = async (
  params?: GetAdminContactSubmissionsParams,
): Promise<GetAdminContactSubmissionsResponse> => {
  try {
    const res = await api.get("/admin/contact-submissions", { params });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const deleteContactSubmission = async (id: string) => {
  try {
    const res = await api.delete(`/admin/contact-submissions/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
