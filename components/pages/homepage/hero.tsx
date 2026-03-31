"use client"

import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import Image from "next/image";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useMobile from "@/hooks/use-mobile";

export function Hero() {
  const { isMobile } = useMobile()

  const slides = [
    {
      id: 1,
      mobileSrc: "/images/home-hero-1.png",
      desktopSrc: "/images/homepage-bg.webp",
      alt: "Presence changes everything hero background",
      title: "Presence Changes Everything",
      description:
        "Join a global therapeutic network dedicated to presence-based healing, personal development, and emotional transformation.",
      imageClass: "object-cover object-[75%_center]  md:object-center ",
      titleWidth: "w-full sm:w-[40%] md:w-[40%] lg:w-[50%]"
    },
    {
      id: 2,
      mobileSrc: "/images/home-hero-2.png",
      desktopSrc: "/images/desktop-hero-2.png",
      alt: "Guided programs hero background",
      title: "Grow at Your Own Pace",
      description:
        "Take your time with structured guidance designed to support you gently through reflection, clarity, and personal growth.",
      imageClass: "object-cover object-[75%_center] md:object-center",
      titleWidth: "w-full sm:w-[70%] md:w-[45%] lg:w-[60%]"
    },
    {
      id: 3,
      mobileSrc: "/images/home-hero-3.png",
      desktopSrc: "/images/desktop-hero-3.png",
      alt: "Therapeutic camp hero background",
      title: "Build Awareness, One Step at a Time",
      description:
        "Develop simple, practical habits that help you better understand your thoughts, emotions, and daily responses.",
      imageClass: "object-cover  object-[75%_center] md:object-center",
      titleWidth: "w-full sm:w-[80%] md:w-[60%] lg:w-[70%]"
    },
  ]

  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {slides.map((slide) => {
          const src = isMobile ? slide.mobileSrc : slide.desktopSrc

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full min-h-dvh h-dvh flex items-center justify-center  py-24">
                <Image
                  src={src}
                  alt={slide.alt}
                  fill
                  className={slide.imageClass}
                  priority
                />
                {/* <div className="absolute inset-0 bg-black/25" /> */}
                <div className="relative h-full w-[90%] mx-auto  flex flex-col gap-6 justify-center items-start max-w-7xl">
                  <div className="space-y-4  ">
                    <h1 className={`text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] ${slide.titleWidth} `}>
                      {slide.title}
                    </h1>
                    <p className="lg:text-[1.25rem] text-xl text-[#F7FBF6]  md:text-start  sm:w-10/12 md:w-2/3 lg:w-[539px]">
                      {slide.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-start md:justify-start w-full gap-4 mt-4">
                    <Button variant={"regular"}>
                      Explore Programs <CaretRight />
                    </Button>
                    <Button variant={"outline"}>Book Consultation</Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* make pagination dots white */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.6) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff !important;
        }
      `}</style>
    </section>
  )
}
