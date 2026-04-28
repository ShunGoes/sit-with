import { useQuery } from "@tanstack/react-query";
import { getPublishedBlogs, getPublicBlogBySlug } from "../../services/blog/blog.services";

export const PUBLIC_BLOGS_QUERY_KEY = ["public-blogs"] as const;
export const publicBlogDetailQueryKey = (slug: string) => ["public-blog", slug] as const;

export const useGetPublicBlogs = (params: any = {}) => {
  return useQuery({
    queryKey: [...PUBLIC_BLOGS_QUERY_KEY, params.search, params.category],
    queryFn: () => getPublishedBlogs(params),
  });
};

export const useGetPublicBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: publicBlogDetailQueryKey(slug),
    queryFn: () => getPublicBlogBySlug(slug),
    enabled: !!slug,
  });
};
