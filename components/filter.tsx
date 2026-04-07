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

interface FilterSelectProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  placeholder?: string;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
}
export default function FilterSelectComp({
  options,
  value,
  onValueChange,
  placeholder = "All group"
}: FilterSelectProps) {
  const isMobile = useIsMobile()

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className=" bg-white flex items-center gap-2 ">
        <FilterIcon />
        {
          !isMobile && (
            <SelectValue
              placeholder={placeholder}
              className="placeholder:text-primary-text placeholder:text-base "
            />

          )
        }
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
