import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboardData, getProgramContent, DashboardResponse } from "@/lib/api/services/dashboard/dashboard.services";
import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";
import type { ModulePlatform } from "@/lib/api/services/dashboard/dashboard.services";

export const useGetDashboardData = (options?: any) => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData,
    ...options
  });
};

const determinePlatform = (url?: string | null, embedCode?: string | null): ModulePlatform => {
  const content = url || embedCode || "";
  
  if (content.startsWith("<iframe")) {
    if (content.includes("youtube.com") || content.includes("youtu.be")) return "EMBED_YOUTUBE";
    if (content.includes("vimeo.com")) return "EMBED_VIMEO";
    return "EMBED_UNKNOWN";
  }
  
  if (content.includes("youtube.com") || content.includes("youtu.be")) return "YOUTUBE";
  if (content.includes("vimeo.com")) return "VIMEO";
  
  return "EXTERNAL";
};

export const useGetProgramContent = (programId: string) => {
  return useQuery({
    queryKey: ["program-content", programId],
    queryFn: () => getProgramContent(programId),
    staleTime: 0,
    enabled: !!programId,
    select: (data) => {
      const transformedWeeks = data.data.weeks.map(week => ({
        ...week,
        modules: week.modules.map(mod => ({
          ...mod,
          isCompleted: !!mod.completedAt,
          platform: determinePlatform(mod.contentUrl, mod.embedCode)
        }))
      }));
      return {
        ...data,
        data: {
          ...data.data,
          weeks: transformedWeeks
        }
      };
    }
  });
};

export const useCompleteModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ programId, moduleId }: { programId: string; moduleId: string }) => {
      const res = await api.post(`/dashboard/programs/${programId}/modules/${moduleId}/complete`);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["program-content", variables.programId] });
    }
  });
};
