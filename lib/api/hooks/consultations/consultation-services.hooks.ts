import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllConsultationServices,
  getConsultationServiceById,
  createConsultationService,
  updateConsultationService,
  updateConsultationStatus,
  CreateConsultationServicePayload,
  UpdateConsultationServicePayload,
  UpdateConsultationStatusPayload,
} from "../../services/consultations/consultation-services.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const CONSULTATION_SERVICES_QUERY_KEY = ["consultation-services"] as const;

export const useGetAllConsultationServices = () => {
  return useQuery({
    queryKey: CONSULTATION_SERVICES_QUERY_KEY,
    queryFn: getAllConsultationServices,
    retry: false,
  });
};

export const useGetConsultationServiceById = (id: string) => {
  return useQuery({
    queryKey: [...CONSULTATION_SERVICES_QUERY_KEY, id],
    queryFn: () => getConsultationServiceById(id),
    enabled: Boolean(id),
    retry: false,
  });
};

export const useCreateConsultationService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateConsultationServicePayload) =>
      createConsultationService(payload),
    onSuccess: (data) => {
      showSuccessToast(data.message ?? "Service created.");
      queryClient.invalidateQueries({ queryKey: CONSULTATION_SERVICES_QUERY_KEY });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateConsultationService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateConsultationServicePayload }) =>
      updateConsultationService(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message ?? "Service updated.");
      queryClient.invalidateQueries({ queryKey: CONSULTATION_SERVICES_QUERY_KEY });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateConsultationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateConsultationStatusPayload;
    }) => updateConsultationStatus(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message ?? "Status updated.");
      queryClient.invalidateQueries({ queryKey: CONSULTATION_SERVICES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
