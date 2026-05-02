"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
 
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePrev = () => {
    if (!isFirstPage) navigateToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLastPage) navigateToPage(currentPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center gap-4 justify-between px-2 py-4">
      <p className="text-sm text-primary-text font-medium">
        Page {currentPage} <span className="font-normal"> of </span>{" "}
        {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={isFirstPage}
          className="border-regular-button text-regular-button disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={isLastPage}
          className="border-regular-button text-regular-button disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
