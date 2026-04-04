"use client";

import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { AddBlogFormValues } from "@/lib/schemas/add-blog-schema";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import TiptapEditor from "./tiptap-editor";
import FormFieldComp from "@/components/formfield";

interface BlogFormProps {
  onSubmit: SubmitHandler<any>;
  submitLabel?: string;
}

export default function BlogForm({
  onSubmit: onSubmitProp,
  submitLabel = "Publish Blog",
}: BlogFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<any>();


  return (
    <form onSubmit={handleSubmit(onSubmitProp)} className="space-y-6">
      {/* Title */}
      <FormFieldComp
        name="title"
        control={control}
        placeholder="Enter blog title"
        label="Ttle"
        className="bg-white"
        autoComplete="one-time-code"
      />

      {/* Author */}
      <FormFieldComp
        name="author"
        control={control}
        placeholder="Enter author name"
        label="Author"
        className="bg-white"
        autoComplete="one-time-code"
      />

      {/* Excerpt */}
      <FormFieldComp
        name="excerpt"
        control={control}
        placeholder="Brief summary of the blog post…"
        label="excerpt"
        className="bg-white"
      />

      {/* Cover Image */}
      <FieldLabel>Cover Image</FieldLabel>
      <Controller
        control={control}
        name="coverImage"
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

      {/* Content — Tiptap rich text editor */}
      <FieldLabel>Content</FieldLabel>
      <Controller
        control={control}
        name="content"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <TiptapEditor value={field.value ?? ""} onChange={field.onChange} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
