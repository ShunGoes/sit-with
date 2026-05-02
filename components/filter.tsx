import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterIcon from "@/pd-icons/filter";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterSelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
  paramKey: string;
}
export default function FilterSelectComp({
  options,
  placeholder = "All group",
  icon = <FilterIcon />,
  paramKey,
}: FilterSelectProps) {
  const isMobile = useIsMobile();

  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get(paramKey) ?? "";

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, newValue);
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className=" bg-dash-secondary-bg  dark:border-none text-primary-text flex items-center w-fit gap-2 ">
        {icon}
        {!isMobile && (
          <SelectValue
            placeholder={placeholder}
            className="placeholder:text-primary-text placeholder:text-base "
          />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item, index) => (
            <SelectItem key={`${item.value}_${index}`} value={item.value}>
              {item.label}{" "}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
