"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce"; // your existing debounce hook
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchInput({
  placeholder = "Search...",
  className = "",
}: {
  placeholder?: string;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize input value from URL so it persists on refresh
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? "",
  );

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }

    // Reset to page 1 whenever search changes
    params.set("page", "1");

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedValue]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 max-w-[350px] w-full h-[40px] px-3 rounded-[6px] bg-dash-secondary-bg border border-[#D0D5DD] dark:border-none",
        className,
      )}
    >
      <Search color="#667085" size={18} className="shrink-0" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none border-none placeholder:text-[#667085] placeholder:text-[0.77375rem] font-normal text-primary-text text-[0.9375rem] text-sm"
      />
    </div>
  );
}
