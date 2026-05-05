import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateCamp } from "@/lib/api/hooks/camps/camps.hooks";
import { CampFormSchema, CampSchema } from "@/schemas/camps-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import CampForm from "./camp-form";
import { Camp } from "@/lib/api/services/camps/camps.services";
import { formatAmount } from "@/lib/utils";

export default function EditCampModal({ camp }: { camp: Camp }) {
  const form = useForm<CampFormSchema>({
    resolver: zodResolver(CampSchema),
    mode: "onChange",
    defaultValues: {
      title: camp.title,
      description: camp.description,
      location: camp.location,
      // price: camp?.price ? formatAmount(camp?.price.toString()) : 0,
      capacity: camp.capacity.toString(),
      startDate: camp.startDate
        ? new Date(camp.startDate).toISOString().split("T")[0]
        : "",
      endDate: camp.endDate
        ? new Date(camp.endDate).toISOString().split("T")[0]
        : "",
      thumbnail: camp.thumbnail || undefined,
    },
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useUpdateCamp();

  const onSubmit: SubmitHandler<CampFormSchema> = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);

    // const priceStr = data.price.toString();
    // const cleanPrice = priceStr.replace(/,/g, "");
    // formData.append("price", cleanPrice);

    formData.append("capacity", data.capacity.toString());
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    if (data.thumbnail && data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    mutate(
      { id: camp.id, payload: formData },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal(`edit-camp-${camp.id}`);
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
        <div className="flex flex-col items-center justify-center gap-4 bg-dash-secondary-bg p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  return (
    <div className="bg-transparent rounded-[12px]   md:w-full  overflow-y-auto no-scrollbar mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-secondary-text">
        Edit Camp
      </h2>
      <p className="text-primary-text text-sm mb-6">
        Update details for {camp.title}.
      </p>

      <FormProvider {...form}>
        <CampForm
          onSubmit={onSubmit}
          onCancel={() => closeModal(`edit-camp-${camp.id}`)}
        />
      </FormProvider>
    </div>
  );
}
