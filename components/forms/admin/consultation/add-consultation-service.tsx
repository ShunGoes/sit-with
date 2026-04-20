"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import FormFieldComp from "@/components/formfield";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { useCreateConsultationService } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import {
  ConsultationServiceSchema,
  ConsultationServiceFormValues,
} from "@/schemas/consultation-service-schema";

export default function AddConsultationServiceForm() {
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const { mutate, isPending, isError, error } = useCreateConsultationService();

  const form = useForm<ConsultationServiceFormValues>({
    resolver: zodResolver(ConsultationServiceSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      calBookingUrl: "",
      description: "",
      price: "",
      duration: "",
    },
  });

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    }
  }, [isPending, openModal]);

  const onSubmit = (data: ConsultationServiceFormValues) => {
    mutate(
      {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        duration: Number(data.duration),
        calBookingUrl: data.calBookingUrl,
      },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal("add-consultation-service");
        },
        onError: () => {
          closeModal("loading");
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-[12px] p-6 w-full max-w-lg mx-auto">
      <h2 className="modal-header mb-1">Add Consultation Service</h2>
      <p className="text-secondary-text text-sm mb-6">
        Fill in the details for the new consultation service.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFieldComp
          control={form.control}
          name="title"
          label="Service Title *"
          placeholder="e.g. 1-on-1 Wellness Session"
          className="bg-white"
        />
        <FormFieldComp
          control={form.control}
          name="calBookingUrl"
          label="Booking Link*"
          placeholder="Enter event booking link from Calcom"
          className="bg-white"
        />
        <FormFieldComp
          control={form.control}
          name="description"
          label="Description *"
          placeholder="A brief description of this service"
          className="bg-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormFieldComp
            control={form.control}
            name="price"
            label="Price (₦) *"
            placeholder="e.g. 15000"
            type="number"
            className="bg-white"
          />
          <FormFieldComp
            control={form.control}
            name="duration"
            label="Duration (mins) *"
            placeholder="e.g. 60"
            type="number"
            className="bg-white"
          />
        </div>

        {isError && (
          <p className="text-red-500 text-sm">
            {(error as any)?.message ?? "Something went wrong. Please try again."}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="text-regular-button border border-regular-button "
            onClick={() => closeModal("add-consultation-service")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="regular"
            disabled={!form.formState.isValid || isPending}
          >
            Create Service
          </Button>
        </div>
      </form>
    </div>
  );
}
