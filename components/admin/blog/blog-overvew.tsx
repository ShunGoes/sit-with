"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import { Plus, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import BlogContent from "./blog-content";
import { handleAddBlog } from "@/components/modal-helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetAdminBlogs } from "@/lib/api/hooks/admin/blog.hooks";
import FilterSelectComp from "@/components/filter";

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
    label: "All Categories",
    value: "all",
  },
];

export default function BlogOverview() {
  const [filteredItem, setFilteredItem] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const isMobile = useIsMobile();

  const params = {
    category: category !== "all" ? category : undefined,
    status: filteredItem !== "all" ? filteredItem : undefined,
  }
  const { data: blogsResponse, isLoading, error } = useGetAdminBlogs(params);

  const filteredBlogs = useMemo(() => {
    if (!blogsResponse?.data) return [];

    return blogsResponse.data.filter((blog) => {
      const matchesStatus =
        filteredItem === "all" ||
        (filteredItem === "published" && blog.isPublished) ||
        (filteredItem === "draft" && !blog.isPublished);

      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        (blog.author || "").toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [blogsResponse, filteredItem, search]);

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
        {/* search and filter functionality */}
        <div className="flex items-center w-full border-4 gap-4">
          <div className="flex-1">
          <SeacrchAndFilter
            filterPplaceholder="Filter by status"
            searchPlaceholder="search by title or author...."
            options={STATUS_OPTIONS}
            filteredItem={filteredItem}
            setFilteredItem={setFilteredItem}
            search={search}
            setSearch={setSearch}
          />

          </div>
          <div className="w-auto">
            <FilterSelectComp
              value={category}
              onValueChange={setCategory}
              options={CATEGORY_OPTIONS}
              placeholder="Filter by category"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-secondary-text">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
              <p>Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-destructive/5 rounded-xl border border-destructive/20">
              <p className="text-destructive font-medium">
                Failed to load blogs
              </p>
              <p className="text-sm text-secondary-text mt-1">
                {error.message}
              </p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogContent key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="p-20 text-center bg-muted/20 rounded-xl border border-dashed border-border">
              <p className="text-secondary-text">No blog posts found</p>
            </div>
          )}

          {/* Pagination */}
        </div>
      </div>
    </div>
  );
}
