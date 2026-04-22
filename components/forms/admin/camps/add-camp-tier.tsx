"use client";

import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateCampTier } from "@/lib/api/hooks/camps/camps.hooks";
import { CampTierFormSchema, campTierSchema } from "@/schemas/camp-tier-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import CampTierForm from "./camp-tier-form";

export default function AddCampTierModal({ campId }: { campId: string }) {
  const form = useForm<CampTierFormSchema>({
    resolver: zodResolver(campTierSchema),
    mode: "onChange",
    defaultValues: {
      label: "",
      description: "",
      price: "0",
      inclusions: [],
      seatsPerUnit: 1,
      maxUnits: null,
      order: 0,
      isFeatured: false,
    },
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useCreateCampTier();

  const onSubmit: SubmitHandler<CampTierFormSchema> = (data) => {
    const { price, inclusions, ...rest } = data;
    const payload = { ...rest, inclusions: inclusions.map((i) => i.text), price: Number(price.replace(/,/g, "")) };
    mutate(
      { campId, payload },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal(`add-camp-tier-${campId}`);
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
    <div className="bg-white rounded-[12px] md:w-full overflow-y-auto no-scrollbar mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-primary-text">Add Tier</h2>
      <p className="text-[#667085] text-sm mb-6">
        Create a new tier option for this camp.
      </p>

      <FormProvider {...form}>
        <CampTierForm
          onSubmit={onSubmit}
          onCancel={() => closeModal(`add-camp-tier-${campId}`)}
        />
      </FormProvider>
    </div>
  );
}
