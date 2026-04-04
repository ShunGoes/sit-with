"use client";

import { useFormContext, Controller } from "react-hook-form";
import { AddBlogFormValues } from "@/lib/schemas/add-blog-schema";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import TiptapEditor from "./tiptap-editor";

interface BlogFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
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
  } = useFormContext<AddBlogFormValues>();

  const defaultHandle = handleSubmit((data) => {
    console.log("Blog form submitted:", data);
  });

  return (
    <form
      onSubmit={onSubmitProp ?? defaultHandle}
      className="space-y-6"
    >
      {/* Title */}
      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          placeholder="Enter blog title"
          {...register("title")}
        />
        {errors.title && <FieldError errors={[errors.title]} />}
      </Field>

      {/* Author */}
      <Field data-invalid={!!errors.author}>
        <FieldLabel htmlFor="author">Author</FieldLabel>
        <Input
          id="author"
          placeholder="Author name"
          {...register("author")}
        />
        {errors.author && <FieldError errors={[errors.author]} />}
      </Field>

      {/* Excerpt */}
      <Field data-invalid={!!errors.excerpt}>
        <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
        <Textarea
          id="excerpt"
          rows={3}
          placeholder="Brief summary of the blog post…"
          {...register("excerpt")}
        />
        {errors.excerpt && <FieldError errors={[errors.excerpt]} />}
      </Field>

      {/* Cover Image */}
      <Field data-invalid={!!errors.coverImage}>
        <FieldLabel>Cover Image</FieldLabel>
        <Controller
          control={control}
          name="coverImage"
          render={({ field }) => (
            <ImageUpload
              value={field.value ?? null}
              onChange={(file) => field.onChange(file)}
            />
          )}
        />
        {errors.coverImage && <FieldError errors={[errors.coverImage]} />}
      </Field>

      {/* Content — Tiptap rich text editor */}
      <Field data-invalid={!!errors.content}>
        <FieldLabel>Content</FieldLabel>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TiptapEditor
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
        {errors.content && <FieldError errors={[errors.content]} />}
      </Field>

      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
