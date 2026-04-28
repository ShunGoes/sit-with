import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailsSkeleton() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* ── Main Content Column ── */}
          <article className="flex-1 min-w-0">
            {/* Featured image skeleton */}
            <Skeleton className="w-full aspect-video rounded-sm mb-6" />

            {/* Title & meta skeleton */}
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="mb-8 flex items-center gap-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>

            {/* Content body skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
              <div className="pt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-9/12" />
            </div>
          </article>

          {/* ── Sidebar Column ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-10">
            {/* CTA Box skeleton */}
            <Skeleton className="h-[180px] w-full rounded-2xl" />

            {/* Follow Us skeleton */}
            <div>
              <Skeleton className="h-6 w-32 mb-5" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            {/* More Tips skeleton */}
            <div>
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="w-full aspect-video rounded-sm" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
