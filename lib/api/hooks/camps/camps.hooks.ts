import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCamps,
  getCamp,
  createCamp,
  updateCamp,
  deleteCamp,
  CreateCampPayload,
  UpdateCampPayload,
} from "../../services/camps/camps.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useGetCamps = () => {
  return useQuery({
    queryKey: ["camps"],
    queryFn: getCamps,
    retry: false,
  });
};

export const useGetCamp = (campId: string) => {
  return useQuery({
    queryKey: ["camps", campId],
    queryFn: () => getCamp(campId),
    enabled: Boolean(campId),
    retry: false,
  });
};

export const useCreateCamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCamp,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateCamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCampPayload }) =>
      updateCamp(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteCamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCamp,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
