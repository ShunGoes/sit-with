import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface Camp {
  id: string;
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  status?: "upcoming" | "completed" | "cancelled";
}

export interface CreateCampPayload {
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
}

export interface UpdateCampPayload extends Partial<CreateCampPayload> {}

export interface CampsResponse {
  data: Camp[];
  message: string;
}

export interface CampResponse {
  data: Camp;
  message: string;
}

export const getCamps = async (): Promise<CampsResponse> => {
  try {
    const res = await api.get("/camps");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const getCamp = async (id: string): Promise<CampResponse> => {
  if (!id) {
    throw new Error("Camp ID is required.");
  }

  try {
    const res = await api.get(`/camps/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const createCamp = async (
  payload: CreateCampPayload
): Promise<CampResponse> => {
  try {
    const res = await api.post("/camps", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const updateCamp = async (
  id: string,
  payload: UpdateCampPayload
): Promise<CampResponse> => {
  if (!id) {
    throw new Error("Camp ID is required for updates.");
  }

  try {
    const res = await api.patch(`/camps/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const deleteCamp = async (id: string): Promise<{ message: string }> => {
  if (!id) {
    throw new Error("Camp ID is required for deletion.");
  }

  try {
    const res = await api.delete(`/camps/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
