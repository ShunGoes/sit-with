import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../../services/admin/admin.services";

export const ADMIN_STATS_QUERY_KEY = ["admin-stats"] as const;

export const useGetAdminStats = () => {
  return useQuery({
    queryKey: ADMIN_STATS_QUERY_KEY,
    queryFn: getAdminStats,
    retry: false,
  });
};
