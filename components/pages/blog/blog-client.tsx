"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/mock-data/blogs";

interface BlogClientProps {
  blogs: Array<{
    id: string;
    title: string;
    slug: string;
    readTime: string;
    snippet: string;
    category: string;
  }>;
}

export function BlogClient({ blogs }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Hero Section */}
      <section className="w-full h-[260px] md:h-[340px] bg-linear-to-r from-[#5B6361] to-[#8C9C84] flex items-center justify-center">
        <h1 className="text-white text-5xl md:text-[64px] font-medium tracking-tight">
          Blog
        </h1>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-8 py-12 max-w-[1200px]">
        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm md:text-base cursor-pointer transition-all ${
                  isActive
                    ? "bg-[#649351] text-white border-2 border-[#649351]"
                    : "bg-transparent text-[#649351] border-2 border-[#649351]/40 hover:border-[#649351]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filteredBlogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="flex flex-col group"
            >
              {/* Image */}
              <div className="w-full aspect-4/3 bg-[#DEE5DF] rounded-sm mb-5 overflow-hidden" />

              {/* Read time badge */}
              <div className="mb-3">
                <span className="inline-block bg-[#E5ECE3] text-[#476C3B] px-3 py-1 rounded-full text-xs font-medium">
                  {blog.readTime}
                </span>
              </div>

              <h2 className="text-[#242424] text-[20px] font-medium leading-[1.3] mb-2 group-hover:text-[#649351] transition-colors">
                {blog.title}
              </h2>

              <p className="text-[#595959] text-[15px] leading-relaxed line-clamp-3 mb-5 flex-1">
                {blog.snippet}
              </p>

              <div className="mt-auto">
                <span className="text-[#242424] text-[15px] font-medium border-b border-[#242424] pb-0.5 group-hover:text-[#649351] group-hover:border-[#649351] transition-colors">
                  Read more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
