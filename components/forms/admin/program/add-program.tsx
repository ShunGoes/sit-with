import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useCreateProgram } from "@/lib/api/hooks/programs/programs.hooks";
import { ProgramFormSchema, ProgramSchema } from "@/schemas/programs-schema";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ProgramForm from "./program-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useCreateProgram();

  // submit buton 
  const onSubmit: SubmitHandler<ProgramFormSchema> = (data) => {
    console.log(data)
    const formData = new FormData();
    
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("price", (parseFloat(data.price.replace(/,/g, "")) || 0).toString());
    formData.append("hoursPerWeek", data.hoursPerWeek);
    if (data.date) formData.append("startDate", data.date);
    formData.append("category", data.programType.toUpperCase());
    if (data.facilitatorName) formData.append("facilitatorName", data.facilitatorName);
    if (data.facilitatorEmail) formData.append("facilitatorEmail", data.facilitatorEmail);
    if (data.duration) formData.append("durationWeeks", data.duration);

    if (data.learningObjectives && data.learningObjectives.length > 0) {
      const learningOutcomes = data.learningObjectives.map((obj) => obj.text);
      formData.append("learningOutcomes", JSON.stringify(learningOutcomes));
    } else {
      formData.append("learningOutcomes", JSON.stringify([]));
    }

    if (data.weeks && data.weeks.length > 0) {
      const formattedWeeks = data.weeks.map(week => ({

        title: week.weekTitle,
        description: week.description,
        learningObjectives: week.learningObjectives,
        modules: week.modules.map(mod => ({
          title: mod.moduleTitle,
          description: mod.description,
          type: mod.type,
          duration: mod.duration,
          contentUrl: mod.contentLink,
        }))
      }));
      formData.append("weeks", JSON.stringify(formattedWeeks));
    } else {
      formData.append("weeks", JSON.stringify([]));
    }

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

   
    mutate(formData, {
      onSuccess: () => {
        closeModal("loading");
        form.reset()
        router.push("/admin/program")
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
    <div className="space-y-6">
      <DashboardHeaderText
        header="Create New Program "
        subtext="Set up a new learning program for your platform"
        backLink="/admin/program"
        backLinkText="Back to programs"
      />
      <FormProvider {...form}>
        {" "}
        <ProgramForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
  );
}
