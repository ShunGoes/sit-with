import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getConsultations,
  getConsultation,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  UpdateConsultationPayload,
  bookConsultation,
} from "../../services/consultations/consultations.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useGetConsultations = (params: any = {}) => {
  return useQuery({
    queryKey: ["consultations", params.page, params.limit, params.search],
    queryFn: () => getConsultations(params),
    retry: false,
  });
};

export const useGetConsultation = (consultationId: string) => {
  return useQuery({
    queryKey: ["consultations", consultationId],
    queryFn: () => getConsultation(consultationId),
    enabled: Boolean(consultationId),
    retry: false,
  });
};

export const useCreateConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConsultation,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateConsultationPayload }) =>
      updateConsultation(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConsultation,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useBookConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookConsultation,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
