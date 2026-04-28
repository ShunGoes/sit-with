import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";
import {
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  GetTestimonialsParams,
  getAllTestimonials,
} from "../../services/testimonials/testimonials.services";

export const useGetAllTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials", "all"],
    queryFn: getAllTestimonials,
  });
};
export const useGetAdminTestimonials = (params: GetTestimonialsParams) => {
  return useQuery({
    queryKey: ["admin-testimonials", params],
    queryFn: () => getAdminTestimonials(params),
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials", "all"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      updateTestimonial(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials", "all"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials", "all"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
