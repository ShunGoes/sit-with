"use client";

import { useState, ViewTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBlogSchema, AddBlogFormValues } from "@/schemas/add-blog-schema";
import BlogForm from "@/components/admin/blog/blog-form";
import BlogPreview from "@/components/admin/blog/blog-preview";
import { Button } from "@/components/ui/button";
import { PenLine, Eye } from "lucide-react";

type Mode = "write" | "preview";

export default function AdminBlogEditor() {
  const [mode, setMode] = useState<Mode>("write");

  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: "",
      author: "",
      excerpt: "",
      coverImage: undefined,
      content: "",
    },
  });

  const onSubmit = (data: AddBlogFormValues) => {
    console.log("Add blog submitted:", data);
    // TODO: wire up API call (e.g. POST /api/blogs)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between  border-b border-border pb-4">
        <div className="flex  justify-between w-10/12 sm:w-11/12">
          <div className="">
            <h1 className="text-2xl text-primary-text font-bold">
              {mode === "write" ? "New Post" : "Preview Post"}
            </h1>

            <p className="text-sm text-secondary-text mt-1">
              Write and publish a new blog post
            </p>
          </div>
          <div className="flex  gap-2  rounded-lg p-1">
            <Button
              type="button"
              size="sm"
              variant={mode === "write" ? "regular" : "ghost"}
              onClick={() => setMode("write")}
              className="gap-1.5"
            >
              <PenLine size={14} />
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mode === "preview" ? "regular" : "ghost"}
              onClick={() => setMode("preview")}
              className="gap-1.5"
            >
              <Eye size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Form context wraps both children so context is never lost on toggle */}
      <FormProvider {...form}>
        {mode === "write" ? <BlogForm onSubmit={onSubmit} /> : <BlogPreview />}
      </FormProvider>
    </div>
  );
}
