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
  icon?: React.ReactNode;
}
export default function FilterSelectComp({
  options,
  value,
  onValueChange,
  placeholder = "All group",
  icon = <FilterIcon />,
}: FilterSelectProps) {
  const isMobile = useIsMobile()

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className=" bg-dash-secondary-bg  dark:border-none text-primary-text flex items-center gap-2 ">
      {icon}
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
