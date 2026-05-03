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
  publishProgram,
  addWeekToProgram,
  PublishWeekModule,
  updateWeek,
  deleteWeek,
  addModuleToWeek,
  updateModule,
  deleteModule,
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
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      updateProgram(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
export const usePublishProgram = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {title: string, isPublished: boolean}) =>
      publishProgram(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
export const useAddWeekToProgram = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {title: string, description: string | undefined, learningObjectives: string[], modules: PublishWeekModule[]}) =>
      addWeekToProgram(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
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
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

// --------------- existing weeks & modules hooks ----------------

export const useUpdateWeek = (programId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ weekId, payload }: { weekId: string; payload: { title: string; description?: string; learningObjectives?: string[] } }) =>
      updateWeek(programId, weekId, payload),
    onSuccess: (data) => {
      showSuccessToast(data?.message || "Week updated successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteWeek = (programId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weekId: string) => deleteWeek(programId, weekId),
    onSuccess: (data) => {
      showSuccessToast(data?.message || "Week deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useAddModuleToWeek = (programId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ weekId, payload }: { weekId: string; payload: any }) =>
      addModuleToWeek(programId, weekId, payload),
    onSuccess: (data) => {
      showSuccessToast(data?.message || "Module added successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateModule = (programId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ weekId, moduleId, payload }: { weekId: string; moduleId: string; payload: any }) =>
      updateModule(programId, weekId, moduleId, payload),
    onSuccess: (data) => {
      showSuccessToast(data?.message || "Module updated successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteModule = (programId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ weekId, moduleId }: { weekId: string; moduleId: string }) =>
      deleteModule(programId, weekId, moduleId),
    onSuccess: (data) => {
      showSuccessToast(data?.message || "Module deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
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
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      queryClient.invalidateQueries({ queryKey: ["program-content"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to publish week");
    },
  });
};

