import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminBlogs,
  getAdminBlogById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../../services/admin/blog.services";
import { toast } from "sonner";

export const ADMIN_BLOGS_QUERY_KEY = ["admin-blogs"] as const;
export const adminBlogDetailQueryKey = (id: string) => ["admin-blog", id] as const;

export const useGetAdminBlogs = (params: any = {}) => {
  return useQuery({
    queryKey: [...ADMIN_BLOGS_QUERY_KEY, params.page, params.limit, params.search, params.status, params.category],
    queryFn: () => getAdminBlogs(params),
  });
};

export const useGetAdminBlogById = (id: string) => {
  return useQuery({
    queryKey: ["admin-blog", id],
    queryFn: () => getAdminBlogById(id),
    enabled: !!id,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: (response) => {
      toast.success(response.message || "Blog post created successfully");
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create blog post");
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateBlogPost(id, data),
    onSuccess: (response, variables) => {
      toast.success(response.message || "Blog post updated successfully");
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: ["admin-blog", variables.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update blog post");
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: (response) => {
      toast.success(response.message || "Blog post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete blog post");
    },
  });
};
