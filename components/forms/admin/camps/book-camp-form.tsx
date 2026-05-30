import FormFieldComp from "@/components/formfield";
import { useModalStore } from "@/components/store/use-modal-store";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookACamp } from "@/lib/api/hooks/camps/camps.hooks";
import { showErrorToast } from "@/lib/toast-helpers";
import {
  CampBookingFormSchema,
  CampBookingFormSchemaTpe,
} from "@/schemas/camps-schema";
import { useAuthStore } from "@/store/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle,
  PlusCircle,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import LearningObjectivesField from "../program/learning-objectives-field";
import { useCreatePayment } from "@/lib/api/hooks/payments/payments.hooks";
import { getMyCampRegistration } from "@/lib/api/services/camps/camps.services";

// Modal shown when user has a pending application and needs to complete payment
function PendingRegistrationModal({
  campId,
  message,
}: {
  campId: string;
  message: string;
}) {
  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
  const closeModal = useModalStore((state) => state.closeModal);
  const [isFetchingRegistration, setIsFetchingRegistration] = useState(false);

  const handleContinueToPayment = async () => {
    setIsFetchingRegistration(true);
    try {
      const registration = await getMyCampRegistration(campId);
      const registrationId = registration.data.id;

      const paymentTab = window.open("", "_blank");

      createPayment(
        {
          type: "CAMP" as const,
          itemId: registrationId,
          provider: "FLUTTERWAVE",
        },
        {
          onSuccess: (paymentData: any) => {
            if (paymentTab) {
              paymentTab.location.href = paymentData?.data?.authorizationUrl;
            }
            closeModal("pending-registration");
          },
          onError: () => {
            paymentTab?.close();
          },
        },
      );
    } catch {
      showErrorToast("Failed to fetch registration details.");
    } finally {
      setIsFetchingRegistration(false);
    }
  };

  const isProcessing = isFetchingRegistration || isCreatingPayment;

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-4 rounded-lg min-w-50">
      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-amber-600" />
      </div>
      <h2 className="text-primary-text text-base font-medium text-center max-w-md leading-relaxed">
        {message}
      </h2>
      <div className="flex gap-3 mt-2">
        <Button
          onClick={() => closeModal("pending-registration")}
          variant="outline"
          disabled={isProcessing}
          className="border border-regular-button text-regular-button"
        >
          Close
        </Button>
        <Button
          onClick={handleContinueToPayment}
          variant="regular"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processing…
            </>
          ) : (
            "Continue to Payment"
          )}
        </Button>
      </div>
    </div>
  );
}

export default function BookCampForm({
  tierId,
  campId,
  tierLabel,
  maxPartyMembers,
}: {
  tierId: string | undefined | null;
  campId: string;
  tierLabel: string | undefined | null;
  maxPartyMembers: number;
}) {
  const { mutate: bookACamp, isPending } = useBookACamp();
  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const form = useForm<CampBookingFormSchemaTpe>({
    resolver: zodResolver(CampBookingFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyStatus: "",
      dietaryRestrictions: "",
      accommodationPreference: "",
      notes: "",
      partyMembers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "partyMembers",
  });

  //   sumbit the foem
  const onSubmit = (data: CampBookingFormSchemaTpe) => {
    if (!tierId) {
      showErrorToast("Choose a participation tier");
      return;
    }
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/camps/${campId}#booking-form`);
      return;
    }

    const payload = {
      tierId,
      applicantDetails: {
        fullName: data.fullName,
        phone: data.phone,
        emergencyContact: {
          name: data.emergencyName,
          phone: data.emergencyPhone,
          relationship: data.emergencyStatus,
        },
        dietaryRestrictions: data.dietaryRestrictions,
        accommodationPreference: data.accommodationPreference,
        notes: data.notes,
        partyMembers:
          data.partyMembers?.map((member: { text: string }) => member.text) ||
          [],
      },
    };

    const paymentTab = window.open("", "_blank");

    bookACamp(
      { campId, payload },
      {
        onSuccess: (data) => {
          closeModal("loading");
          const bookingResponseId = data?.data?.id;
          // after booking , send a request with the returned camp id

          if (!bookingResponseId) {
            closeModal("loading");
            showErrorToast(
              "Could not retrieve registration ID. Please try again.",
            );
            return;
          }

          const paymentPayload = {
            type: "CAMP" as "CAMP" | "PROGRAM" | "CONSULTATION",
            itemId: bookingResponseId,
            provider: "FLUTTERWAVE",
          };

          createPayment(paymentPayload, {
            onSuccess: (paymentData) => {
              if (paymentTab) {
                paymentTab.location.href = paymentData?.data?.authorizationUrl;
              }

              closeModal("loading");
            },
            onError: () => {
              closeModal("loading");
              paymentTab?.close();
            },
          });
        },
        onError: (error: any) => {
          closeModal("loading");
          paymentTab?.close();

          // Detect pending application error and show recovery modal
          const isPendingApplication = error?.message
            ?.toLowerCase()
            ?.includes("pending application");
          if (isPendingApplication) {
            closeModal("book-camp");
            openModal(
              "pending-registration",
              <PendingRegistrationModal
                campId={campId}
                message={error.message}
              />,
            );
          }
        },
      },
    );
  };

  const sectionTitleText = "mb-5 text-brand-green text-base font-medium";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="booking-form"
      className="space-y-7 "
    >
      {/* basic information */}
      <div className="bg-dash-secondary-bg px-5 pt-5 pb-10 rounded-[12px]">
        <header>
          <h3 className="text-primary-text text-xl text-center font-medium mb-10">{`${tierLabel} Camp Registration`}</h3>
        </header>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-7">
            <FormFieldComp
              name="fullName"
              control={form.control}
              label="Full Name*"
              placeholder="John Doe"
              className="bg-white"
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="text-secondary-text dark:font-medium text-[14px] mb-2">
                    Phone Number *
                  </FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                    placeholder="08012345678"
                    className="bg-white border-[0.75px] placeholder:text-[12px] text-[12px] border-[#EAECF0] h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="">
            <h3 className={sectionTitleText}>Emergency Contact</h3>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 ">
              <FormFieldComp
                name="emergencyName"
                control={form.control}
                label="Emergency Contact Name *"
                placeholder="Farell Williams"
                className="bg-white"
              />

              <Controller
                control={form.control}
                name="emergencyPhone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-secondary-text dark:font-medium text-[14px] mb-2">
                      Emergency Contact Phone *
                    </FieldLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                      placeholder="+1234567890"
                      className="bg-white border-[0.75px] placeholder:text-[12px] text-[12px] border-[#EAECF0] h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <FormFieldComp
                name="emergencyStatus"
                control={form.control}
                label="Emergency Contact RelationShip *"
                placeholder="Brother"
                className="bg-white"
              />
            </div>
          </div>
        </div>

        {/* party members  */}
        {maxPartyMembers > 1 && (
          <div className="space-y-2 my-8">
            <div className="flex items-center justify-between">
              <h3 className={sectionTitleText}>Party Members</h3>
              {fields.length < maxPartyMembers - 1 && (
                <button
                  type="button"
                  onClick={() => append({ text: "" })}
                  className="flex items-center gap-2 text-brand-green font-medium text-sm"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Member
                </button>
              )}
            </div>

            {fields.length > 0 ? (
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-end">
                    <Controller
                      control={form.control}
                      name={`partyMembers.${index}.text`}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="flex-1"
                        >
                          <FieldLabel className="text-[#344054] text-[14px] mb-2">
                            Member {index + 1} Name
                          </FieldLabel>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            type="text"
                            placeholder="E.g. John Doe"
                            className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-3 text-brand-red border border-[#EAECF0] rounded-[5px] h-[54px] flex items-center justify-center bg-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Are you going with someone? Add their names here.
              </p>
            )}
          </div>
        )}

        <div>
          <h3 className={sectionTitleText}>
            Dietary Restrictions & Accomodations
          </h3>
          <div className="flex flex-col gap-5">
            <FormFieldComp
              name="dietaryRestrictions"
              control={form.control}
              label="Dietary Restrictione "
              placeholder="State if you have any"
              className="bg-white"
            />
            <FormFieldComp
              name="accommodationPreference"
              control={form.control}
              label="Accomodatio Prereference"
              placeholder="Ground Floor"
              className="bg-white"
            />
          </div>
        </div>
        <Controller
          control={form.control}
          name="notes"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-4">
              <div className="flex flex-col">
                <FieldLabel
                  className="text-[#344054] text-[14px] mb-2"
                  htmlFor="description"
                >
                  Description
                </FieldLabel>
                <textarea
                  id="description"
                  {...field}
                  placeholder="Additonal notes"
                  className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] py-4 min-h-30 outline-none px-3 resize-none"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex items-center justify-end w-full mt-10 gap-3">
        <Button
          onClick={() => closeModal("book-camp")}
          variant={"outline"}
          type="button"
          className="text-regular-button border-regular-button"
        >
          Cancel
        </Button>
        <Button
          variant={"regular"}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Secure Slot"}
        </Button>
      </div>
    </form>
  );
}
