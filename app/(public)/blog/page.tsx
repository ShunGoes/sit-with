import { mockBlogs } from "@/lib/mock-data/blogs";
import { BlogClient } from "@/components/pages/blog/blog-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness & Therapeutic Insights Blog",
  description:
    "Discover expert tips on mental wellbeing, therapeutic presence, and emotional transformation in the Sit-With-PD blog.",
};

export default function BlogPage() {
  return <BlogClient blogs={mockBlogs} />;
}
