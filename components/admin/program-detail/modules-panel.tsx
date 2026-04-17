/**
 * ModulesPanel — Renders the modules list for a single draft week.
 *
 * Shows a header with module count and "+ Add Module" button,
 * a dashed-border empty state when no modules exist,
 * or a list of module cards when modules have been added.
 * Also provides a delete (✕) button per module to remove from draft state.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Plus, Check, X } from "lucide-react";
import type { DraftModule } from "@/schemas/program-detail-schemas";

interface ModulesPanelProps {
  modules: DraftModule[] | any[];
  onAddModule: () => void;
  onRemoveModule: (moduleIndex: number) => void;
  onEditModule?: (moduleIndex: number) => void;
}

export default function ModulesPanel({
  modules,
  onAddModule,
  onRemoveModule,
  onEditModule
}: ModulesPanelProps) {
  return (
    <div className="bg-white rounded-[12px] p-5 border border-[#EAECF0]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-primary-text font-semibold text-base">
          Modules ({modules.length})
        </h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddModule}
        >
          <Plus className="h-4 w-4" />
          Add Module
        </Button>
      </div>

      {/* Empty state or module list */}
      {modules.length === 0 ? (
        <div className="flex items-center justify-center border border-dashed border-[#EAECF0] rounded-[10px] py-10">
          <p className="text-sm text-[#667185]">
            No modules added yet. Click &quot;Add Module&quot; to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((mod, index) => (
            <div
              key={index}
              className="flex items-start justify-between border border-[#EAECF0] rounded-[10px] p-4"
            >
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
                    Module {index + 1}: {mod.moduleTitle}
                  </p>
                  {mod.description && (
                    <p className="text-xs text-[#667185]">{mod.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {/* Type badge */}
                    <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5">
                      {mod.type}
                    </span>
                    <span className="text-xs text-[#667185]">
                      {mod.duration}
                    </span>
                    <span className="text-[#667185]">·</span>
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <Check className="h-3 w-3" />
                      Content linked
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-1">
                {onEditModule && (
                  <button
                    type="button"
                    onClick={() => onEditModule(index)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                )}
                {/* Delete module */}
                <button
                  type="button"
                  onClick={() => onRemoveModule(index)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
