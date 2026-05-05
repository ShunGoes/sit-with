"use client";

import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateCampTier } from "@/lib/api/hooks/camps/camps.hooks";
import { CampTierFormSchema, campTierSchema } from "@/schemas/camp-tier-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import CampTierForm from "./camp-tier-form";
import { CampTier } from "@/types/camps.types";

export default function EditCampTierModal({
  campId,
  tier,
}: {
  campId: string;
  tier: CampTier;
}) {
  const form = useForm<CampTierFormSchema>({
    resolver: zodResolver(campTierSchema),
    mode: "onChange",
    defaultValues: {
      label: tier.label,
      description: tier.description,
      price: String(tier.price),
      inclusions: tier.inclusions.map((inclusion) => ({ text: inclusion })),
      seatsPerUnit: tier.seatsPerUnit,
      maxUnits: tier.maxUnits,
      order: tier.order,
      isFeatured: tier.isFeatured,
    },
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useUpdateCampTier();

  const onSubmit: SubmitHandler<CampTierFormSchema> = (data) => {
    const { price, inclusions, ...rest } = data;
    const payload = {
      ...rest,
      inclusions: inclusions.map((i) => i.text),
      price: Number(price.replace(/,/g, "")),
    };

    mutate(
      { campId, tierId: tier.id, payload },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal(`edit-camp-tier-${tier.id}`);
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
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    }
  }, [isPending, openModal]);

  return (
    <div className="bg-white dark:bg-transparent rounded-[12px] md:w-full overflow-y-auto no-scrollbar mx-auto">
      <h2 className="text-2xl font-semibold mb-1 dark:text-secondary-text text-primary-text">Edit Tier</h2>
      <p className="text-[#667085] dark:text-primary-text text-sm mb-6">
        Update details for {tier.label}.
      </p>

      <FormProvider {...form}>
        <CampTierForm
          onSubmit={onSubmit}
          onCancel={() => closeModal(`edit-camp-tier-${tier.id}`)}
        />
      </FormProvider>
    </div>
  );
}
