"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import type { ModuleFormData } from "@/schemas/programs-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddModuleModalProps {
  onAddModule: (module: ModuleFormData) => void;
}

export default function AddModuleModal({ onAddModule }: AddModuleModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  // Local state — only pushed to field array on confirm
  const [moduleTitle, setModuleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [embedCode, setEmbedCode] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!moduleTitle.trim()) newErrors.moduleTitle = "Module title is required";
    if (!type.trim()) newErrors.type = "Type is required";
    if (!duration.trim()) newErrors.duration = "Duration is required";
    if (!contentLink.trim()) {
      newErrors.contentLink = "Content link is required";
    } else {
      try {
        new URL(contentLink.trim());
      } catch {
        newErrors.contentLink = "Must be a valid URL";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    closeModal("add-module");
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onAddModule({
      moduleTitle: moduleTitle.trim(),
      description: description.trim(),
      type: type.trim(),
      duration: duration.trim(),
      contentLink: contentLink.trim(),
      embedCode: embedCode.trim(),
    });

    closeModal("add-module");
  };

  return (
    <div className="space-y-5">
      <h2 className="modal-header">
        Add New Module
      </h2>

      {/* Module Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#344054] text-sm">Module Title *</label>
        <Input
          value={moduleTitle}
          onChange={(e) => {
            setModuleTitle(e.target.value);
            if (errors.moduleTitle)
              setErrors((prev) => ({ ...prev, moduleTitle: "" }));
          }}
          placeholder="e.g., Active Listening Techniques"
          className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
        />
        {errors.moduleTitle && (
          <span className="text-sm text-destructive">{errors.moduleTitle}</span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#344054] text-sm">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of this module..."
          className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-3 min-h-20 outline-none px-3 resize-none"
        />
      </div>

      {/* Type & Duration — side by side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#344054] text-sm">Type *</label>
          <Select
            value={type}
            onValueChange={(val) => {
              setType(val);
              if (errors.type) setErrors((prev) => ({ ...prev, type: "" }));
            }}
          >
            <SelectTrigger className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-sm font-medium text-[#344054] py-4 h-11 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="READING">Reading</SelectItem>
              <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
              <SelectItem value="QUIZ">Quiz</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <span className="text-sm text-destructive">{errors.type}</span>
          )}
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[#344054] text-sm">Duration *</label>
          <Input
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              if (errors.duration)
                setErrors((prev) => ({ ...prev, duration: "" }));
            }}
            placeholder="e.g., 45min"
            className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
          />
          {errors.duration && (
            <span className="text-sm text-destructive">{errors.duration}</span>
          )}
        </div>
      </div>

      {/* Content Link */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#344054] text-sm">Content Link *</label>
        <Input
          value={contentLink}
          onChange={(e) => {
            setContentLink(e.target.value);
            if (errors.contentLink)
              setErrors((prev) => ({ ...prev, contentLink: "" }));
          }}
          placeholder="https://..."
          className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
        />
        {errors.contentLink && (
          <span className="text-sm text-destructive">
            {errors.contentLink}
          </span>
        )}
      </div>

      {/* Embed Code */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#344054] text-sm">Embed Code</label>
        <textarea
          value={embedCode}
          onChange={(e) => setEmbedCode(e.target.value)}
          placeholder="Paste embed code here (optional)..."
          className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-3 min-h-20 outline-none px-3 resize-none"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" variant="regular" onClick={handleSubmit}>
          Add Module
        </Button>
      </div>
    </div>
  );
}
