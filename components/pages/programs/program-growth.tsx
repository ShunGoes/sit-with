"use client";

import { Pill } from "@/components/ui/pill";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetPrograms } from "@/lib/api/hooks/programs/programs.hooks";
import QueryStateHandler from "@/components/query-state-handler";

export default function ProgramGrowth() {
  const { data, isLoading, isError, isFetching } = useGetPrograms();

  const cards = [
    {
      title: "Transition  for Undergraduates",
      label: "For Students",
      labelBgColor: "bg-regular-button",
      description:
        "A presence-based programme supporting students navigating identity, pressure, and life transitions with clarity and emotional stability",
      link: "/programs",
      image: "/images/help-1.png",
    },
    {
      title: "Transition  for Undergraduates",
      label: "For Students",
      labelBgColor: "bg-regular-button",
      description:
        "A presence-based programme supporting students navigating identity, pressure, and life transitions with clarity and emotional stability",
      link: "/programs",
      image: "/images/help-1.png",
    },
    {
      title: "Transition  for Undergraduates",
      label: "For Students",
      labelBgColor: "bg-regular-button",
      description:
        "A presence-based programme supporting students navigating identity, pressure, and life transitions with clarity and emotional stability",
      link: "/programs",
      image: "/images/help-1.png",
    },
    {
      title: "Transition  for Undergraduates",
      label: "For Students",
      labelBgColor: "bg-regular-button",
      description:
        "A presence-based programme supporting students navigating identity, pressure, and life transitions with clarity and emotional stability",
      link: "/programs",
      image: "/images/help-1.png",
    },
    {
      title: "Marketplace Talents Programme",
      label: "For Professionals",
      labelBgColor: "bg-[#FA9874]",
      description:
        "A structured programme offering guided support, emotional awareness, and clarity in navigating work and personal growth",
      link: "/camps",
      image: "/images/help-2.png",
    },
    {
      title: "Global Stewardship Fellowship",
      label: "For Leaders",
      labelBgColor: "bg-[#3D89DF]",
      description:
        "A structured programme offering guided support, emotional awareness, and clarity in leadership and responsibility",
      link: "/consultation",
      image: "/images/help-3.png",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="container mx-auto py-10 lg:py-24 flex flex-col  items-center justify-between gap-10 ">
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
        data={data}
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
          {cards.map((card, index) => (
            <SwiperSlide
              key={`${card.title}_${index}`}
              className="h-full border border-black"
            >
              {" "}
              <div
                key={index}
                className="flex flex-col  h-full bg-[#F2F2F1] p-4 transition-shadow"
              >
                {/* Image Placeholder */}
                <div className="w-full  aspect-3/2 0  mb-6 overflow-hidden relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <p
                    className={`absolute top-2 left-2 text-white text-sm font-medim rounded-full py-[2px] px-4  flex justify-center items-center ${card.labelBgColor}`}
                  >
                    {card.label}
                  </p>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#627B3A] mb-2">
                  {card.title}
                </h3>
                <p className="text-base text-[#263016] leading- mb-6 ">
                  {card.description}
                </p>

                {/* Link */}
                <Link href={card.link} className="w-full mt-auto">
                  <Button
                    variant={"outline"}
                    className="border border-[#B1B4B1] text-regular text-[#072608] text-base w-full"
                  >
                    View Program
                  </Button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
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
