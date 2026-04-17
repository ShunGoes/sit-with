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

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import FormFieldComp from "@/components/formfield";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addModuleSchema,
  type AddModuleFormData,
  type DraftModule,
} from "@/schemas/program-detail-schemas";

interface AddModuleModalProps {
  onAddModule: (module: DraftModule) => void;
  initialData?: any;
  title?: string;
}

export default function AddModuleModal({ onAddModule, initialData, title = "Add New Module" }: AddModuleModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const form = useForm<AddModuleFormData>({
    resolver: zodResolver(addModuleSchema),
    defaultValues: {
      moduleTitle: initialData?.title || initialData?.moduleTitle || "",
      description: initialData?.description || "",
      type: initialData?.type || "",
      duration: initialData?.duration || "",
      contentLink: initialData?.contentUrl || initialData?.contentLink || "",
      embedCode: initialData?.embedCode || "",
    },
  });

  const handleCancel = () => {
    closeModal(initialData ? "edit-module" : "add-module");
  };

  const handleSubmit = form.handleSubmit((data) => {
    const module: any = {
      id: initialData?.id,
      title: data.moduleTitle,
      description: data.description || "",
      type: data.type,
      duration: data.duration,
      contentUrl: data.contentLink,
      embedCode: data.embedCode || "",
    };

    onAddModule(module);
    closeModal(initialData ? "edit-module" : "add-module");
  });

  return (
    <div className="space-y-5">
      <h2 className="text-primary-text font-semibold text-lg">
        {title}
      </h2>

      {/* Module Title */}
      <Controller
        name="moduleTitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-[#344054] text-sm">Module Title *</label>
            <Input
              {...field}
              placeholder="e.g., Introduction to Leadership Styles"
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
              placeholder="What will participants learn?"
              className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-3 min-h-20 outline-none px-3 resize-none"
            />
            {fieldState.invalid && (
              <span className="text-sm text-destructive">{fieldState.error?.message}</span>
            )}
          </div>
        )}
      />

      {/* Type & Duration — side by side */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-[#344054] text-sm">Type *</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-sm font-medium text-[#344054] py-4 h-11 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reading">Reading</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <span className="text-sm text-destructive">{fieldState.error?.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="duration"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-[#344054] text-sm">Duration *</label>
              <Input
                {...field}
                placeholder="e.g., 45 min"
                className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
              />
              {fieldState.invalid && (
                <span className="text-sm text-destructive">{fieldState.error?.message}</span>
              )}
            </div>
          )}
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

        <Controller
          name="contentLink"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-[#344054] text-sm">Content URL (YouTube, Vimeo, Google Drive, etc.)</label>
              <Input
                {...field}
                placeholder="https://www.youtube.com/watch?v=..."
                className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-4 h-11 focus-visible:border-none focus-visible:ring-0"
              />
              {fieldState.invalid && (
                <span className="text-sm text-destructive">{fieldState.error?.message}</span>
              )}
            </div>
          )}
        />

        <div className="flex items-center justify-center">
          <span className="text-xs text-[#667185]">OR</span>
        </div>

        <Controller
          name="embedCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-[#344054] text-sm">Embed Code (iframe or HTML embed code)</label>
              <textarea
                {...field}
                placeholder='<iframe src="..." width="100%" height="400"></iframe>'
                className="border-[0.67px] border-[#D0D5DD] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#0A0A0A80] placeholder:text-sm py-3 min-h-20 outline-none px-3 resize-none"
              />
              {fieldState.invalid && (
                <span className="text-sm text-destructive">{fieldState.error?.message}</span>
              )}
            </div>
          )}
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
