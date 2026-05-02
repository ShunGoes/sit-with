"use client";

import { Bookmark, Check, X } from "lucide-react";
import type { ModuleFormData } from "@/schemas/programs-schema";
import { Badge } from "@/components/ui/badge";

interface ModuleCardProps {
  module: ModuleFormData;
  index: number;
  onRemove: () => void;
}

export default function ModuleCard({
  module,
  index,
  onRemove,
}: ModuleCardProps) {
  return (
    <div className="flex items-start justify-between border border-[#EAECF0] rounded-[10px] p-4">
      <div className="flex items-start gap-3">
        {/* Module icon */}
        <div className="mt-0.5 flex-shrink-0 text-[#98A2B3]">
        <Bookmark color="#60935D" size={20}/>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-primary-text">
            Module {index + 1}: {module.moduleTitle}
          </p>
          {module.description && (
            <p className="text-xs text-[#667085] dark:text-primary-text">{module.description}</p>
          )}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {/* Type badge */}
            <Badge variant="success">
              {module.type}
            </Badge>
            <span className="text-xs text-[#667085] dark:text-primary-text">{module.duration} mins</span>
            <span className="text-[#667185]">·</span>
            <span className="flex items-center gap-1 text-xs text-regular-button">
              <Check className="h-3 w-3" />
              Content linked
            </span>
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={onRemove}
        className="text-brand-red hover:text-red-700 cursor-pointer mt-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
