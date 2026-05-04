"use client";

import { useEffect, useState, ViewTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBlogSchema, AddBlogFormValues } from "@/schemas/add-blog-schema";
import BlogForm from "@/components/admin/blog/blog-form";
import BlogPreview from "@/components/admin/blog/blog-preview";
import { Button } from "@/components/ui/button";
import { PenLine, Eye } from "lucide-react";
import { useCreateBlogPost } from "@/lib/api/hooks/admin/blog.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";


type Mode = "write" | "preview";

export default function AdminBlogEditor() {
  const [mode, setMode] = useState<Mode>("write");
  const { mutate: createBlogPost, isPending } = useCreateBlogPost();
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogSchema),
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

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  const onSubmit = (data: AddBlogFormValues) => {
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

    createBlogPost(formData, {
      onSuccess: () => {
        closeModal("loading");
        form.reset();
        closeModal("add-new-blog");
      },
      onError: () => {
        closeModal("loading");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex justify-between w-10/12 sm:w-11/12">
          <div className="">
            <h1 className="text-2xl text-primary-text dark:text-secondary-text font-bold">
              {mode === "write" ? "New Post" : "Preview Post"}
            </h1>

            <p className="text-sm text-primary-text mt-1">
              Write and publish a new blog post
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

      {/* Form context wraps both children so context is never lost on toggle */}
      <FormProvider {...form}>
        {mode === "write" ? (
          <BlogForm onSubmit={onSubmit} isLoading={isPending} />
        ) : (
          <BlogPreview />
        )}
      </FormProvider>
    </div>
  );
}
