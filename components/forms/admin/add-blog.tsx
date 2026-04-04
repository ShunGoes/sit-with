"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBlogSchema, AddBlogFormValues } from "@/lib/schemas/add-blog-schema";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">New Blog Post</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Write and publish a new blog post
          </p>
        </div>

        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "write" ? "default" : "ghost"}
            onClick={() => setMode("write")}
            className="gap-1.5"
          >
            <PenLine size={14} />
            Write
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "preview" ? "default" : "ghost"}
            onClick={() => setMode("preview")}
            className="gap-1.5"
          >
            <Eye size={14} />
            Preview
          </Button>
        </div>
      </div>

      {/* Form context wraps both children so context is never lost on toggle */}
      <FormProvider {...form}>
        {mode === "write" ? <BlogForm /> : <BlogPreview />}
      </FormProvider>
    </div>
  );
}
