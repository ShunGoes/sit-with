import { api } from "@/lib/axios";
import { buildQueryString, getApiError } from "@/lib/utils";
import { ProgramFormSchema } from "@/schemas/programs-schema";

export interface Program {
  id: string;
  programName: string;
  programType: string;
  programDuration: string;
  description: string;
  amount: string;
  status?: "Active" | "Inactive";
  enrolled?: number;
}

export interface CreateProgramPayload {
  price: number;
  title: string;
  description: string;
  thumbnail: string | File;
  programType: "student" | "professional" | "leader";
  duration: string;
}

export interface UpdateProgramPayload extends Partial<CreateProgramPayload> {}

export interface ProgramsResponse {
  data: Program[];
  message: string;
}

export interface ProgramResponse {
  data: Program;
  message: string;
}

export const get_programs = async () => {
  try {
    const res = await api.get("/programs");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const get_all_admin_programs = async (param = {}) => {
  const queryString = buildQueryString(param);
  const url = queryString ? `?${queryString}` : "";
  try {
    const res = await api.get(`/programs/admin/all${url}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const get_program_by_ID = async (id: string) => {
  if (!id) {
    throw new Error("Program ID is required.");
  }

  try {
    const res = await api.get(`/programs/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const createProgram = async (payload: CreateProgramPayload) => {
  try {
    const res = await api.post("/programs", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const updateProgram = async (
  id: string,
  payload: UpdateProgramPayload
): Promise<ProgramResponse> => {
  if (!id) {
    throw new Error("Program ID is required for updates.");
  }

  try {
    const res = await api.patch(`/programs/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const delete_program = async (id: string) => {
  if (!id) {
    throw new Error("Program ID is required for deletion.");
  }

  try {
    const res = await api.delete(`/programs/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// ---------- Week publishing ----------

export interface PublishWeekModule {
  moduleTitle: string;
  description?: string;
  type: string;
  duration: string;
  contentLink: string;
  embedCode?: string;
}

export interface PublishWeekPayload {
  weekTitle: string;
  description?: string;
  learningObjectives: string[];
  modules: PublishWeekModule[];
}

// TODO: replace with real endpoint
export const publish_week = async (
  programId: string,
  payload: PublishWeekPayload
) => {
  if (!programId) {
    throw new Error("Program ID is required to publish a week.");
  }

  try {
    const res = await api.post(`/programs/${programId}/weeks`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
