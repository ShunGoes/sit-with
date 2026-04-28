import { useEffect } from "react";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { TestimonialFormValues } from "@/schemas/testimonials-schema";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import FormFieldComp from "@/components/formfield";
import { useModalStore } from "@/components/store/use-modal-store";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useGetCamps } from "@/lib/api/hooks/camps/camps.hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestimonialFormProps {
  onSubmit: SubmitHandler<TestimonialFormValues>;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function TestimonialForm({
  onSubmit: onSubmitProp,
  submitLabel = "Save Testimonial",
  isLoading = false,
}: TestimonialFormProps) {
  const { control, handleSubmit, watch } = useFormContext<TestimonialFormValues>();
  const closeModal = useModalStore((state) => state.closeModal);
  const isPublished = watch("isPublished");

  const { data: campsData, isLoading: isLoadingCamps } = useGetCamps();
  const camps = campsData?.data || [];

  return (
    <form onSubmit={handleSubmit(onSubmitProp)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <FieldLabel>Camp (Optional)</FieldLabel>
          <Controller
            control={control}
            name="campId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Select onValueChange={field.onChange} value={field.value || "site-wide"}>
                  <SelectTrigger className="bg-transparent text-primary-text">
                    <SelectValue placeholder={isLoadingCamps ? "Loading..." : "Select a camp"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site-wide">Site-wide (No Camp)</SelectItem>
                    {camps.map((camp) => (
                      <SelectItem key={camp.id} value={camp.id}>
                        {camp.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <FormFieldComp
          name="name"
          control={control}
          placeholder="Enter name"
          label="Name"
          className="bg-white"
        />
      </div>

      <FormFieldComp
        name="role"
        control={control}
        placeholder="e.g. Camp Participant"
        label="Role"
        className="bg-white"
      />

      <div className="space-y-2">
        <FieldLabel>Quote</FieldLabel>
        <Controller
          control={control}
          name="quote"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                placeholder="Enter testimonial quote..."
                className="bg-white min-h-[100px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
        <div className="space-y-0.5">
          <FieldLabel className="text-base font-semibold">Publish immediately</FieldLabel>
          <p className="text-sm text-secondary-text">
            Control the visibility of this testimonial on the live site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isPublished ? "success" : "warning"}>
            {isPublished ? "Published" : "Draft"}
          </Badge>
          <Controller
            control={control}
            name="isPublished"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel>Avatar (optional)</FieldLabel>
        <Controller
          control={control}
          name="avatar"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <ImageUpload
                value={field.value ?? null}
                onChange={(file: File | null) => field.onChange(file)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          type="button"
          className="text-regular-button border-regular-button"
          disabled={isLoading}
          onClick={() => closeModal("testimonial-modal")}
        >
          Cancel
        </Button>
        <Button variant="regular" type="submit" className="font-normal" disabled={isLoading}>
          {isLoading ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
