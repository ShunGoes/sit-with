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

const LIMIT = 3;

// const testimonies = [
//   {
//     "name": "Marcus Owens",
//     "role": "Weekend Hiker",
//     "testimony": "This app completely changed how I plan my camping trips. Finding campsites and checking trail conditions has never been easier!"
//   },
//   {
//     "name": "Priya Nair",
//     "role": "Solo Backpacker",
//     "testimony": "As someone who travels alone, the safety check-in feature gives me and my family so much peace of mind. Absolute game changer."
//   },
//   {
//     "name": "James Kowalski",
//     "role": "Family Camper",
//     "testimony": "Planning a trip for five kids used to be a nightmare. Now I can filter sites by amenities and book everything in one place. Love it!"
//   },
//   {
//     "name": "Aisha Bello",
//     "role": "Nature Photographer",
//     "testimony": "The sunrise and weather forecasting tools help me plan the perfect shoots. I've captured some of my best work thanks to this app."
//   },
//   {
//     "name": "Derek Huang",
//     "role": "Ultralight Camper",
//     "testimony": "The gear checklist feature is incredibly detailed. I've cut my pack weight by 30% just by following the app's recommendations."
//   },
//   {
//     "name": "Sofia Mendes",
//     "role": "First-Time Camper",
//     "testimony": "I was terrified to camp for the first time, but the beginner guides in this app walked me through everything. My first trip was amazing!"
//   },
//   {
//     "name": "Tom Braswell",
//     "role": "Overlander",
//     "testimony": "Offline maps and route planning for remote 4x4 tracks — this is the only app I trust when I'm miles from cell service."
//   },
//   {
//     "name": "Lena Fischer",
//     "role": "Trail Runner",
//     "testimony": "Quick, accurate elevation profiles and real-time trail condition updates. It's my go-to before every long run in the backcountry."
//   }
// ]

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
        <div className="flex items-center w-full justify-between gap-4">
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

          <Pagination totalPages={testimonialsResponse?.meta?.totalPages ?? 1} />
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

          
        </div>
      </div>
    </div>
  );
}
