import { api } from "@/lib/axios";
import { buildQueryString, getApiError } from "@/lib/utils";
import { ProgramFormSchema } from "@/schemas/programs-schema";

export interface Program {
  id: string;
  programName: string;
  progrmType: string;
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
  programType: "students" | "professionals" | "leaders";
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

export const getPrograms = async () => {
  try {
    const res = await api.get("/programs");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const get_all_admin_programs = async (param = {}) => {
  const queryString = buildQueryString(param)
  const url = queryString ? `?${queryString}` : ""
  try {
    const res = await api.get(`/programs/admin/all${url}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getProgram = async (id: string) => {
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

export const deleteProgram = async (
  id: string
): Promise<{ message: string }> => {
  if (!id) {
    throw new Error("Program ID is required for deletion.");
  }

  try {
    const res = await api.delete(`/programs/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
