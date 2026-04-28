"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialContent from "./testimonial-content";
import { handleAddTestimonial } from "@/components/modal-helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetAdminTestimonials } from "@/lib/api/hooks/testimonials/testimonials.hooks";
import FilterSelectComp from "@/components/filter";
import QueryStateHandler from "@/components/query-state-handler";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import { useGetCamps } from "@/lib/api/hooks/camps/camps.hooks";
import { useMemo } from "react";

const LIMIT = 20;

export default function TestimonialsOverview() {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const page = Number(searchParams.get("page") ?? 1);
  const campId = searchParams.get("campId") ?? "";

  const { data: campsData } = useGetCamps();
  
  const campOptions = useMemo(() => {
    const options = [{ label: "All Camps", value: "all" }];
    if (campsData?.data) {
      campsData.data.forEach((camp) => {
        options.push({ label: camp.title, value: camp.id });
      });
    }
    return options;
  }, [campsData]);

  const params = {
    page,
    limit: LIMIT,
    ...(campId !== "all" && campId !== "" && { campId }),
  };

  const {
    data: testimonialsResponse,
    isLoading,
    isError,
    isFetching,
    error,
  } = useGetAdminTestimonials(params);

  const testimonialsList = testimonialsResponse?.data || [];

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center">
        <DashboardHeaderText
          header="Testimonials"
          subtext="Manage platform testimonials"
        />
        <Button
          variant="regular"
          className="font-normal"
          onClick={handleAddTestimonial}
        >
          <Plus /> {!isMobile && "Add Testimonial"}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center w-full gap-4">
          <div className="w-auto flex items-center gap-3">
            {
              testimonialsList.length > 0 && (
                <FilterSelectComp
                  options={campOptions}
                  placeholder="All Camps"
                  paramKey="campId"
                />
              )
            }
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <QueryStateHandler
            key={`${page}-${campId}`}
            data={testimonialsList}
            isLoading={isLoading}
            isError={isError}
            loadingMessage="Loading testimonials"
            errorMessage="Testimonials failed to load"
            queryErrorMessage={error?.message}
            isFetching={isFetching}
            emptyMessage="No testimonials found"
          >
            {testimonialsList.map((testimonial) => (
              <TestimonialContent key={testimonial.id} testimonial={testimonial} />
            ))}
          </QueryStateHandler>

          <Pagination totalPages={testimonialsResponse?.meta?.totalPages ?? 1} />
        </div>
      </div>
    </div>
  );
}
