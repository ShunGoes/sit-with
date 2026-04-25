"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBlogSchema, EditBlogFormValues } from "@/schemas/edit-blog-schema";
import BlogForm from "@/components/admin/blog/blog-form";
import BlogPreview from "@/components/admin/blog/blog-preview";
import { Button } from "@/components/ui/button";
import { PenLine, Eye } from "lucide-react";

import { useUpdateBlogPost } from "@/lib/api/hooks/admin/blog.hooks";
import { BlogPost } from "@/lib/api/services/admin/blog.services";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";

interface EditBlogEditorProps {
  blog: BlogPost;
}

type Mode = "write" | "preview";

export default function EditBlogEditor({ blog }: EditBlogEditorProps) {
  const [mode, setMode] = useState<Mode>("write");
  const { mutate: updateBlogPost, isPending } = useUpdateBlogPost();
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const form = useForm<EditBlogFormValues>({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      excerpt: "",
      coverImage: undefined,
      body: "",
      category: "",
      readTimeMinutes: 5,
      isPublished: false,
    },
  });

  // Prefill form once blog data is available
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        slug: blog.slug,
        author: blog.author || "Admin",
        excerpt: blog.excerpt,
        coverImage: blog.coverImageUrl,
        body: blog.body,
        category: blog.category,
        readTimeMinutes: blog.readTimeMinutes,
        isPublished: blog.isPublished,
      });
    }
  }, [blog, form]);

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} className="text-primary-text" />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  const onSubmit = (data: EditBlogFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "coverImage") {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, String(value));
      }
    });

    updateBlogPost(
      { id: blog.id, data: formData },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal("open-edit-blog");
        },
        onError: () => {
          closeModal("loading");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex justify-between w-10/12 sm:w-11/12">
          <div>
            <h1 className="text-2xl text-primary-text font-bold">
              {mode === "write" ? "Edit Post" : "Preview Post"}
            </h1>
            <p className="text-sm text-secondary-text mt-1">
              Update and republish your blog post
            </p>
          </div>

          <div className="flex gap-2 rounded-lg p-1">
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

      <FormProvider {...form}>
        {mode === "write" ? (
          <BlogForm 
            onSubmit={onSubmit} 
            submitLabel="Save Changes" 
            isLoading={isPending} 
          />
        ) : (
          <BlogPreview />
        )}
      </FormProvider>
    </div>
  );
}
