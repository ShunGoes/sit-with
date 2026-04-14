"use client";

import { Check, X } from "lucide-react";
import type { ModuleFormData } from "@/schemas/programs-schema";

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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[#101928]">
            Module {index + 1}: {module.moduleTitle}
          </p>
          {module.description && (
            <p className="text-xs text-[#667185]">{module.description}</p>
          )}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {/* Type badge */}
            <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5">
              {module.type}
            </span>
            <span className="text-xs text-[#667185]">{module.duration}</span>
            <span className="text-[#667185]">·</span>
            <span className="flex items-center gap-1 text-xs text-green-600">
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
        className="text-red-500 hover:text-red-700 cursor-pointer mt-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
