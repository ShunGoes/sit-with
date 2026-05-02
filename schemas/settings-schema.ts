import * as z from "zod";

export const generalSettingsSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  supportEmail: z.string().email("Invalid email"),
  defaultTimezone: z.string().min(1, "Timezone is required"),
  currency: z.string().min(1, "Currency is required"),
});

export type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;

export const platformFeaturesSchema = z.object({
  maintenanceMode: z.boolean(),
  allowUserRegistration: z.boolean(),
  requireEmailVerification: z.boolean(),
  autoEnrollment: z.boolean(),
});

export type PlatformFeaturesValues = z.infer<typeof platformFeaturesSchema>;

export const notificationsIntegrationsSchema = z.object({
  emailNotificationsEnabled: z.boolean(),
});

export type NotificationsIntegrationsValues = z.infer<
  typeof notificationsIntegrationsSchema
>;

export interface PlatformSettings {
  id: string;
  platformName: string;
  supportEmail: string;
  defaultTimezone: string;
  currency: string;
  maintenanceMode: boolean;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  autoEnrollment: boolean;
  emailNotificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformSettingsResponse {
  success: boolean;
  message: string;
  data: PlatformSettings;
}
