import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPlatformSettings,
  updateGeneralSettings,
  updateFeaturesSettings,
  updateNotificationsSettings,
} from "@/lib/api/services/admin/settings.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";

export const useGetPlatformSettings = () => {
  return useQuery({
    queryKey: ["platform-settings"],
    queryFn: getPlatformSettings,
  });
};

export const useUpdateGeneralSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGeneralSettings,
    onSuccess: (res) => {
      showSuccessToast(res.message || "General settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["platform-settings"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to update general settings");
    },
  });
};

export const useUpdateFeaturesSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeaturesSettings,
    onSuccess: (res) => {
      showSuccessToast(res.message || "Platform features updated successfully");
      queryClient.invalidateQueries({ queryKey: ["platform-settings"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to update platform features");
    },
  });
};

export const useUpdateNotificationsSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNotificationsSettings,
    onSuccess: (res) => {
      showSuccessToast(res.message || "Notification settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["platform-settings"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message || "Failed to update notification settings");
    },
  });
};
