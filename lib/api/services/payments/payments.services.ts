import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  email: string;
  reference: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: string;
}

export interface CreatePaymentPayload {
  amount: number;
  currency: string;
  paymentMethod: string;
  email: string;
  reference?: string;
  description?: string;
}

export interface UpdatePaymentPayload extends Partial<CreatePaymentPayload> {
  status?: "pending" | "completed" | "failed" | "refunded";
}

export interface PaymentsResponse {
  data: Payment[];
  message: string;
}

export interface PaymentResponse {
  data: Payment;
  message: string;
}

export const getPayments = async (): Promise<PaymentsResponse> => {
  try {
    const res = await api.get("/payments");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const getPayment = async (id: string): Promise<PaymentResponse> => {
  if (!id) {
    throw new Error("Payment ID is required.");
  }

  try {
    const res = await api.get(`/payments/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const createPayment = async (
  payload: CreatePaymentPayload
): Promise<PaymentResponse> => {
  try {
    const res = await api.post("/payments", payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const updatePayment = async (
  id: string,
  payload: UpdatePaymentPayload
): Promise<PaymentResponse> => {
  if (!id) {
    throw new Error("Payment ID is required for updates.");
  }

  try {
    const res = await api.patch(`/payments/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const deletePayment = async (id: string): Promise<{ message: string }> => {
  if (!id) {
    throw new Error("Payment ID is required for deletion.");
  }

  try {
    const res = await api.delete(`/payments/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
