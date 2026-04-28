import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface Testimonial {
  id: string;
  campId: string | null;
  name: string;
  role: string;
  quote: string;
  isPublished: boolean;
  avatarUrl: string | null;
  camp?: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetTestimonialsParams {
  campId?: string;
  page?: number;
  limit?: number;
}

export interface TestimonialsResponse {
  data: Testimonial[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}


export const getAllTestimonials = async (
): Promise<TestimonialsResponse> => {
  try {
    const res = await api.get("/testimonials");
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getAdminTestimonials = async (
  params: GetTestimonialsParams
): Promise<TestimonialsResponse> => {
  try {
    const res = await api.get("/testimonials/admin/all", { params });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const createTestimonial = async (payload: FormData): Promise<{ data: Testimonial; message: string }> => {
  try {
    const res = await api.post("/testimonials", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateTestimonial = async (
  id: string,
  payload: FormData
): Promise<{ data: Testimonial; message: string }> => {
  if (!id) throw new Error("Testimonial ID is required");

  try {
    const res = await api.patch(`/testimonials/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteTestimonial = async (id: string): Promise<{ message: string }> => {
  if (!id) throw new Error("Testimonial ID is required");

  try {
    const res = await api.delete(`/testimonials/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
