import { BlogClient } from "@/components/pages/blog/blog-client";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wellness & Therapeutic Insights Blog",
  description:
    "Discover expert tips on mental wellbeing, therapeutic presence, and emotional transformation in the Sit-With-PD blog.",
};

export default async function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
