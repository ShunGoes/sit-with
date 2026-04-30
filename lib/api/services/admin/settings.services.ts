import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";
import { 
  PlatformSettingsResponse, 
  GeneralSettingsValues, 
  PlatformFeaturesValues, 
  NotificationsIntegrationsValues 
} from "@/schemas/settings-schema";

export const getPlatformSettings = async (): Promise<PlatformSettingsResponse> => {
  try {
    const res = await api.get("/admin/settings");
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateGeneralSettings = async (
  values: GeneralSettingsValues
): Promise<PlatformSettingsResponse> => {
  try {
    const res = await api.patch("/admin/settings/general", values);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateFeaturesSettings = async (
  values: PlatformFeaturesValues
): Promise<PlatformSettingsResponse> => {
  try {
    const res = await api.patch("/admin/settings/features", values);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const updateNotificationsSettings = async (
  values: NotificationsIntegrationsValues
): Promise<PlatformSettingsResponse> => {
  try {
    const res = await api.patch("/admin/settings/notifications", values);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
