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
import { CheckCircle, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import LearningObjectivesField from "../program/learning-objectives-field";

export default function BookCampForm({
  tierId,
  campId,
  tierLabel
}: {
  tierId: string | undefined | null;
  campId: string;
  tierLabel: string | undefined | null;
}) {
  const { mutate: bookACamp, isPending } = useBookACamp();
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

  //   function shows a modal on successsful booking
  const handleCampSuccessModal = (data: SuccessBannerProps) => {
    openModal(
      "success",
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
        <CheckCircle className="w-16 h-16 text-regular-button" />
        <h2 className="text-primary-text text-lg font-medium text-center mb-5 max-w-2xl">
          You have successfully booked a {data?.title} camp session.
        </h2>
        <Button onClick={() => closeModal("success")} variant="outline" className="border border-regular-button text-regular-button">
          Close
        </Button>
      </div>,
    );
  };

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
        partyMembers: data.partyMembers.map((member) => member.text),
      },
    };

    bookACamp(
      { campId, payload },
      {
        onSuccess: (data) => {
          closeModal("loading");

          const camp = data?.data?.camp;
          const successBanner = {
            title: camp?.title,
            description: camp?.description,
            location: camp?.location,
            price: camp?.price,
            thumbnail: camp?.thumbnail,
            capacity: camp?.capacity,
            startDate: camp?.startDate,
          };
          handleCampSuccessModal(successBanner);
        },
        onError: () => {
          closeModal("loading");
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
      <div className="bg-dash-secondary-bg px-5 py-10 rounded-[12px]">
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
            <FormFieldComp
              name="phone"
              control={form.control}
              label="Phone Number *"
              placeholder=""
              className="bg-white"
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

              <FormFieldComp
                name="emergencyPhone"
                control={form.control}
                label="Emergency Contact Phone *"
                placeholder="+1234567890"
                className="bg-white"
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
        <div className="space-y-2 my-8">
          <div className="flex items-center justify-between">
            <h3 className={sectionTitleText}>Party Members</h3>
            <button
              type="button"
              onClick={() => append({ text: "" })}
              className="flex items-center gap-2 text-brand-green font-medium text-sm"
            >
              <PlusCircle className="h-4 w-4" />
              Add Member
            </button>
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
        <Button variant={"outline"} type="button">
          Cancel
        </Button>
        <Button
          variant={"regular"}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Save Program"}
        </Button>
      </div>
    </form>
  );
}
