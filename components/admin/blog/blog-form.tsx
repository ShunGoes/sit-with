import { useEffect } from "react";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { AddBlogFormValues } from "@/schemas/add-blog-schema";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import TiptapEditor from "./tiptap-editor";
import FormFieldComp from "@/components/formfield";
import { useModalStore } from "@/components/store/use-modal-store";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS = [
  { label: "Wellbeing", value: "WELLBEING" },
  { label: "Reflection", value: "REFLECTION" },
  { label: "Personal Growth", value: "PERSONAL_GROWTH" },
];

interface BlogFormProps {
  onSubmit: SubmitHandler<AddBlogFormValues>;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function BlogForm({
  onSubmit: onSubmitProp,
  submitLabel = "Publish Blog",
  isLoading = false,
}: BlogFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
  } = useFormContext<AddBlogFormValues>();

  const closeModal = useModalStore((state) => state.closeModal);

  const title = watch("title");
  const slug = watch("slug");
  const isPublished = watch("isPublished");

  useEffect(() => {
    if (title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [title, slug, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmitProp)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <FormFieldComp
          name="title"
          control={control}
          placeholder="Enter blog title"
          label="Title"
          className="bg-white"
        />

        {/* Slug */}
        <FormFieldComp
          name="slug"
          control={control}
          placeholder="blog-post-slug"
          label="Slug"
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div className="space-y-2">
          <FieldLabel>Category</FieldLabel>
          <Controller
            control={control}
            name="category"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-transparent text-primary-text">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Read Time */}
        <FormFieldComp
          name="readTimeMinutes"
          control={control}
          type="number"
          placeholder="5"
          label="Read Time (minutes)"
          className="bg-white"
        />
      </div>

      {/* Author */}
      <FormFieldComp
        name="author"
        control={control}
        placeholder="Enter author name"
        label="Author"
        className="bg-white"
      />

      {/* Excerpt */}
      <div className="space-y-2">
        <FieldLabel>Excerpt</FieldLabel>
        <Controller
          control={control}
          name="excerpt"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                placeholder="Brief summary of the blog post…"
                className="bg-white min-h-[100px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Published Status */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
        <div className="space-y-0.5">
          <FieldLabel className="text-base font-semibold">Publish immediately</FieldLabel>
          <p className="text-sm text-secondary-text">
            Control the visibility of this post on the live site.
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
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
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
      </div>

      {/* Content — Tiptap rich text editor */}
      <div className="space-y-2">
        <FieldLabel>Body Content</FieldLabel>
        <Controller
          control={control}
          name="body"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <TiptapEditor value={field.value ?? ""} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button
          variant={"outline"}
          type="button"
          className="font-normal"
          disabled={isLoading}
          onClick={() => closeModal("add-new-blog")}
        >
          Cancel
        </Button>
        <Button variant={"regular"} type="submit" className="font-normal" disabled={isLoading}>
          {isLoading ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
