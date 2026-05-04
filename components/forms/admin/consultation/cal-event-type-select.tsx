"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCalEventTypes } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import { Loader2 } from "lucide-react";

interface CalEventTypeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function CalEventTypeSelect({
  value,
  onChange,
}: CalEventTypeSelectProps) {
  const { data, isLoading, isError } = useGetCalEventTypes();

  const options = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((event) => ({
      value: event.calBookingUrl,
      label: event.title,
    }));
  }, [data]);

  return (
    <Select value={value} onValueChange={onChange} disabled={isLoading}>
      <SelectTrigger className="bg-white dark:bg-transparent  border-[0.75px] border-[#EAECF0] rounded-[5px] w-full text-[12px] font-medium text-primary-text h-[54px] focus-visible:ring-0">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-regular-button" />
            <span>Loading events...</span>
          </div>
        ) : (
          <SelectValue placeholder="Select event type" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isError && (
            <div className="p-2 text-xs text-red-500">Failed to load events</div>
          )}
          {options.length === 0 && !isLoading && !isError && (
            <div className="p-2 text-xs text-secondary-text text-center">
              No event types found
            </div>
          )}
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
