"use client";

import React, { useEffect, useState } from "react";

import FilterSelectComp from "@/components/filter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InputProps {
  filteredItem: string;
  setFilteredItem: React.Dispatch<React.SetStateAction<string>>;
  options: { label: string; value: string }[];
  filterPplaceholder?: string;
  searchPlaceholder?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export default function SeacrchAndFilter({
  filteredItem,
  setFilteredItem,
  options,
  search,
  setSearch,
  filterPplaceholder = "Filter",
  searchPlaceholder = "search...",
}: InputProps) {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce the local input and update the parent state
  useEffect(() => {
    const interval = setTimeout(() => {
      setSearch(localSearch);
    }, 500);

    return () => clearTimeout(interval);
  }, [localSearch, setSearch]);

  // Sync local state if the parent resets the search filter externally
  useEffect(() => {
    if (search === "") {
      setLocalSearch("");
    }
  }, [search]);

  return (
    <div className="flex items-center  gap-10 justify-between">
      <div className="relative max-w-[350px] w-full  ">
        <Input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 shadow-none h-[40px] rounded-[6px] placeholer:text-[0.77375rem] bg-white border border-[#D0D5DD] placeholder:text-[#667085] font-normal text-primary-text text-[0.9375rem] "
        />
        <Search
          color="#667085"
          size={20}
          className="absolute -translate-y-1/2 top-1/2 ml-3"
        />
      </div>
      <div>
        <FilterSelectComp
          value={filteredItem}
          onValueChange={setFilteredItem}
          options={options}
          placeholder={filterPplaceholder}
        />
      </div>
    </div>
  );
}
