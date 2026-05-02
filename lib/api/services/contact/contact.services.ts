import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface ContactPayload {
  subject: string;
  message: string;
}

export const contactFacilitator = async (data: { programId: string; payload: ContactPayload }) => {
  try {
    const res = await api.post(`/dashboard/programs/${data.programId}/contact-facilitator`, data.payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const contactSupport = async (data: ContactPayload) => {
  try {
    const res = await api.post("/dashboard/support/contact", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
