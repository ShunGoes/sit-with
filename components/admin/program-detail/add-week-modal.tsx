/**
 * AddWeekModal — Modal content for creating a new draft week.
 *
 * Architecture:
 * - Has its own useForm instance scoped to this modal (NOT the page-level state).
 * - learningObjectives are managed via local useState as a tag-input, not via RHF/Zod.
 * - On confirm: passes the assembled DraftWeek to the onAddWeek callback,
 *   which appends it to the page-level useState. Then closes the modal.
 * - On cancel: closes the modal, all local state is discarded.
 */

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useModalStore } from "@/components/store/use-modal-store";
import FormFieldComp from "@/components/formfield";
import {
  addWeekSchema,
  type AddWeekFormData,
  type DraftWeek,
} from "@/schemas/program-detail-schemas";

interface AddWeekModalProps {
  onAddWeek: (week: DraftWeek) => void;
}

export default function AddWeekModal({ onAddWeek }: AddWeekModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const form = useForm<AddWeekFormData>({
    resolver: zodResolver(addWeekSchema),
    defaultValues: { weekTitle: "", description: "" },
  });

  // Learning objectives managed in local state (tag-input pattern)
  const [objectives, setObjectives] = useState<string[]>([]);
  const [objectiveInput, setObjectiveInput] = useState("");

  const handleAddObjective = () => {
    const trimmed = objectiveInput.trim();
    if (!trimmed) return;
    setObjectives((prev) => [...prev, trimmed]);
    setObjectiveInput("");
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives((prev) => prev.filter((_, i) => i !== index));
  };

  const handleObjectiveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddObjective();
    }
  };

  const handleCancel = () => {
    closeModal("add-week");
  };

  const handleSubmit = form.handleSubmit((data) => {
    // Generate a local-only id for React keying
    const draftWeek: DraftWeek = {
      id: crypto.randomUUID(),
      weekTitle: data.weekTitle,
      description: data.description || "",
      learningObjectives: objectives,
      modules: [],
    };

    onAddWeek(draftWeek);
    closeModal("add-week");
  });

  return (
    <div className="space-y-5">
      <h2 className="modal-header">Add New Week</h2>

      {/* Week Title — manually configured inside Controller matching other modal styles */}
      <Controller
        name="weekTitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-[#344054] text-sm">Week Title *</label>
            <Input
              {...field}
              placeholder="e.g., Introduction to Leadership"
              className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
            />
            {fieldState.invalid && (
              <span className="text-sm text-destructive">{fieldState.error?.message}</span>
            )}
          </div>
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-[#344054] text-sm">Description</label>
            <textarea
              {...field}
              placeholder="Brief description of what this week covers..."
              className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[8px] w-full text-sm font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-3 min-h-20 outline-none px-3 resize-none"
            />
            {fieldState.invalid && (
              <span className="text-sm text-destructive">{fieldState.error?.message}</span>
            )}
          </div>
        )}
      />

      {/* Learning Objectives — tag-input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#344054] text-sm">
          Learning Objectives
        </label>

        {/* Rendered objective list */}
        {objectives.length > 0 && (
          <ul className="space-y-1.5 mb-2">
            {objectives.map((obj, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-[#344054] bg-[#F9FAFB] rounded-md px-3 py-2"
              >
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  {obj}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(index)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center mt-2 gap-2">
          <Input
            value={objectiveInput}
            onChange={(e) => setObjectiveInput(e.target.value)}
            onKeyDown={handleObjectiveKeyDown}
            placeholder="Add a learning objective..."
            className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] flex-1 text-[12px] font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="outline"
            className="border border-regular-button text-regular-button font-medium"
            onClick={handleAddObjective}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" variant="regular" onClick={handleSubmit}>
          Add Week
        </Button>
      </div>
    </div>
  );
}
