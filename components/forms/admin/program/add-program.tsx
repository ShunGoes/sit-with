import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useCreateProgram } from "@/lib/api/hooks/programs/programs.hooks";
import { ProgramFormSchema, ProgramSchema } from "@/schemas/programs-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ProgramForm from "./program-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";

const DEFAULT_VALUES = {
  weeks: [] as any[],
  learningObjectives: [] as { text: string }[],
};

export default function AddProgramForm() {
  const form = useForm<ProgramFormSchema>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(ProgramSchema),
    mode: "onChange",
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useCreateProgram();

  const onSubmit: SubmitHandler<ProgramFormSchema> = (data) => {
    const parsedData = {
      ...data,
      price: parseFloat(data.price.replace(/,/g, "")) || 0,
      learningObjectives: data.learningObjectives?.map((obj) => obj.text) || [],
    };

    mutate(parsedData, {
      onSuccess: () => {
        closeModal("loading");
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
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  return (
    <div className="space-y-12">
      <DashboardHeaderText
        header="Create New Program "
        subtext="Set up a new learning program for your platform"
      />
      <FormProvider {...form}>
        {" "}
        <ProgramForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
  );
}
