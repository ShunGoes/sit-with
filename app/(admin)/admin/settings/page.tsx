"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import FormFieldComp from "@/components/formfield";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccessToast } from "@/lib/toast-helpers";

// ─── Schemas ────────────────────────────────────────────────────────────────

const generalSettingsSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  supportEmail: z.string().email("Invalid email"),
  defaultTimezone: z.string().min(1, "Timezone is required"),
  currency: z.string().min(1, "Currency is required"),
});
type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;

const platformFeaturesSchema = z.object({
  maintenanceMode: z.boolean(),
  allowUserRegistration: z.boolean(),
  requireEmailVerification: z.boolean(),
  autoEnrollment: z.boolean(),
});
type PlatformFeaturesValues = z.infer<typeof platformFeaturesSchema>;

const notificationsIntegrationsSchema = z.object({
  emailNotifications: z.boolean(),
});
type NotificationsIntegrationsValues = z.infer<
  typeof notificationsIntegrationsSchema
>;

// ─── Constants ───────────────────────────────────────────────────────────────

const TIMEZONES = [
  { label: "Africa/Lagos (WAT)", value: "Africa/Lagos" },
  { label: "UTC", value: "UTC" },
  { label: "America/New_York (EST)", value: "America/New_York" },
  { label: "Europe/London (GMT)", value: "Europe/London" },
  { label: "Asia/Kolkata (IST)", value: "Asia/Kolkata" },
];

const CURRENCIES = [
  { label: "Nigeria Naira (₦)", value: "NGN" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "British Pound (£)", value: "GBP" },
  { label: "Euro (€)", value: "EUR" },
];

// ─── Section 1: General Settings ─────────────────────────────────────────────

function GeneralSettingsSection() {
  const form = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      platformName: "Sit-With-PD",
      supportEmail: "support@sitwithpd.com",
      defaultTimezone: "Africa/Lagos",
      currency: "NGN",
    },
  });

  const onSubmit = (values: GeneralSettingsValues) => {
    // TODO: PATCH /api/admin/settings/general
    console.log(values);
    showSuccessToast("General settings update coming soon");
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        General Settings
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Platform Name */}
        <FormFieldComp
          name="platformName"
          control={form.control}
          label="Platform Name"
          placeholder="Sit-With-PD"
          className="bg-white"
        />

        {/* Support Email + Default Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormFieldComp
            name="supportEmail"
            control={form.control}
            label="Support Email"
            placeholder="support@sitwithpd.com"
            type="email"
            className="bg-white"
          />
          <Controller
            control={form.control}
            name="defaultTimezone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex flex-col">
                  <FieldLabel
                    className="text-[#344054] text-[14px] mb-2"
                    htmlFor="defaultTimezone"
                  >
                    Default Timezone
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="bg-white" id="defaultTimezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Currency */}
        <Controller
          control={form.control}
          name="currency"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex flex-col">
                <FieldLabel
                  className="text-[#344054] text-[14px] mb-2"
                  htmlFor="currency"
                >
                  Currency
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white" id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="regular"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Section 2: Platform Features ─────────────────────────────────────────────

const PLATFORM_FEATURES = [
  {
    name: "maintenanceMode" as const,
    label: "Maintenance Mode",
    description:
      "Temporarily disable access to the platform for maintenance",
  },
  {
    name: "allowUserRegistration" as const,
    label: "Allow User Registration",
    description: "Enable new users to register for an account",
  },
  {
    name: "requireEmailVerification" as const,
    label: "Require Email Verification",
    description:
      "Users must verify their email before accessing the platform",
  },
  {
    name: "autoEnrollment" as const,
    label: "Auto-Enrollment",
    description:
      "Automatically enroll users in programs after payment",
  },
];

function PlatformFeaturesSection() {
  const form = useForm<PlatformFeaturesValues>({
    resolver: zodResolver(platformFeaturesSchema),
    defaultValues: {
      maintenanceMode: true,
      allowUserRegistration: true,
      requireEmailVerification: true,
      autoEnrollment: false,
    },
  });

  const onSubmit = (values: PlatformFeaturesValues) => {
    // TODO: PATCH /api/admin/settings/features
    console.log(values);
    showSuccessToast("Platform features update coming soon");
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        Platform Features
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {PLATFORM_FEATURES.map((feat) => (
          <div
            key={feat.name}
            className="flex items-center justify-between gap-4 p-4 bg-white rounded-[8px] border border-[#EAECF0]"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-primary-text">
                {feat.label}
              </span>
              <span className="text-xs text-secondary-text">
                {feat.description}
              </span>
            </div>
            <Controller
              control={form.control}
              name={feat.name}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="regular"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Section 3: Notifications & Integrations ──────────────────────────────────

function NotificationsIntegrationsSection() {
  const form = useForm<NotificationsIntegrationsValues>({
    resolver: zodResolver(notificationsIntegrationsSchema),
    defaultValues: {
      emailNotifications: true,
    },
  });

  const onSubmit = (values: NotificationsIntegrationsValues) => {
    // TODO: PATCH /api/admin/settings/notifications
    console.log(values);
    showSuccessToast("Notifications settings update coming soon");
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        Notifications &amp; Integrations
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-[8px] border border-[#EAECF0]">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-primary-text">
              Email Notifications
            </span>
            <span className="text-xs text-secondary-text">
              Send email notifications to users
            </span>
          </div>
          <Controller
            control={form.control}
            name="emailNotifications"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="regular"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeaderText
        header="Settings"
        subtext="Manage your account settings and preferences"
      />
      <div className="space-y-7">
        <GeneralSettingsSection />
        <PlatformFeaturesSection />
        <NotificationsIntegrationsSection />
      </div>
    </div>
  );
}
