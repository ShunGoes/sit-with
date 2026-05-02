import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface Program {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  isPublished: boolean;
  durationWeeks: number | null;
  hoursPerWeek: number | null;
  facilitatorName: string | null;
  startDate: string | null;
  _count: {
    weeks: number;
  };
}

export interface Purchase {
  id: string;
  userId: string;
  programId: string;
  createdAt: string;
  program: Program;
}

export interface DashboardData {
  purchases: Purchase[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export interface Module {
  id: string;
  weekId: string;
  title: string;
  description: string | null;
  type: "VIDEO" | "READING" | "QUIZ";
  duration: string | null;
  contentUrl: string | null;
  embedCode: string | null;
  order: number;
  isCompleted: boolean;
}

export interface Week {
  id: string;
  programId: string;
  title: string;
  description: string | null;
  learningObjectives: string[];
  order: number;
  modules: Module[];
}

export interface ProgramDetail extends Program {
  learningOutcomes: string[];
  weeks: Week[];
  facilitatorEmail: string | null;
}

export interface ProgramContentResponse {
  success: boolean;
  message: string;
  data: ProgramDetail;
}

export const getDashboardData = async (): Promise<DashboardResponse> => {
  try {
    const res = await api.get("/dashboard");
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getProgramContent = async (programId: string): Promise<ProgramContentResponse> => {
  try {
    const res = await api.get(`/dashboard/programs/${programId}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
