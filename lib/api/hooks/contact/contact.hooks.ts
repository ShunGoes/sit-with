"use client";

import { useMutation } from "@tanstack/react-query";
import { contactFacilitator, contactSupport } from "../../services/contact/contact.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useContactFacilitator = () => {
  return useMutation({
    mutationFn: contactFacilitator,
    onSuccess: (data) => {
      showSuccessToast(data.message || "Message sent to facilitator successfully");
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useContactSupport = () => {
  return useMutation({
    mutationFn: contactSupport,
    onSuccess: (data) => {
      showSuccessToast(data.message || "Message sent to support successfully");
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
