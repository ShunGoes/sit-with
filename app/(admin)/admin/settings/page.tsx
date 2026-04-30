"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  generalSettingsSchema,
  GeneralSettingsValues,
  platformFeaturesSchema,
  PlatformFeaturesValues,
  notificationsIntegrationsSchema,
  NotificationsIntegrationsValues,
} from "@/schemas/settings-schema";
import {
  useGetPlatformSettings,
  useUpdateGeneralSettings,
  useUpdateFeaturesSettings,
  useUpdateNotificationsSettings,
} from "@/lib/api/hooks/admin/settings.hooks";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";

// ─── Constants ───────────────────────────────────────────────────────────────

const TIMEZONES = [
  { label: "Africa/Lagos", value: "Africa/Lagos" },
  { label: "UTC", value: "UTC" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Asia/Kolkata", value: "Asia/Kolkata" },
];

const CURRENCIES = [
  { label: "Nigeria Naira (₦)", value: "NGN" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "British Pound (£)", value: "GBP" },
  { label: "Euro (€)", value: "EUR" },
];

const PLATFORM_FEATURES = [
  {
    name: "maintenanceMode" as const,
    label: "Maintenance Mode",
    description: "Temporarily disable access to the platform for maintenance",
  },
  {
    name: "allowUserRegistration" as const,
    label: "Allow User Registration",
    description: "Enable new users to register for an account",
  },
  {
    name: "requireEmailVerification" as const,
    label: "Require Email Verification",
    description: "Users must verify their email before accessing the platform",
  },
  {
    name: "autoEnrollment" as const,
    label: "Auto-Enrollment",
    description: "Automatically enroll users in programs after payment",
  },
];

// ─── Section 1: General Settings ─────────────────────────────────────────────

function GeneralSettingsSection({ initialData }: { initialData?: any }) {
  const form = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      platformName: initialData?.platformName || "",
      supportEmail: initialData?.supportEmail || "",
      defaultTimezone: initialData?.defaultTimezone || "Africa/Lagos",
      currency: initialData?.currency || "NGN",
    },
  });

  const { mutate, isPending } = useUpdateGeneralSettings();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (initialData) {
      form.reset({
        platformName: initialData.platformName,
        supportEmail: initialData.supportEmail,
        defaultTimezone: initialData.defaultTimezone,
        currency: initialData.currency,
      });
    }
  }, [initialData, form]);

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    } else {
      closeModal("loading");
    }
  }, [isPending, openModal, closeModal]);

  const onSubmit = (values: GeneralSettingsValues) => {
    mutate(values);
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        General Settings
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFieldComp
          name="platformName"
          control={form.control}
          label="Platform Name"
          placeholder="Sit With PD"
          className="bg-white"
        />

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
                  <Select value={field.value} onValueChange={field.onChange}>
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
          <Button type="submit" variant="regular" disabled={isPending}>
            {isPending ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Section 2: Platform Features ─────────────────────────────────────────────

function PlatformFeaturesSection({ initialData }: { initialData?: any }) {
  const form = useForm<PlatformFeaturesValues>({
    resolver: zodResolver(platformFeaturesSchema),
    defaultValues: {
      maintenanceMode: initialData?.maintenanceMode ?? false,
      allowUserRegistration: initialData?.allowUserRegistration ?? true,
      requireEmailVerification: initialData?.requireEmailVerification ?? true,
      autoEnrollment: initialData?.autoEnrollment ?? false,
    },
  });

  const { mutate, isPending } = useUpdateFeaturesSettings();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (initialData) {
      form.reset({
        maintenanceMode: initialData.maintenanceMode,
        allowUserRegistration: initialData.allowUserRegistration,
        requireEmailVerification: initialData.requireEmailVerification,
        autoEnrollment: initialData.autoEnrollment,
      });
    }
  }, [initialData, form]);

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    } else {
      closeModal("loading");
    }
  }, [isPending, openModal, closeModal]);

  const onSubmit = (values: PlatformFeaturesValues) => {
    mutate(values);
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
          <Button type="submit" variant="regular" disabled={isPending}>
            {isPending ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Section 3: Notifications & Integrations ──────────────────────────────────

function NotificationsIntegrationsSection({ initialData }: { initialData?: any }) {
  const form = useForm<NotificationsIntegrationsValues>({
    resolver: zodResolver(notificationsIntegrationsSchema),
    defaultValues: {
      emailNotificationsEnabled: initialData?.emailNotificationsEnabled ?? true,
    },
  });

  const { mutate, isPending } = useUpdateNotificationsSettings();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (initialData) {
      form.reset({
        emailNotificationsEnabled: initialData.emailNotificationsEnabled,
      });
    }
  }, [initialData, form]);

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    } else {
      closeModal("loading");
    }
  }, [isPending, openModal, closeModal]);

  const onSubmit = (values: NotificationsIntegrationsValues) => {
    mutate(values);
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
            name="emailNotificationsEnabled"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="regular" disabled={isPending}>
            {isPending ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const { data: platformData, isLoading } = useGetPlatformSettings();
  const settings = platformData?.data;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center w-full">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeaderText
        header="Settings"
        subtext="Manage your platform settings and preferences"
      />
      <div className="space-y-7">
        <GeneralSettingsSection initialData={settings} />
        <PlatformFeaturesSection initialData={settings} />
        <NotificationsIntegrationsSection initialData={settings} />
      </div>
    </div>
  );
}
