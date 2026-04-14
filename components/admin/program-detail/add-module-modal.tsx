/**
 * AddModuleModal — Modal content for creating a new module within a draft week.
 *
 * Architecture:
 * - Has its own useForm instance scoped to this modal.
 * - On confirm: passes the validated module data to onAddModule callback,
 *   which appends it to the correct draft week's modules array in page-level state.
 * - On cancel: closes the modal, all local state is discarded.
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import FormFieldComp from "@/components/formfield";
import {
  addModuleSchema,
  type AddModuleFormData,
  type DraftModule,
} from "@/schemas/program-detail-schemas";

interface AddModuleModalProps {
  onAddModule: (module: DraftModule) => void;
}

export default function AddModuleModal({ onAddModule }: AddModuleModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const form = useForm<AddModuleFormData>({
    resolver: zodResolver(addModuleSchema),
    defaultValues: {
      moduleTitle: "",
      description: "",
      type: "",
      duration: "",
      contentLink: "",
      embedCode: "",
    },
  });

  const handleCancel = () => {
    closeModal("add-module");
  };

  const handleSubmit = form.handleSubmit((data) => {
    const module: DraftModule = {
      moduleTitle: data.moduleTitle,
      description: data.description || "",
      type: data.type,
      duration: data.duration,
      contentLink: data.contentLink,
      embedCode: data.embedCode || "",
    };

    onAddModule(module);
    closeModal("add-module");
  });

  return (
    <div className="space-y-5">
      <h2 className="text-primary-text font-semibold text-lg">
        Add New Module
      </h2>

      {/* Module Title */}
      <FormFieldComp
        name="moduleTitle"
        control={form.control}
        label="Module Title *"
        placeholder="e.g., Introduction to Leadership Styles"
        className="bg-white"
      />

      {/* Description */}
      <FormFieldComp
        name="description"
        control={form.control}
        label="Description"
        placeholder="What will participants learn?"
        className="bg-white"
      />

      {/* Type & Duration — side by side */}
      <div className="grid grid-cols-2 gap-4">
        <FormFieldComp
          name="type"
          control={form.control}
          label="Type *"
          placeholder="e.g., Reading"
          className="bg-white"
        />
        <FormFieldComp
          name="duration"
          control={form.control}
          label="Duration *"
          placeholder="e.g., 45 min"
          className="bg-white"
        />
      </div>

      {/* Content Source section */}
      <div className="space-y-3">
        <div>
          <h3 className="text-primary-text font-semibold text-sm">
            Content Source
          </h3>
          <p className="text-xs text-[#667185]">
            Add a link to the course content or embed code for videos/interactive
            content
          </p>
        </div>

        <FormFieldComp
          name="contentLink"
          control={form.control}
          label="Content URL (YouTube, Vimeo, Google Drive, etc.)"
          placeholder="https://www.youtube.com/watch?v=..."
          className="bg-white"
        />

        <div className="flex items-center justify-center">
          <span className="text-xs text-[#667185]">OR</span>
        </div>

        <FormFieldComp
          name="embedCode"
          control={form.control}
          label="Embed Code (iframe or HTML embed code)"
          placeholder='<iframe src="..." width="100%" height="400"></iframe>'
          className="bg-white"
        />
      </div>

      {/* Examples hint */}
      <div className="bg-[#F9FAFB] rounded-md p-3 text-xs text-[#667185] space-y-1">
        <p className="font-medium text-[#344054]">💡 Examples:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Video: YouTube/Vimeo URL or embed code</li>
          <li>Reading: Google Docs, PDF link, or article URL</li>
          <li>Quiz: Google Forms, Typeform, or quiz platform URL</li>
          <li>Assignment: Document link or submission form URL</li>
        </ul>
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
