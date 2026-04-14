"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { ProgramFormSchema } from "@/schemas/programs-schema";

export default function LearningObjectivesField() {
  const { control } = useFormContext<ProgramFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "learningObjectives",
  });

  const [objectiveInput, setObjectiveInput] = useState("");

  const handleAddObjective = () => {
    const trimmed = objectiveInput.trim();
    if (!trimmed) return;
    append({ text: trimmed });
    setObjectiveInput("");
  };

  const handleObjectiveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddObjective();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Rendered objective list */}
      {fields.length > 0 && (
        <ul className="space-y-1.5 mb-2">
          {fields.map((field, index) => (
            <li
              key={field.id}
              className="flex items-center justify-between text-sm text-[#344054] bg-[#F9FAFB] rounded-md px-3 py-2"
            >
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                {field.text}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Input row */}
      <div className="flex items-center gap-2">
        <Input
          value={objectiveInput}
          onChange={(e) => setObjectiveInput(e.target.value)}
          onKeyDown={handleObjectiveKeyDown}
          placeholder="Add a learning objective..."
          className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] flex-1 text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] py-4 h-11 focus-visible:border-none focus-visible:ring-0"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddObjective}
          className="h-11"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
