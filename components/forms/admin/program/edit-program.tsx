import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  useGetProgramById,
  useUpdateProgram,
} from "@/lib/api/hooks/programs/programs.hooks";
import { ProgramFormSchema, ProgramSchema } from "@/schemas/programs-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ProgramForm from "./program-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DEFAULT_VALUES = {};

export default function EditProgramForm({ id }: { id: string }) {
  const form = useForm<ProgramFormSchema>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(ProgramSchema),
    mode: "onChange",
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useUpdateProgram();
  const { data: program } = useGetProgramById(id);

  const onSubmit = (data: ProgramFormSchema) => {
    const parsedData = {
      ...data,
      price: parseFloat(data.price.replace(/,/g, "")) || 0,
    };

    mutate(
      { id, payload: parsedData },
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
      // Map API response (Program) to Form Schema (ProgramFormSchema)
      const mappedData: ProgramFormSchema = {
        title: program.data.programName,
        description: program.data.description,
        price: program.data.amount,
        programType: program.data.programType as any,
        duration: program.data.programDuration,
        thumbnail: (program.data as any).thumbnail || "",
      };
      form.reset(mappedData);
    }
  }, [program, form]);

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
    <FormProvider {...form}>
      {" "}
      <ProgramForm onSubmit={onSubmit} header="Edit Program" />
    </FormProvider>
  );
}
