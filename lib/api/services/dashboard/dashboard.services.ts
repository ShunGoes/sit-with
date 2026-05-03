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
  progress: ProgramProgress;
}

export interface CampRegistration {
  id: string;
  userId: string;
  campId: string;
  tierId: string | null;
  participantCount: number;
  applicantDetails: any;
  createdAt: string;
  camp: {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    thumbnail: string;
    status: string;
  };
}

export interface DashboardData {
  purchases: Purchase[];
  campRegistrations: CampRegistration[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export type ModulePlatform = "YOUTUBE" | "VIMEO" | "EMBED_YOUTUBE" | "EMBED_VIMEO" | "EMBED_UNKNOWN" | "EXTERNAL";

export interface Module {
  id: string;
  weekId: string;
  title: string;
  description: string | null;
  type: "VIDEO" | "READING" | "QUIZ" | "ASSIGNMENT";
  duration: string | null;
  contentUrl: string | null;
  embedCode: string | null;
  order: number;
  isCompleted: boolean;
  platform?: ModulePlatform;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
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

export interface ProgramProgress {
  totalWeeks: number;
  completedWeeks: number;
  currentWeekDisplayOrder: number | null;
  totalModules: number;
  completedModules: number;
  percentComplete: number;
  weeks: {
    weekId: string;
    title: string;
    order: number;
    moduleCount: number;
    modulesCompletedCount: number;
    isWeekComplete: boolean;
  }[];
  isProgramCompleted: boolean;
  programCompletedAt: string | null;
}

export interface ProgramDetail extends Program {
  learningOutcomes: string[];
  weeks: Week[];
  facilitatorEmail: string | null;
  certificateLabel: string | null;
  createdAt: string;
  updatedAt: string;
  progress: ProgramProgress;
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
