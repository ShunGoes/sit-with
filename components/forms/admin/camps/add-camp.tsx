import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateCamp } from "@/lib/api/hooks/camps/camps.hooks";
import { CampFormSchema, CampSchema } from "@/schemas/camps-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import CampForm from "./camp-form";

export default function AddCampModal() {
  const form = useForm<CampFormSchema>({
    resolver: zodResolver(CampSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      capacity: "1",
      startDate: "",
      endDate: "",
    },
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useCreateCamp();

  const onSubmit: SubmitHandler<CampFormSchema> = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);

    const priceStr = data.price.toString();
    const cleanPrice = priceStr.replace(/,/g, "");
    formData.append("price", cleanPrice);

    formData.append("capacity", data.capacity);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    if (data.thumbnail && data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    mutate(formData, {
      onSuccess: () => {
        closeModal("loading");
        closeModal("add-camp");
        form.reset();
      },
      onError: () => {
        closeModal("loading");
      },
    });
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
    <div className="bg-transparent rounded-[12px]  md:w-full  overflow-y-auto no-scrollbar mx-auto">
      <h2 className="text-2xl font-semibold mb-1 dark:text-secondary-text text-primary-text">
        Add Camp
      </h2>
      <p className="text-primary-text text-sm mb-6">
        Set up a new camp for your platform.
      </p>

      <FormProvider {...form}>
        <CampForm onSubmit={onSubmit} onCancel={() => closeModal("add-camp")} />
      </FormProvider>
    </div>
  );
}
