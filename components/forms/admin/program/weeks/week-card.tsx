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
      className={`flex items-start justify-between border rounded-[10px] p-4 transition-colors ${
        isSelected
          ? "border-green-400 bg-green-50/30"
          : "border-[#EAECF0] bg-white"
      }`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#101928]">
          Week {index + 1}: {week.weekTitle}
        </p>
        {week.description && (
          <p className="text-xs text-[#667185]">{week.description}</p>
        )}
        <p className="flex items-center gap-1 text-xs text-[#667185] mt-1">
          <Check className="h-3.5 w-3.5 text-green-600" />
          {objectiveCount} learning objective{objectiveCount !== 1 ? "s" : ""}
          <span className="mx-0.5">·</span>
          {moduleCount} module{moduleCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Toggle between "Manage Modules" and "Selected" */}
        <Button
          type="button"
          variant={isSelected ? "regular" : "outline"}
          size="sm"
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
