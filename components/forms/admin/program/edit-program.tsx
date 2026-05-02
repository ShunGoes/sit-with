"use client";

import { Suspense, useEffect } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { formatAmount, toIsoDateString } from "@/lib/utils";

const DEFAULT_VALUES = {};

function EditProgramForm({ id }: { id: string }) {
  const form = useForm<ProgramFormSchema>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(ProgramSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useUpdateProgram();
  const { data: program } = useGetProgramById(id);

  const onSubmit = (data: ProgramFormSchema) => {
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append(
      "price",
      (parseFloat(data.price.replace(/,/g, "")) || 0).toString(),
    );
    formData.append("hoursPerWeek", data.hoursPerWeek);
    if (data.date) formData.append("startDate", data.date);
    formData.append("category", data.programType);
    if (data.facilitatorName)
      formData.append("facilitatorName", data.facilitatorName);
    if (data.facilitatorEmail)
      formData.append("facilitatorEmail", data.facilitatorEmail);
    if (data.duration) formData.append("durationWeeks", data.duration);

    if (data.learningObjectives && data.learningObjectives.length > 0) {
      const learningOutcomes = data.learningObjectives.map((obj) => obj.text);
      formData.append("learningOutcomes", JSON.stringify(learningOutcomes));
    } else {
      formData.append("learningOutcomes", JSON.stringify([]));
    }

    if (data.weeks && data.weeks.length > 0) {
      const formattedWeeks = data.weeks.map((week) => ({
        title: week.weekTitle,
        description: week.description,
        learningObjectives: week.learningObjectives,
        modules: week.modules.map((mod) => ({
          title: mod.moduleTitle,
          description: mod.description,
          type: mod.type,
          duration: mod.duration,
          contentUrl: mod.contentLink,
          embedCode: mod.embedCode,
        })),
      }));
      formData.append("weeks", JSON.stringify(formattedWeeks));
    } else {
      formData.append("weeks", JSON.stringify([]));
    }

    if (data.thumbnail && typeof data.thumbnail !== "string") {
      formData.append("thumbnail", data.thumbnail);
    } else if (data.thumbnail && typeof data.thumbnail === "string") {
      // Don't append if it's just the URL of the existing thumbnail
      // Or append it if the backend needs it, wait let's just append the string or omit. Let's omit if string to not upload url as file.
    }
// console.log(data)
    mutate(
      { id, payload: formData },
      {
        onSuccess: () => {
          closeModal("loading");
          // router.push("/admin/program");
        },
        onError: () => {
          closeModal("loading");
        },
      },
    );
  };
console.log(program)

  useEffect(() => {
    if (program) {
      // Map API response (Program) to Form Schema (ProgramFormSchema)
      const mappedData: ProgramFormSchema = {
        title: program.data.title || "",
        description: program.data.description || "",
        price: formatAmount(program.data.price?.toString()) || "",
        programType: program.data?.category,
        duration: program.data.durationWeeks?.toString() || 0,
        hoursPerWeek: (program.data as any).hoursPerWeek?.toString() || "",
        thumbnail: (program.data as any).thumbnail || "",
        date: toIsoDateString(new Date(program.data.startDate)) || "",
        facilitatorName: (program.data as any).facilitatorName || "",
        facilitatorEmail: (program.data as any).facilitatorEmail || "",
        weeks: ((program.data as any).weeks || []).map((week: any) => ({
          weekTitle: week.title || "Week Title",
          description: week.description || "",
          learningObjectives: week.learningObjectives || [],
          modules: (week.modules || []).map((mod: any) => ({
            moduleTitle: mod.title || "",
            description: mod.description || "",
            type: mod.type || "",
            duration: mod.duration?.toString() || "",
            contentLink: mod.contentUrl || "",
            embedCode: mod.embedCode || "",
          })),
        })),
        learningObjectives: ((program.data as any).learningOutcomes || []).map(
          (text: string) => ({ text }),
        ),
      };
      form.reset(mappedData);
      // Trigger validation manually so the user can see any errors right away
      setTimeout(() => form.trigger(), 100);
    }
  }, [program, form]);

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
    <div className="space-y-12">
      <DashboardHeaderText
        header="Edit Program "
        subtext="Edit existing program for your platform"
        backLinkText="Back to Programs"
        backLink="/admin/program"
      />
      <FormProvider {...form}>
        {" "}
        <ProgramForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
  );
}

export default function EditProgramFormClient({ id }: { id: string }) {
  return (
    <Suspense fallback={<div>Fetching program details...</div>}>
      <EditProgramForm id={id} />
    </Suspense>
  );
}
