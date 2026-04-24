import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";
import {
  CampTier,
  CampImage,
  CreateCampTierPayload,
  UpdateCampTierPayload,
} from "@/types/camps.types";

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
  tiers?: CampTier[];
  images?: CampImage[];
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
  payload: CreateCampPayload
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
export const bookACamp = async ({campId, payload}: {campId: string, payload: any}) => {
  if (!campId) {
    throw new Error("Camp ID is required.");
  }
  try {
    const res = await api.post(`/camps/${campId}/register`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// update camp details
export const updateCamp = async (
  id: string,
  payload: UpdateCampPayload
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
  id: string
): Promise<{ data: any; message: string }> => {
  try {
    const res = await api.get(`/camps/${id}/participants`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

// ===================== CAMP TIERS =====================

export const createCampTier = async (
  campId: string,
  payload: CreateCampTierPayload
): Promise<{ data: CampTier; message: string }> => {
  if (!campId) {
    throw new Error("Camp ID is required.");
  }

  try {
    const res = await api.post(`/camps/${campId}/tiers`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateCampTier = async (
  campId: string,
  tierId: string,
  payload: UpdateCampTierPayload
): Promise<{ data: CampTier; message: string }> => {
  if (!campId || !tierId) {
    throw new Error("Camp ID and Tier ID are required.");
  }

  try {
    const res = await api.patch(`/camps/${campId}/tiers/${tierId}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteCampTier = async (
  campId: string,
  tierId: string
): Promise<{ message: string }> => {
  if (!campId || !tierId) {
    throw new Error("Camp ID and Tier ID are required.");
  }

  try {
    const res = await api.delete(`/camps/${campId}/tiers/${tierId}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

// ===================== CAMP GALLERY IMAGES =====================

export const uploadCampImages = async (
  campId: string,
  files: File[],
  captions?: string[]
): Promise<{ data: CampImage[]; message: string }> => {
  if (!campId) {
    throw new Error("Camp ID is required.");
  }

  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    if (captions && captions.length > 0) {
      formData.append("captions", JSON.stringify(captions));
    }

    const res = await api.post(`/camps/${campId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const replaceCampImage = async (
  campId: string,
  imageId: string,
  payload: { caption?: string; order?: number }
): Promise<{ data: CampImage; message: string }> => {
  if (!campId || !imageId) {
    throw new Error("Camp ID and Image ID are required.");
  }

  try {
    const res = await api.patch(`/camps/${campId}/images/${imageId}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateCampImageMetadata = async (
  campId: string,
  imageId: string,
  caption?: string,
  order?: number
): Promise<{ data: CampImage; message: string }> => {
  if (!campId || !imageId) {
    throw new Error("Camp ID and Image ID are required.");
  }

  try {
    const formData = new FormData();
    if (caption !== undefined) {
      formData.append("caption", caption);
    }
    if (order !== undefined) {
      formData.append("order", order.toString());
    }

    const res = await api.patch(
      `/camps/${campId}/images/${imageId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteCampImage = async (
  campId: string,
  imageId: string
): Promise<{ message: string }> => {
  if (!campId || !imageId) {
    throw new Error("Camp ID and Image ID are required.");
  }

  try {
    const res = await api.delete(`/camps/${campId}/images/${imageId}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
