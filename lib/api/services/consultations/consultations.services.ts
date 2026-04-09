import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface Consultation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  consultationType: string;
  experience: string;
  message?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface CreateConsultationPayload {
  fullName: string;
  email: string;
  phone: string;
  consultationType: string;
  experience: string;
  message?: string;
}

export interface UpdateConsultationPayload extends Partial<CreateConsultationPayload> {}

export interface ConsultationsResponse {
  data: Consultation[];
  message: string;
}

export interface ConsultationResponse {
  data: Consultation;
  message: string;
}

export const getConsultations = async (): Promise<ConsultationsResponse> => {
  try {
    const res = await api.get("/consultations");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const getConsultation = async (id: string): Promise<ConsultationResponse> => {
  if (!id) {
    throw new Error("Consultation ID is required.");
  }

  try {
    const res = await api.get(`/consultations/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const createConsultation = async (
  payload: CreateConsultationPayload
): Promise<ConsultationResponse> => {
  try {
    const res = await api.post("/consultations", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const updateConsultation = async (
  id: string,
  payload: UpdateConsultationPayload
): Promise<ConsultationResponse> => {
  if (!id) {
    throw new Error("Consultation ID is required for updates.");
  }

  try {
    const res = await api.patch(`/consultations/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const deleteConsultation = async (id: string): Promise<{ message: string }> => {
  if (!id) {
    throw new Error("Consultation ID is required for deletion.");
  }

  try {
    const res = await api.delete(`/consultations/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
