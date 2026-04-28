"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce"; // your existing debounce hook
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchInput({
  placeholder = "Search...",
  className = ""
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
    <div className="relative max-w-[350px] w-full  ">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "pl-10 shadow-none h-[40px] rounded-[6px] placeholder:text-[0.77375rem] bg-dash-secondary-bg border border-[#D0D5DD] dark:border-none placeholder:text-[#667085] font-normal text-primary-text text-[0.9375rem]",
          className
        )}
      />
      <Search
        color="#667085"
        size={20}
        className="absolute -translate-y-1/2 top-1/2 ml-3"
      />
    </div>
  );
}
