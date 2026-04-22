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
  status?: "UPCOMING" | "COMPLETED" | "CANCELLED" | "ONGOING";
  thumbnail?: string | null;
  createdAt?: string;
  updatedAt?: string;
  seatsRemaining: number;
}

export type CreateCampPayload = FormData;

export type UpdateCampPayload = FormData;

export interface CampsResponse {
  data: Camp[];
  message: string;
}

export interface CampResponse {
  data: Camp;
  message: string;
}

// get all camps created by admin
export const getCamps = async (): Promise<CampsResponse> => {
  try {
    const res = await api.get("/camps");
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// get camp details
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

// create camp
export const createCamp = async (
  payload: CreateCampPayload,
): Promise<CampResponse> => {
  try {
    const res = await api.post("/camps", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
// logged in users call this function to book a camp slot
export const bookACamp = async (id: string) => {
  if (!id) {
    throw new Error("Camp ID is required.");
  }
  try {
    const res = await api.post(`/camps/${id}/register`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// update camp details
export const updateCamp = async (
  id: string,
  payload: UpdateCampPayload,
): Promise<CampResponse> => {
  if (!id) {
    throw new Error("Camp ID is required for updates.");
  }

  try {
    const res = await api.patch(`/camps/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// delete camp from entries
export const deleteCamp = async (id: string): Promise<{ message: string }> => {
  if (!id) {
    throw new Error("Camp ID is required for deletion.");
  }

  try {
    const res = await api.delete(`/camps/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getCampParticipants = async (
  id: string,
): Promise<{ data: any; message: string }> => {
  try {
    const res = await api.get(`/camps/${id}/participants`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
