"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  contactFacilitator,
  contactSupport,
  submitContactForm,
  getAdminContactSubmissions,
  GetAdminContactSubmissionsParams,
  deleteContactSubmission,
} from "../../services/contact/contact.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useContactFacilitator = () => {
  return useMutation({
    mutationFn: contactFacilitator,
    onSuccess: (data) => {
      showSuccessToast(
        data.message || "Message sent to facilitator successfully",
      );
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

export const useSubmitContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      showSuccessToast(data.message || "Contact form submitted successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin-contact-submissions"],
      });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to submit contact form");
    },
  });
};

export const ADMIN_CONTACT_SUBMISSIONS_QUERY_KEY = [
  "admin-contact-submissions",
] as const;

export const useGetAdminContactSubmissions = (
  params?: GetAdminContactSubmissionsParams,
) => {
  return useQuery({
    queryKey: ["admin-contact-submissions", params],
    queryFn: () => getAdminContactSubmissions(params),
  });
};

export const useDeleteContactSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContactSubmission,
    onSuccess: (data) => {
      showSuccessToast(data.message || "Submission deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin-contact-submissions"],
      });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to delete submission");
    },
  });
};
