import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  CreateProgramPayload,
  UpdateProgramPayload,
} from "../../services/programs/programs.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useGetPrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    retry: false,
  });
};

export const useGetProgram = (programId: string) => {
  return useQuery({
    queryKey: ["programs", programId],
    queryFn: () => getProgram(programId),
    enabled: Boolean(programId),
    retry: false,
  });
};

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProgram,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProgramPayload }) =>
      updateProgram(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProgram,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
