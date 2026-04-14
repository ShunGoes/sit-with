"use client";

import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import type { WeekFormData } from "@/schemas/programs-schema";

interface WeekCardProps {
  week: WeekFormData;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
}

export default function WeekCard({
  week,
  index,
  isSelected,
  onToggleSelect,
  onRemove,
}: WeekCardProps) {
  const objectiveCount = week.learningObjectives.length;
  const moduleCount = week.modules.length;

  return (
    <div
      className={`flex items-center justify-between border rounded-[12px] p-4 transition-colors ${
        isSelected
          ? "border-regular-button border-[0.67px] bg-[#F0F9FF]"
          : "border-[#EAECF0] border-[0.67px] bg-white"
      }`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-primary-text line-clamp-1 md:line-clamp-2">
          Week {index + 1}: {week.weekTitle}
        </p>
        {week.description && (
          <p className="text-xs text-[#667085] line-clamp-1 md:line-clamp-2">{week.description}</p>
        )}
        <p className="flex flex-col md:flex-row md:items-center gap-1 text-xs text-[#667085] mt-1">
          <span className="flex gap-1">
            <Check className="h-3.5 w-3.5 text-green-600 hidden sm:block" />
            {objectiveCount} learning objective{objectiveCount !== 1 ? "s" : ""}
          </span>
          <span className="mx-0.5 hidden sm:block">·</span>
          {moduleCount} module{moduleCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Toggle between "Manage Modules" and "Selected" */}
        <Button
          type="button"
          variant={isSelected ? "regular" : "outline"}
          size="sm"
          className={`${isSelected ? "" : "text-regular-button border-none"} font-medium text-sm`}
          onClick={onToggleSelect}
        >
          {isSelected ? "Selected" : "Manage Modules"}
        </Button>

        {/* Delete week */}
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 cursor-pointer p-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
