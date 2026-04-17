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

export const createProgram = async (payload: FormData) => {
  try {
    const res = await api.post("/programs", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

// --------------- publish and unpublish a program ----------------
export const publishProgram = async (id: string, payload: {title: string, isPublished: boolean}) => {
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

export const addWeekToProgram = async (
  id: string,
  payload: {title: string, description: string | undefined, learningObjectives: string[], modules: PublishWeekModule[]}
) => {
  if (!id) {
    throw new Error("Program ID is required for updates.");
  }

  try {
    const res = await api.post(`/programs/${id}/weeks`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const updateProgram = async (
  id: string,
  payload: FormData
) => {
  if (!id) {
    throw new Error("Program ID is required for updates.");
  }

  try {
    const res = await api.patch(`/programs/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

// --------------- existing weeks management ----------------

export const updateWeek = async (programId: string, weekId: string, payload: { title: string; description?: string; learningObjectives?: string[] }) => {
  try {
    const res = await api.patch(`/programs/${programId}/weeks/${weekId}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteWeek = async (programId: string, weekId: string) => {
  try {
    const res = await api.delete(`/programs/${programId}/weeks/${weekId}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const addModuleToWeek = async (programId: string, weekId: string, payload: any) => {
  try {
    const res = await api.post(`/programs/${programId}/weeks/${weekId}/modules`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateModule = async (programId: string, weekId: string, moduleId: string, payload: any) => {
  try {
    const res = await api.patch(`/programs/${programId}/weeks/${weekId}/modules/${moduleId}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteModule = async (programId: string, weekId: string, moduleId: string) => {
  try {
    const res = await api.delete(`/programs/${programId}/weeks/${weekId}/modules/${moduleId}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// ---------- Week publishing ----------

export interface PublishWeekModule {
  title: string;
  description?: string;
  type: string;
  duration: string;
  contentUrl: string;
  embedCode?: string;
}

export interface PublishWeekPayload {
  title: string;
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
