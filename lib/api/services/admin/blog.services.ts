import { api } from "@/lib/axios";
import { buildQueryString, getApiError } from "@/lib/utils";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  readTimeMinutes: number;
  category: string;
  coverImageUrl: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: string; // Keep author if it exists in some contexts
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: BlogPost[];
}

export interface SingleBlogResponse {
  success: boolean;
  message: string;
  data: BlogPost;
}

export const getAdminBlogs = async (params = {}): Promise<BlogResponse> => {
  const queryString =  buildQueryString(params)
  const url = queryString ? `/admin/blog/?${queryString}` : "/admin/blog"
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {``
    throw new Error(getApiError(error));
  }
};

export const getAdminBlogById = async (id: string): Promise<SingleBlogResponse> => {
  try {
    const res = await api.get(`/admin/blog/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const createBlogPost = async (data: FormData): Promise<SingleBlogResponse> => {
  try {
    const res = await api.post("/admin/blog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateBlogPost = async (id: string, data: FormData): Promise<SingleBlogResponse> => {
  try {
    const res = await api.patch(`/admin/blog/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteBlogPost = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await api.delete(`/admin/blog/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
