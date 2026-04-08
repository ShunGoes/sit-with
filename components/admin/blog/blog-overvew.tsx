"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import { BLOG_LIST_DATA } from "@/data/table-data";
import {
  Plus,
} from "lucide-react";
import  { useState } from "react";
import { Button } from "@/components/ui/button";
import BlogContent from "./blog-content";
import { handleAddBlog } from "@/components/modal-helper";
import { useIsMobile } from "@/hooks/use-mobile";

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

export default function BlogOverview() {
  const [filteredItem, setFilteredItem] = useState("all");
  const [search, setSearch] = useState("");

  const isMobile = useIsMobile()

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center">
        <DashboardHeaderText
          header="Blogs"
          subtext="Manage and track all blog content"
        />
        {/* @ts-ignore */}
        <Button
          variant="regular"
          className="font-normal"
          onClick={handleAddBlog}
        >
          <Plus/> {!isMobile && "New Post"} 
        </Button>
      </div>

      <div className="space-y-4">
        {/* search and filter functionality */}
        <SeacrchAndFilter
          filterPplaceholder="Filter by status"
          searchPlaceholder="search by title or author...."
          options={STATUS_OPTIONS}
          filteredItem={filteredItem}
          setFilteredItem={setFilteredItem}
          search={search}
          setSearch={setSearch}
        />

        <div className="flex flex-col gap-4">
          {BLOG_LIST_DATA.map((blog,index) => (
           <BlogContent key={`${blog.title}_${index}`} blog={blog} />
          ))}

          {/* Pagination */}
        
        </div>
      </div>
    </div>
  );
}
