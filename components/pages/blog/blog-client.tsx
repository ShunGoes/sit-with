"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useGetPublicBlogs } from "@/lib/api/hooks/blog/blog.hooks";
import { Spinner } from "@/components/spinner";
import QueryStateHandler from "@/components/query-state-handler";
import SearchInput from "@/components/searchInput";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSelectComp from "@/components/filter";

const CATEGORIES = ["All", "WELLBEING", "REFLECTION", "PERSONAL_GROWTH"];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  WELLBEING: "Wellbeing",
  REFLECTION: "Reflection",
  PERSONAL_GROWTH: "Personal Growth",
};

const CATEGORY_OPTIONS = CATEGORIES.map((cat) => ({
  label: CATEGORY_LABELS[cat] || cat,
  value: cat === "All" ? "all" : cat,
}));

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search");
  const categoryParams = searchParams.get("category");

  const params = {
    search,
    ...(categoryParams && categoryParams !== "all" && { category: categoryParams }),
  };

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError,
    isFetching,
  } = useGetPublicBlogs(params);

  const activeCategory = categoryParams || "All";

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue === "All" || newValue === "all") {
      params.delete("category");
    } else {
      params.set("category", newValue);
    }
    router.push(`?${params.toString()}`);
  };

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
        <div className="flex w-full items-center justify-between gap-x-4 md:gap-x-7 mb-12">
          {/* Category Filters (Mobile) */}
          <div className="md:hidden flex-shrink-0">
             <FilterSelectComp
               options={CATEGORY_OPTIONS}
               placeholder="Category"
               paramKey="category"
             />
          </div>

          {/* Category Filters (Desktop) */}
          <div className="hidden md:flex flex-1 items-center gap-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  onClick={() => {
                    handleChange(category);
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

          <div className="flex-1 md:flex-none">
            <SearchInput placeholder="Search blogs..." className="w-full border-regular-button border" />
          </div>
        </div>

        {/* Blog Grid */}
        <QueryStateHandler
          key={`${search}-${categoryParams}`}
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
