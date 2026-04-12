"use client";

import { useState, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { AddBlogFormValues } from "@/schemas/add-blog-schema";
import Image from "next/image";

export default function BlogPreview() {
  const values = useWatch<AddBlogFormValues>();
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const { title, author, excerpt, coverImage, content } =
    values as AddBlogFormValues;

  // Resolve cover image src safely without memory leaks
  useEffect(() => {
    if (coverImage instanceof File) {
      const objectUrl = URL.createObjectURL(coverImage);
      setFileSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setFileSrc(null);
    }
  }, [coverImage]);

  const coverSrc =
    typeof coverImage === "string" && coverImage.length > 0
      ? coverImage
      : fileSrc;

  return (
    <article className="max-w-3xl mx-auto space-y-8 py-6">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold leading-tight text-foreground">
          {title || (
            <span className="text-muted-foreground">Untitled Post</span>
          )}
        </h1>

        {author && (
          <p className="text-sm text-muted-foreground">
            By <span className="font-medium text-foreground">{author}</span>
          </p>
        )}

        {excerpt && (
          <p className="text-base text-muted-foreground leading-relaxed border-l-4 border-border pl-4 italic">
            {excerpt}
          </p>
        )}

        {coverSrc && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
            <Image
              src={coverSrc}
              alt={title || "Cover image"}
              fill
              className="object-cover"
              unoptimized={coverImage instanceof File}
            />
          </div>
        )}
      </header>

      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html:
            content ||
            "<p class='text-muted-foreground'>Nothing written yet…</p>",
        }}
      />
    </article>
  );
}
