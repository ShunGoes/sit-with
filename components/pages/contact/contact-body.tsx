"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { useSubmitContactForm } from "@/lib/api/hooks/contact/contact.hooks";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Shared input className matching FormFieldComp pattern
const inputClassName =
  "border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-primary-text placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-11 focus-visible:border-none focus-visible:ring-0";

export function ContactBody() {
  const supportEmail = usePlatformSettingsStore(
    (state) => state.settings?.supportEmail ?? "support@sitwithpd.com",
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { mutateAsync: submitContact } = useSubmitContactForm();

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContact({
        fullName: data.firstName,
        email: data.email,
        phone: data.phone || "",
        message: data.message,
      });
      reset();
    } catch (error) {
      // Error is handled in the hook via toast
    }
  };

  return (
    <section className="w-[90%] max-w-7xl mx-auto py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-5xl mx-auto">
        {/* Left Column: Image + Contact Info */}
        <div className="w-full lg:flex-1 flex flex-col overflow-hidden  rounded-l-[20px]">
          {/* Contact Image */}
          <div className="relative w-full aspect-4/3   overflow-hidden">
            <Image
              src="/images/contact-image.png"
              alt="Contact us - therapy session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-4 bg-[#E9EDF0] py-8 px-4">
            {/* Email Card */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#EAECF0] bg-white hover:border-regular-button/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-regular-button" />
              </div>
              <div>
                <h4 className="font-semibold text-[#111827] text-sm">Email</h4>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-sm text-[#475467] hover:text-regular-button transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#EAECF0] bg-white hover:border-regular-button/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-regular-button" />
              </div>
              <div>
                <h4 className="font-semibold text-[#111827] text-sm">Phone</h4>
                <p className="text-sm text-[#475467]">+447359307733</p>
                <p className="text-sm text-[#475467]">+234201 453 6932</p>
              </div>
            </div>

            {/* Office Card */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#EAECF0] bg-white hover:border-regular-button/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-regular-button" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#111827] text-sm">Office</h4>
                <div>
                  <p className="text-sm text-[#475467] leading-relaxed">
                    International Headquarters; Gardenia Tropicana Lane Urmston,
                    Manchester United Kingdom.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#475467] leading-relaxed">
                    African Headquarters; Gardenia Tropicana Camps Victoria
                    Island, Lagos Nigeria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="w-full lg:flex-1">
          <div className="mb-8">
            <h2 className="text-[1.75rem] lg:text-[2rem] font-semibold text-[#101828] leading-tight">
              Get in touch
            </h2>
            <p className="text-[#475467] mt-2 text-base">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* First Name */}
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-secondary-text dark:font-medium text-[14px] mb-2"
                    htmlFor="contact-first-name"
                  >
                    Full Name
                  </FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] z-10" />
                    <Input
                      id="contact-first-name"
                      type="text"
                      placeholder="First name"
                      {...field}
                      className={`pl-10 ${inputClassName}`}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-secondary-text dark:font-medium text-[14px] mb-2"
                    htmlFor="contact-email"
                  >
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] z-10" />
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      {...field}
                      className={`pl-10 ${inputClassName}`}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone Number */}
            <Controller
              control={control}
              name="phone"
              rules={{
                validate: (value) =>
                  !value ||
                  isValidPhoneNumber(value) ||
                  "Please enter a valid phone number",
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-secondary-text dark:font-medium text-[14px] mb-2"
                    htmlFor="contact-phone"
                  >
                    Phone number
                  </FieldLabel>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="GB"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(val) => onChange(val ?? "")}
                    className="contact-phone-input"
                    numberInputProps={{
                      className: `${inputClassName} pl-2`,
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Message */}
            <Controller
              control={control}
              name="message"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-secondary-text dark:font-medium text-[14px] mb-2"
                    htmlFor="contact-message"
                  >
                    Message
                  </FieldLabel>
                  <textarea
                    id="contact-message"
                    placeholder="Leave us a message..."
                    rows={5}
                    {...field}
                    className={`border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-primary-text placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 px-3 min-h-[140px] outline-none resize-none focus-visible:border-none focus-visible:ring-0`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant={"regular"}
              disabled={isSubmitting}
              className="w-full h-12 rounded-lg text-base font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
