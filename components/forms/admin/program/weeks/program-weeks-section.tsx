"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { useModalStore } from "@/components/store/use-modal-store";
import WeekCard from "./week-card";
import ModulesSection from "./modules-section";
import AddWeekModal from "./add-week-modal";
import type { ProgramFormSchema, WeekFormData } from "@/schemas/programs-schema";

export default function ProgramWeeksSection() {
  const { control } = useFormContext<ProgramFormSchema>();
  const openModal = useModalStore((state) => state.openModal);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weeks",
  });

  // Only one week can be "selected" (expanded) at a time. -1 means none.
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(-1);

  const handleToggleSelect = (index: number) => {
    // Toggle off if already selected, otherwise select the new one
    setSelectedWeekIndex((prev) => (prev === index ? -1 : index));
  };

  const handleRemoveWeek = (index: number) => {
    remove(index);

    // Adjust selection after removal
    if (selectedWeekIndex === index) {
      setSelectedWeekIndex(-1);
    } else if (selectedWeekIndex > index) {
      // Shift selection down since an earlier item was removed
      setSelectedWeekIndex((prev) => prev - 1);
    }
  };

  const handleOpenAddWeek = () => {
    openModal(
      "add-week",
      <AddWeekModal
        onAddWeek={(week: WeekFormData) => {
          append(week);
        }}
      />
    );
  };

  return (
    <>
      <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
        {/* Section header */}
        <div className="flex items-start justify-between gap-4 mb-6 md:mb-4">
          <div>
            <header className="text-primary-text font-semibold text-base ">
              Program Weeks
            </header>
            <p className="text-xs text-[#667185]">
              Add and manage weekly content that appears on the user dashboard
            </p>
          </div>
          <Button
            type="button"
            variant="regular"
            className="h-10 text-sm"
            onClick={handleOpenAddWeek}
          >
            <Plus className="h-4 w-4" />
            Add Week
          </Button>
        </div>

        {/* Week list or empty state */}
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#D0D5DD] rounded-[12px] py-12 text-center">
            <Calendar className="h-10 w-10 text-[#667085] mb-3" />
            <p className="text-sm text-[#667085]">
              No weeks added yet. Click &quot;Add Week&quot; to start building
              your program.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <WeekCard
                key={field.id}
                week={field as unknown as WeekFormData}
                index={index}
                isSelected={selectedWeekIndex === index}
                onToggleSelect={() => handleToggleSelect(index)}
                onRemove={() => handleRemoveWeek(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modules section — rendered outside the week card, below the week list */}
      {selectedWeekIndex >= 0 && selectedWeekIndex < fields.length && (
        <ModulesSection weekIndex={selectedWeekIndex} />
      )}
    </>
  );
}
