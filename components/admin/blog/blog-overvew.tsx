"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import { BLOG_LIST_DATA } from "@/data/table-data";
import { FileText, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import GreenEditIcon from "@/pd-icons/green-edit";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = [
  {
    label: "Published",
    value: "published",
  },
  {
    label: "Draft",
    value: "draft",
  },
];

export default function BlogOverview() {
  const [filteredItem, setFilteredItem] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center">
        <DashboardHeaderText
          header="Blogs"
          subtext="Manage and track all blog content"
        />
        {/* @ts-ignore */}
        <Button variant="regular" className="font-normal" asChild>
          <Link href="/admin/blog/add">
             Add New Blog
          </Link>
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
          {BLOG_LIST_DATA.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white dark:bg-dash-secondary-bg p-6 rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] border border-[#EAECF0] dark:border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-[12px] bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] flex items-center justify-center shrink-0">
                  <FileText size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[1.1rem] font-semibold text-[#101828] dark:text-[#F7F7F7]">{blog.title}</h3>
                  <p className="text-sm text-[#475467] dark:text-[#A1A1A1] max-w-2xl">{blog.excerpt}</p>
                  <p className="text-xs text-[#98A2B3] font-medium pt-2">
                    {blog.author} · {blog.date}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-6 shrink-0 w-full md:w-auto md:h-[6rem] justify-between">
                <div className="flex items-center gap-2">
                  {blog.status === "Published" ? (
                    <span className="px-3 py-1 bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] text-xs font-medium rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-[#F2F4F7] dark:bg-gray-800 text-[#344054] dark:text-gray-300 text-xs font-medium rounded-full">
                      Draft
                    </span>
                  )}
                  <span className="px-3 py-1 bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] text-xs font-medium rounded-full">
                    {blog.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-auto self-end md:self-auto">
                    <GreenEditIcon color="#98A2B3" />
                    <Trash2 color="#98A2B3" className="w-[1.2rem] h-[1.2rem]" />
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-4 pt-2">
            <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] dark:border-gray-700 rounded-md text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] dark:border-gray-700 rounded-md text-[#344054] dark:text-gray-200 bg-white dark:bg-gray-800 font-medium text-xs">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <ChevronRight size={16} />
            </button>
            <span className="text-xs text-[#344054] dark:text-gray-400 font-medium ml-2">
              1 Page
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
