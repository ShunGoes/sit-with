import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

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
  programName: string;
  progrmType: string;
  programDuration: string;
  description: string;
  amount: string;
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

export const getPrograms = async (): Promise<ProgramsResponse> => {
  try {
    const res = await api.get("/programs");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const getProgram = async (id: string): Promise<ProgramResponse> => {
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

export const createProgram = async (
  payload: CreateProgramPayload
): Promise<ProgramResponse> => {
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
    const res = await api.patch(`/programs/${id}`,
 payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const deleteProgram = async (id: string): Promise<{ message: string }> => {
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
