"use client";

import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateConsultationService } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import {
  ConsultationServiceSchema,
  ConsultationServiceFormValues,
} from "@/schemas/consultation-service-schema";
import { ConsultationService } from "@/lib/api/services/consultations/consultation-services.services";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ConsultationServiceForm from "./consultation-service-form";

interface EditConsultationServiceModalProps {
  service: ConsultationService;
}

export default function EditConsultationServiceModal({
  service,
}: EditConsultationServiceModalProps) {
  const form = useForm<ConsultationServiceFormValues>({
    resolver: zodResolver(ConsultationServiceSchema),
    mode: "onChange",
    defaultValues: {
      title: service.title ?? "",
      description: service.description ?? "",
      price: service.price?.toString() ?? "",
      duration: service.duration?.toString() ?? "",
      calBookingUrl: service.calBookingUrl ?? "",
    },
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useUpdateConsultationService();

  const onSubmit: SubmitHandler<ConsultationServiceFormValues> = (data) => {
    mutate(
      {
        id: service.id,
        payload: {
          title: data.title,
          description: data.description,
          price: Number(data.price),
          duration: Number(data.duration),
          calBookingUrl: data.calBookingUrl,
        },
      },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal(`edit-consultation-service-${service.id}`);
        },
        onError: () => {
          closeModal("loading");
        },
      },
    );
  };

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  return (
    <div className="bg-transparent rounded-[12px] md:w-full overflow-y-auto no-scrollbar mx-auto">
      <h2 className="text-2xl font-semibold mb-1 dark:text-secondary-text text-primary-text">
        Edit Consultation Service
      </h2>
      <p className="text-[#667085] dark:text-primary-text text-sm mb-6">
        Update the details for this consultation service.
      </p>

      <FormProvider {...form}>
        <ConsultationServiceForm
          onSubmit={onSubmit}
          onCancel={() => closeModal(`edit-consultation-service-${service.id}`)}
          isLoading={isPending}
        />
      </FormProvider>
    </div>
  );
}
