import * as React from "react";
import { cn } from "@/lib/utils";

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export function Pill({ text, className, ...props }: PillProps) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center justify-center border border-[#E8E8E8] rounded-full px-3 py-2.5 mb-6 text-sm text-black bg-white",
        className,
      )}
      {...props}
    >
      {text}
    </div>
  );
}
