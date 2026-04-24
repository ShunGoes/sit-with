import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface RecentPayment {
  id: string;
  userId: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  paystackRef: string;
}

export interface AdminStats {
  totalUsers: number;
  totalPrograms: number;
  totalCamps: number;
  totalConsultations: number;
  totalRevenue: number;
  recentPayments: RecentPayment[];
}

export interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: AdminStats;
}

export const getAdminStats = async (): Promise<AdminStatsResponse> => {
  try {
    const res = await api.get("/admin/stats");
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
