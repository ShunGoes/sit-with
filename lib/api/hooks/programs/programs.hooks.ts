import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  get_programs,
  get_program_by_ID,
  createProgram,
  updateProgram,
  delete_program,
  UpdateProgramPayload,
  get_all_admin_programs,
  publish_week,
  PublishWeekPayload,
} from "../../services/programs/programs.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useGetPrograms = () => {
  return useQuery({
    queryKey: ["programs", "all"],
    queryFn: get_programs,
    retry: false,
  });
};

export const useGetAllAdminPrograms = (param = {}) => {
  return useQuery({
    queryKey: ["programs", "admin", param],
    queryFn: () => get_all_admin_programs(param),
    retry: false,
  });
};

export const useGetProgramById = (programId: string) => {
  return useQuery({
    queryKey: ["programs", programId],
    queryFn: () => get_program_by_ID(programId),
    enabled: Boolean(programId),
    retry: false,
  });
};

// create new program 
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
    mutationFn: delete_program,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

// Publish a draft week (with its modules) to a program
export const usePublishWeek = (programId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PublishWeekPayload) =>
      publish_week(programId, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message || "Week published successfully");
      // Invalidate the specific program so the weeks list refreshes
      queryClient.invalidateQueries({ queryKey: ["programs", programId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to publish week");
    },
  });
};

