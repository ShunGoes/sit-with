"use client";

import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateConsultationService } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import {
  ConsultationServiceSchema,
  ConsultationServiceFormValues,
} from "@/schemas/consultation-service-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ConsultationServiceForm from "./consultation-service-form";

export default function AddConsultationServiceModal() {
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

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useCreateConsultationService();

  const onSubmit: SubmitHandler<ConsultationServiceFormValues> = (data) => {
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
          form.reset();
        },
        onError: () => {
          closeModal("loading");
        },
      }
    );
  };

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    }
  }, [isPending, openModal]);

  return (
    <div className="bg-transparent rounded-[12px] w-full overflow-y-auto no-scrollbar  mx-auto">
      <h2 className="text-2xl font-semibold mb-1 dark:text-secondary-text text-primary-text">
        Add Consultation Service
      </h2>
      <p className="text-primary-text text-sm mb-6">
        Set up a new consultation service for your platform.
      </p>

      <FormProvider {...form}>
        <ConsultationServiceForm
          onSubmit={onSubmit}
          onCancel={() => closeModal("add-consultation-service")}
          isLoading={isPending}
        />
      </FormProvider>
    </div>
  );
}
