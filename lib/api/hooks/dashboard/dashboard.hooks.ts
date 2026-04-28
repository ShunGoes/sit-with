import { useQuery } from "@tanstack/react-query";
import { getDashboardData, getProgramContent } from "@/lib/api/services/dashboard/dashboard.services";

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData,
  });
};

export const useGetProgramContent = (programId: string) => {
  return useQuery({
    queryKey: ["program-content", programId],
    queryFn: () => getProgramContent(programId),
    enabled: !!programId,
  });
};
