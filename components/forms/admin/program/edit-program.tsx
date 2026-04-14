"use client"

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
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { usePathname } from "next/navigation";

const DEFAULT_VALUES = {};

 function EditProgramForm({id}: {id: string}) {

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
      learningObjectives: data.learningObjectives?.map((obj) => obj.text) || [],
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
        hoursPerWeek: (program.data as any).hoursPerWeek || "",
        thumbnail: (program.data as any).thumbnail || "",
        date: program.data.date,
        facilitatorName: (program.data as any).facilitatorName || "",
        facilitatorEmail: (program.data as any).facilitatorEmail || "",
        weeks: (program.data as any).weeks || [],
        learningObjectives: ((program.data as any).learningObjectives || []).map((text: string) => ({ text })),
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
     <div className="space-y-12">
          <DashboardHeaderText
            header="Edit Program "
            subtext="Edit existing program for your platform"
          />
    <FormProvider {...form}>
      {" "}
      <ProgramForm onSubmit={onSubmit} />
    </FormProvider>
    </div>
  );
}

export default function EditProgramFormClient ({id}: {id: string}){
  return (
    <EditProgramForm id={id}/>
  )

}