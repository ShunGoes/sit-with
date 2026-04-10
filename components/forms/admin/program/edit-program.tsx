import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import {
  useCreateProgram,
  useGetProgramById,
  useUpdateProgram,
} from "@/lib/api/hooks/programs/programs.hooks";
import { ProgramFormSchema, ProgramSchema } from "@/schemas/programs-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ProgramForm from "./program-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DEFAULT_VALUES = {
  // price: ""
};

export default function EditProgramForm({ id }: { id: string }) {
  const form = useForm<ProgramFormSchema>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(ProgramSchema),
    mode: "onChange",
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useUpdateProgram();
  const { data: program, isLoading, isError } = useGetProgramById(id);

  const onSubmit = (data: ProgramFormSchema) => {
    const parsedData = {
      ...data,
      price: parseFloat(data.price.replace(/,/g, "")) || 0,
    };

    mutate(
      { id: "", payload: parsedData },
      {
        onSuccess: () => {
          closeModal("loading");
        },
        onError: () => {
          closeModal("loading");
        },
      },
    );
  };

  useEffect(() => {
    if (program) {
    }
  });

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
  }, [isPending]);

  return (
    <FormProvider {...form}>
      {" "}
      <ProgramForm onSubmit={onSubmit} header="Edit Program" />
    </FormProvider>
  );
}
