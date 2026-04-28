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

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  timezone: z.string().min(1, "Timezone is required"),
});
type ProfileValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
type PasswordValues = z.infer<typeof passwordSchema>;

const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  programReminders: z.boolean(),
  pushNotifications: z.boolean(),
});
type NotificationsValues = z.infer<typeof notificationsSchema>;

// ─── Constants ───────────────────────────────────────────────────────────────

const TIMEZONES = [
  { label: "Africa/Lagos (WAT)", value: "Africa/Lagos" },
  { label: "UTC", value: "UTC" },
  { label: "America/New_York (EST)", value: "America/New_York" },
  { label: "Europe/London (GMT)", value: "Europe/London" },
  { label: "Asia/Kolkata (IST)", value: "Asia/Kolkata" },
];

// ─── Section 1: Profile Information ─────────────────────────────────────────

function ProfileSection() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      timezone: "Africa/Lagos",
    },
  });

  const onSubmit = (values: ProfileValues) => {
    // TODO: POST /api/user/profile
    console.log(values);
    showSuccessToast("Profile update coming soon");
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        Profile Information
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormFieldComp
            name="firstName"
            control={form.control}
            label="First Name"
            placeholder="Enter first name"
            className="bg-white"
          />
          <FormFieldComp
            name="lastName"
            control={form.control}
            label="Last Name"
            placeholder="Enter last name"
            className="bg-white"
          />
        </div>

        {/* Email */}
        <FormFieldComp
          name="email"
          control={form.control}
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          className="bg-white"
        />

        {/* Phone + Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormFieldComp
            name="phoneNumber"
            control={form.control}
            label="Phone Number"
            placeholder="+234 800 000 0000"
            className="bg-white"
          />
          <Controller
            control={form.control}
            name="timezone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex flex-col">
                  <FieldLabel
                    className="text-[#344054] text-[14px] mb-2"
                    htmlFor="timezone"
                  >
                    Timezone
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="bg-white" id="timezone">
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

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="regular"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Section 2: Change Password ───────────────────────────────────────────────

function ChangePasswordSection() {
  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (values: PasswordValues) => {
    // TODO: POST /api/user/change-password
    console.log(values);
    showSuccessToast("Password update coming soon");
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        Change Password
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFieldComp
          name="currentPassword"
          control={form.control}
          label="Current Password"
          placeholder="Enter current password"
          type="password"
          className="bg-white"
        />
        <FormFieldComp
          name="newPassword"
          control={form.control}
          label="New Password"
          placeholder="Min. 8 characters"
          type="password"
          className="bg-white"
        />
        <FormFieldComp
          name="confirmNewPassword"
          control={form.control}
          label="Confirm New Password"
          placeholder="Repeat new password"
          type="password"
          className="bg-white"
        />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="regular"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Section 3: Notification Preferences ─────────────────────────────────────

const NOTIFICATION_PREFS = [
  {
    name: "emailNotifications" as const,
    label: "Email Notifications",
    description: "Receive email updates about your programs and activities",
  },
  {
    name: "programReminders" as const,
    label: "Program Reminders",
    description: "Receive reminders for upcoming sessions and deadlines",
  },
  {
    name: "pushNotifications" as const,
    label: "Push Notifications",
    description: "Allow browser notifications for important updates",
  },
];

function NotificationsSection() {
  const form = useForm<NotificationsValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      programReminders: false,
      pushNotifications: true,
    },
  });

  const onSubmit = (values: NotificationsValues) => {
    // TODO: POST /api/user/notifications
    console.log(values);
    showSuccessToast("Preferences update coming soon");
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      <header className="text-primary-text font-semibold text-base mb-5">
        Notification Preferences
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {NOTIFICATION_PREFS.map((pref) => (
          <div
            key={pref.name}
            className="flex items-center justify-between gap-4 p-4 bg-white rounded-[8px] border border-[#EAECF0]"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-primary-text">
                {pref.label}
              </span>
              <span className="text-xs text-secondary-text">
                {pref.description}
              </span>
            </div>
            <Controller
              control={form.control}
              name={pref.name}
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
            {form.formState.isSubmitting ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function UserSettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header="Settings"
        subtext="Manage your account settings and preferences"
      />
      <div className="space-y-7">
        <ProfileSection />
        <ChangePasswordSection />
        <NotificationsSection />
      </div>
    </div>
  );
}
