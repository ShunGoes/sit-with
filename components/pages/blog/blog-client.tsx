"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useGetPublicBlogs } from "@/lib/api/hooks/blog/blog.hooks";
import { Spinner } from "@/components/spinner";
import QueryStateHandler from "@/components/query-state-handler";

const CATEGORIES = ["All", "WELLBEING", "REFLECTION", "PERSONAL_GROWTH"];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  WELLBEING: "Wellbeing",
  REFLECTION: "Reflection",
  PERSONAL_GROWTH: "Personal Growth",
};

interface BlogClientProps {
  blogs: Array<{
    id: string;
    title: string;
    slug: string;
    readTime: string;
    snippet: string;
    category: string;
    coverImageUrl?: string;
  }>;
}

export function BlogClient() {
  const [category, setCategory] = useState<string | undefined>(undefined);

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError,
    isFetching,
  } = useGetPublicBlogs({
    category: category !== "All" ? category : undefined,
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const blogsList = blogs?.data || [];

  return (
    <div className="w-full">
      {/* Hero Section */}

      <div className="relative w-full min-h-[40svh] lg:min-h-[60dvh] flex items-center justify-center  py-24">
        <Image
          src={"/images/blog-hero.png"}
          alt={"Camp page background image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="w-full  flex relative items-center justify-center">
          <h1 className="text-[#F9FDF9] font-semibold  text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] lg:text-center">
            Blog
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-8 pt-12 pb-30 max-w-[1200px] ">
        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCategory(category);
                }}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm md:text-base cursor-pointer transition-all ${
                  isActive
                    ? "bg-regular-button text-white "
                    : "bg-transparent text-regular-button border border-regular-button hover:border-[#60935D]"
                }
                ${
                  activeCategory === "All"
                    ? "p-3 h-10 rounded-full flex items-center justify-center"
                    : ""
                }
                
                `}
              >
                {CATEGORY_LABELS[category] || category}
              </button>
            );
          })}
        </div>

        {/* Blog Grid */}
        <QueryStateHandler
          data={blogsList}
          isLoading={isLoadingBlogs}
          isError={isError}
          isFetching={isFetching}
          fetchingMessage="Fetching blogs..."
          loadingMessage="Loading Blogs..."
          errorMessage="Error loading blogs..."
          emptyMessage="No blogs found."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {blogsList.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="flex flex-col group max-w-[500px] mx-auto w-full"
              >
                {/* Image */}
                <div className="w-full aspect-video bg-[#DEE5DF] rounded-t-sm  mb-5 overflow-hidden relative">
                  {blog.coverImageUrl ? (
                    <Image
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 rounded-t-sm transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Read time badge */}
                <div className="mb-3">
                  <span className="inline-block bg-[#60935D33] text-[#213A1F] px-3 py-1 rounded-full text-xs font-medium">
                    {blog?.readTimeMinutes}
                    {blog?.readTimeMinutes > 1 ? " mins" : " min"} read
                  </span>
                </div>

                <h2 className="text-[#242424] text-lg font-medium leading-[30px] mb-1 group-hover:text-[#649351] transition-colors">
                  {blog?.title}
                </h2>

                <p className="text-[#242424] text-sm leading-[30px] line-clamp-3 mb-5 flex-1">
                  {blog?.excerpt}
                </p>

                <div className="mt-auto">
                  <span className="text-[#242424] text-lg font-medium border-b border-[#242424] pb-0.5 group-hover:text-[#649351] group-hover:border-[#649351] transition-colors">
                    Read more
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </QueryStateHandler>
      </section>
    </div>
  );
}
