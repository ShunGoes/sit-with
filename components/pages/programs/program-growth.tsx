"use client";

import { Pill } from "@/components/ui/pill";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetPrograms } from "@/lib/api/hooks/programs/programs.hooks";
import QueryStateHandler from "@/components/query-state-handler";
import { Badge } from "@/components/ui/badge";

export default function ProgramGrowth() {
  const { data: programs, isLoading, isError, isFetching } = useGetPrograms();

  let typeVariant;

  function variantAssigner(type: "LEADERS" | "PROFESSIONALS" | "STUDENTS") {
    switch (type) {
      case "LEADERS":
        return (typeVariant = "warning");
      case "PROFESSIONALS":
        return (typeVariant = "hibiscus");
      case "STUDENTS":
        return (typeVariant = "success");
      default:
        return (typeVariant = "default");
    }
  }

  // const containerVariants = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.12,
  //       delayChildren: 0.05,
  //     },
  //   },
  // } as const;

  // const cardVariants = {
  //   hidden: { opacity: 0, y: 24, scale: 0.98 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     scale: 1,
  //     transition: { duration: 0.4, ease: "easeOut" },
  //   },
  // } as const;

  return (
    <section
      id="program-growth"
      className="container mx-auto py-10 lg:py-24 flex flex-col  items-center justify-between gap-10 "
    >
      {/* Left Content */}
      <div className="flex-1  max-w-xl">
        <div className="flex justify-center ">
          <Pill text="Our Programs" />
        </div>
        <h2 className="heading-2  font-normal text-center ">
          Structured Growth Programmes
        </h2>
      </div>

      {/* Grid */}
      <QueryStateHandler
        data={programs?.data}
        isLoading={isLoading}
        isError={isError}
        loadingMessage="Loading Programs"
        fetchingMessage="Fetching Latest Programs"
        errorMessage="Error loading programs. Please try again"
        emptyMessage="No Programs at this time"
        isFetching={isFetching}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          className="w-full programs"
        >
          {programs?.data?.map(
            (program: Record<string, any>, index: number) => {
              const { title, description, thumbnail, id, category } =
                program || {};

              return (
                <SwiperSlide
                  key={id || index}
                  className=""
                >
                  {" "}
                  <div className="flex flex-col  h-full bg-[#F2F2F1] p-4 transition-shadow">
                    {/* Image Placeholder */}
                    <div className="w-full object-top lg:object-center  aspect-3/2 mb-3 overflow-hidden relative">
                      <Image
                        src={thumbnail ?? "/images/glimpse-2.png"}
                        alt={title || "Program"}
                        fill
                        className="object-cover"
                      />

                      {category && (
                        <Badge
                          variant={variantAssigner(category)}
                          className="absolute top-2 left-2 "
                        >
                          {category}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-[#627B3A] mb-2">
                      {title}
                    </h3>
                    <p className="text-base text-[#263016] leading-[30px] mb-6 ">
                      {description}
                    </p>

                    {/* Link */}
                    <Link href={program?.link ?? ""} className="w-full mt-auto">
                      <Button
                        variant={"outline"}
                        className="border border-[#B1B4B1] text-regular text-[#072608] text-base w-full"
                      >
                        View Program
                      </Button>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            },
          )}
        </Swiper>
      </QueryStateHandler>
      {/* make pagination dots white */}
      {/* <style jsx global>{`
         programs .swiper-pagination-bullet {
          background: black !important;
          opacity: 1 !important;
          width: 0.75rem !important;
          height: 0.75rem !important;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff !important;
          width: 2rem !important;
          border-radius: 1rem !important;
        }
      `}</style> */}
    </section>
  );
}
