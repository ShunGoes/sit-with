import { api } from "@/lib/axios";
import { buildQueryString, getApiError } from "@/lib/utils";
import { BlogResponse, SingleBlogResponse } from "../admin/blog.services";

export const getPublishedBlogs = async (params = {}): Promise<BlogResponse> => {
  const queryString = buildQueryString(params);
  const url = queryString ? `/blog/?${queryString}` : "/blog";
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getPublicBlogBySlug = async (slug: string): Promise<SingleBlogResponse> => {
  try {
    const res = await api.get(`/blog/${slug}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
