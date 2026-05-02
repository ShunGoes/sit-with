"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModalStore } from "@/components/store/use-modal-store";
import ModuleCard from "./module-card";
import AddModuleModal from "./add-module-modal";
import type {
  ProgramFormSchema,
  ModuleFormData,
} from "@/schemas/programs-schema";

interface ModulesSectionProps {
  weekIndex: number;
}

export default function ModulesSection({ weekIndex }: ModulesSectionProps) {
  const { control, watch } = useFormContext<ProgramFormSchema>();
  const openModal = useModalStore((state) => state.openModal);

  // Nested field array scoped to weeks.{weekIndex}.modules
  const { fields, append, remove } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.modules` as const,
  });

  const week = watch(`weeks.${weekIndex}`);
  const weekTitle = week?.weekTitle ?? "";

  const handleOpenAddModule = () => {
    openModal(
      "add-module",
      <AddModuleModal
        onAddModule={(module: ModuleFormData) => {
          append(module);
        }}
      />,
    );
  };

  return (
    <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
      {/* Section header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <header className="text-primary-text font-semibold text-base ">
            Modules for Week {weekIndex + 1}
          </header>
          <p className="text-xs text-primary-text">
            {weekTitle} – Add learning modules with embedded content
          </p>
        </div>
        <Button
          type="button"
          variant="regular"
          className="h-10 text-sm"
          onClick={handleOpenAddModule}
        >
          <Plus className="h-4 w-4" />
          Add Module
        </Button>
      </div>

      {/* Module list or empty state */}
      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#D0D5DD] rounded-[12px] py-12 text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.60156 14.4001C9.60156 11.7491 11.7506 9.6001 14.4016 9.6001H19.2016C21.8525 9.6001 24.0016 11.7491 24.0016 14.4001V33.6001C24.0016 36.2511 21.8525 38.4001 19.2016 38.4001H14.4016C11.7506 38.4001 9.60156 36.2511 9.60156 33.6001V14.4001Z"
              stroke="#667085"
              strokeWidth="3.6"
            />
            <path
              d="M24 14.3999H33.6C36.251 14.3999 38.4 16.5489 38.4 19.1999V28.7999C38.4 31.4509 36.251 33.5999 33.6 33.5999H24"
              stroke="#667085"
              strokeWidth="3.6"
            />
          </svg>

          <p className="text-sm text-[#667085]">
            No modules added to this week yet. Click &quot;Add Module&quot; to
            create learning content.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <ModuleCard
              key={field.id}
              module={field as unknown as ModuleFormData}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
