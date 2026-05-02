"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import { Plus, Loader2, Globe, BookCheck } from "lucide-react";
import { useState, useMemo, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import BlogContent from "./blog-content";
import { handleAddBlog } from "@/components/modal-helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetAdminBlogs } from "@/lib/api/hooks/admin/blog.hooks";
import FilterSelectComp from "@/components/filter";
import QueryStateHandler from "@/components/query-state-handler";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/searchInput";
import { useSearchParams } from "next/navigation";
import CardSkeletons from "@/components/skeletons/card-skeletons";

const STATUS_OPTIONS = [
  {
    label: "Published",
    value: "published",
  },
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "All Status",
    value: "all",
  },
];
const CATEGORY_OPTIONS = [
  {
    label: "Wellbeing",
    value: "WELLBEING",
  },
  {
    label: "Reflection",
    value: "REFLECTION",
  },
  {
    label: "Personal Growth",
    value: "PERSONAL_GROWTH",
  },
  {
    label: "All ategories",
    value: "all",
  },
];
const LIMIT = 10;

export  function BlogOverview() {
  const searchParams = useSearchParams();

  //  extra all query params from the url
  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const category = searchParams.get("category") ?? "";

  const isMobile = useIsMobile();

  const params = {
    page,
    limit: LIMIT,
    ...(search !== "" && { search }),
    ...(status !== "" && { status }),
    ...(category !== "all" && { category }),
  };

  const {
    data: blogsResponse,
    isLoading,
    isError,
    isFetching,
    error,
  } = useGetAdminBlogs(params);

  const blogList = blogsResponse?.data || [];

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center">
        <DashboardHeaderText
          header="Blogs"
          subtext="Manage and track all blog content"
        />
        <Button
          variant="regular"
          className="font-normal"
          onClick={handleAddBlog}
        >
          <Plus /> {!isMobile && "New Post"}
        </Button>
      </div>

      <div className="space-y-4">
        {/* search and filter bar  */}
        <div className="flex items-center w-full gap-4">
          <div className="flex-1">
            <SearchInput />
          </div>

          <div className="w-auto flex items-center gap-3">
            <FilterSelectComp
              options={CATEGORY_OPTIONS}
              placeholder=" category"
              paramKey="category"
            />
            <FilterSelectComp
              options={STATUS_OPTIONS}
              placeholder=" status"
              paramKey="status"
              icon={<BookCheck className="text-primary-text" size={18} />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <QueryStateHandler
            key={`${page}-${search}-${status}-${category}`}
            data={blogList}
            isLoading={isLoading}
            isError={isError}
            loadingMessage="Loading your post(s)"
            errorMessage="Posts failed to load"
            queryErrorMessage={error?.message}
            isFetching={isFetching}
            emptyMessage="No blog posts found"
          >
            {blogList.map((blog) => (
              <BlogContent key={blog.id} blog={blog} />
            ))}
          </QueryStateHandler>

          {/* Pagination */}
          <Pagination totalPages={blogsResponse?.meta?.totalPages ?? 1} />
        </div>
      </div>
    </div>
  );
}


export default function BlogOverviewWrapper() {
    return (
        <Suspense fallback={<div>
          <CardSkeletons/>
        </div>}>
            <BlogOverview />
        </Suspense>
    );
}