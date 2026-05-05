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
  type: "PROGRAM" | "CONSULTATION" | "CAMP";
  user: {
    email: string;
    firstName: string;
    lastName: string;
  },
  paystackRef: string
}

export interface CreatePaymentPayload {
itemId: string;
type: "PROGRAM" | "CONSULTATION" | "CAMP";
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

export interface PaymentsResponse {
  data: Payment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

export const getPayments = async (params?: { page?: number; limit?: number }): Promise<PaymentsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    
    const res = await api.get(`/payments?${queryParams.toString()}`);
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

export interface CreatePaymentParams {
  itemId: string;
  type: "PROGRAM" | "MENTORSHIP";
}

export const createPayment = async (
  payload: CreatePaymentPayload
) => {
  try {
    const res = await api.post("/payments/initialize", payload);
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


// ============== Verify paystack payment ======================
interface verifyPaystackPaymentResponse {
    success: true,
    message:string,
    data: {
        status: "SUCCESS" | "PENDING" | "FAILED",
        type: "PROGRAM" | "CAMP" | "CONSULTATION",
        amount: number
    }
}

export const verifyPaystackPayment = async (paymentRef:string): Promise<verifyPaystackPaymentResponse> => {
  try {
    const res = await api.get(`/payments/verify/${paymentRef}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};