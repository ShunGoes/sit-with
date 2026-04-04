"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBlogSchema, EditBlogFormValues } from "@/lib/schemas/edit-blog-schema";
import BlogForm from "@/components/admin/blog/blog-form";
import BlogPreview from "@/components/admin/blog/blog-preview";
import { Button } from "@/components/ui/button";
import { PenLine, Eye } from "lucide-react";

// Shape of an existing blog post from your API
export interface ExistingBlog {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  coverImage: string; // URL from the server
  content: string;
}

interface EditBlogEditorProps {
  blog: ExistingBlog;
}

type Mode = "write" | "preview";

export default function EditBlogEditor({ blog }: EditBlogEditorProps) {
  const [mode, setMode] = useState<Mode>("write");

  const form = useForm<EditBlogFormValues>({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: "",
      author: "",
      excerpt: "",
      coverImage: undefined,
      content: "",
    },
  });

  // Prefill form once blog data is available (handles both direct props and async fetched data)
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        author: blog.author,
        excerpt: blog.excerpt,
        coverImage: blog.coverImage,
        content: blog.content,
      });
    }
  }, [blog, form]);

  const onSubmit = (data: EditBlogFormValues) => {
    console.log("Edit blog submitted:", { id: blog.id, ...data });
    // TODO: wire up API call (e.g. PATCH /api/blogs/:id)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update and republish your blog post
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

      <FormProvider {...form}>
        {mode === "write" ? (
          <BlogForm onSubmit={onSubmit} submitLabel="Save Changes" />
        ) : (
          <BlogPreview />
        )}
      </FormProvider>
    </div>
  );
}
