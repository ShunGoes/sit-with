import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
  CreatePaymentPayload,
  UpdatePaymentPayload,
  verifyPaystackPayment,
} from "../../services/payments/payments.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useGetPayments = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => getPayments(params),
    retry: false,
  });
};

export const useGetPayment = (paymentId: string) => {
  return useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => getPayment(paymentId),
    enabled: Boolean(paymentId),
    retry: false,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePaymentPayload }) =>
      updatePayment(id, payload),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePayment,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};


//  ================== VERIFY PAYSTACK PAYMENT ===================
export const useVerifyPaystackPayment = (reference: string) => {

  return useQuery({
    queryKey: ["paystack-payment"],
    queryFn: () => verifyPaystackPayment(reference),
     enabled: Boolean(reference),
    retry: false,
  })
}