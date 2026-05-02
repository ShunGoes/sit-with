"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import { Check, X } from "lucide-react";
import type { WeekFormData } from "@/schemas/programs-schema";
import FormFieldComp from "@/components/formfield";

interface AddWeekModalProps {
  onAddWeek: (week: WeekFormData) => void;
}

export default function AddWeekModal({ onAddWeek }: AddWeekModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  // Local state — not tied to useFieldArray until user confirms
  const [weekTitle, setWeekTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [objectiveInput, setObjectiveInput] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleAddObjective = () => {
    const trimmed = objectiveInput.trim();
    if (!trimmed) return;
    setObjectives((prev) => [...prev, trimmed]);
    setObjectiveInput("");
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives((prev) => prev.filter((_, i) => i !== index));
  };

  // Allow pressing Enter inside the objective input to add
  const handleObjectiveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddObjective();
    }
  };

  const handleCancel = () => {
    closeModal("add-week");
  };

  const handleSubmit = () => {
    if (!weekTitle.trim()) {
      setTitleError("Week title is required");
      return;
    }

    onAddWeek({
      weekTitle: weekTitle.trim(),
      description: description.trim(),
      learningObjectives: objectives,
      modules: [],
    });

    closeModal("add-week");
  };

  return (
    <div className="space-y-5">
      <h2 className="modal-header">Add New Week</h2>

      {/* Week Title */}
      <div className="flex flex-col gap-1.5">
        {/* <FormFieldComp name="" control={} /> */}
        <label className="text-primary-text text-sm">Week Title *</label>
        <Input
          value={weekTitle}
          onChange={(e) => {
            setWeekTitle(e.target.value);
            if (titleError) setTitleError("");
          }}
          placeholder="e.g., Introduction to Leadership"
          className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium textprimary-text placeholder:text-[#0A0A0A80] dark:placeholder:text-primary-text  placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
        />
        {titleError && (
          <span className="text-sm text-destructive">{titleError}</span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-primary-text text-sm">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of what this week covers..."
          className="border-[0.67px] border-[#D0D5DD] dark:placeholder:text-primary-text bg-transparent d-[8px] w-full text-sm font-medium text-primary-text placeholder:text-[#0A0A0A80] placeholder:text-sm py-3 min-h-20 outline-none px-3 resize-none"
        />
      </div>

      {/* Learning Objectives — tag-input pattern */}
      <div className="flex flex-col gap-1.5">
        <label className="text-primary-text text-sm">
          Learning Objectives
        </label>
         {/* Rendered objective list */}
        {objectives.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {objectives.map((obj, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-primary-text bg-[#F9FAFB] dark:text-white dark:bg-primary-text/20 rounded-md px-3 py-2"
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
            className="border-[0.67px] border-[#D0D5DD] dark:placeholder:text-primary-text bg-white rounded-[5px] flex-1 text-[12px] font-medium text-primary-text placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
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
