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

export type UpdateConsultationPayload = Partial<CreateConsultationPayload>;

export interface BookConsultationPayload {
  serviceId: string | number;
  userId: string | number;
}

export interface ConsultationsResponse {
  data: Consultation[];
  message: string;
}

export interface ConsultationResponse {
  data: Consultation;
  message: string;
}

type BookingApiResponse = {
  data: {
    id: string
    status: string
    user: {
      firstName: string
      lastName: string
      email: string
    }
    service: {
      title: string
      price: number
      createdAt: string
    }
  }[]
}

export const getConsultations = async (): Promise<BookingApiResponse> => {
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

export const bookConsultation = async (
  payload: BookConsultationPayload
): Promise<{ message: string }> => {
  try {
    const res = await api.post("/consultations/book", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
