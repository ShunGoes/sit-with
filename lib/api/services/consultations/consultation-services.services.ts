import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ConsultationService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // minutes
  calEventTypeId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateConsultationServicePayload {
  title: string;
  description: string;
  price: number;
  duration: number;
}

export interface UpdateConsultationServicePayload {
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  isActive?: boolean;
}

export interface UpdateConsultationStatusPayload {
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
  confirmedDate?: string;
}

export interface ConsultationServicesResponse {
  message: string;
  data: ConsultationService[];
}

export interface ConsultationServiceResponse {
  message: string;
  data: ConsultationService;
}

// ─── Service Functions ────────────────────────────────────────────────────────

export const getAllConsultationServices = async (): Promise<ConsultationServicesResponse> => {
  try {
    const res = await api.get("/consultations/services");
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getConsultationServiceById = async (
  id: string
): Promise<ConsultationServiceResponse> => {
  if (!id) throw new Error("Service ID is required.");
  try {
    const res = await api.get(`/consultations/services/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const createConsultationService = async (
  payload: CreateConsultationServicePayload
): Promise<ConsultationServiceResponse> => {
  try {
    const res = await api.post("/consultations/services", payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateConsultationService = async (
  id: string,
  payload: UpdateConsultationServicePayload
): Promise<ConsultationServiceResponse> => {
  if (!id) throw new Error("Service ID is required.");
  try {
    const res = await api.patch(`/consultations/services/${id}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateConsultationStatus = async (
  consultationId: string,
  payload: UpdateConsultationStatusPayload
): Promise<{ message: string }> => {
  if (!consultationId) throw new Error("Consultation ID is required.");
  try {
    const res = await api.patch(`/consultations/${consultationId}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
