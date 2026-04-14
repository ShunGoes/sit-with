"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModalStore } from "@/components/store/use-modal-store";
import ModuleCard from "./module-card";
import AddModuleModal from "./add-module-modal";
import type { ProgramFormSchema, ModuleFormData } from "@/schemas/programs-schema";

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
      />
    );
  };

  return (
    <div className="bg-white p-5 rounded-[12px]">
      {/* Section header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-primary-text font-semibold text-base">
            Modules for Week {weekIndex + 1}
          </h3>
          <p className="text-xs text-[#667185]">
            {weekTitle} – Add learning modules with embedded content
          </p>
        </div>
        <Button
          type="button"
          variant="regular"
          size="sm"
          onClick={handleOpenAddModule}
        >
          <Plus className="h-4 w-4" />
          Add Module
        </Button>
      </div>

      {/* Module list or empty state */}
      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[#EAECF0] rounded-[10px] py-12 text-center">
          <svg
            className="h-10 w-10 text-[#D0D5DD] mb-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
            <path d="M8 7h6" />
            <path d="M8 11h8" />
          </svg>
          <p className="text-sm text-[#667185]">
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
