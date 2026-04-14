"use client";

import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import Image from "next/image";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useMobile from "@/hooks/use-mobile-breakpoint";
import Link from "next/link";

export function ProgramHero() {
  const { isMobile } = useMobile();

  const slides = [
    {
      id: 1,
      imageSrc: "/images/programs-hero-1.png",
      alt: "Healing Through Presence",
      title: "Healing Through Presence",
      description:
        "Guided therapeutic journeys designed for deep healing, emotional clarity, and lasting personal transformation.",
      imageClass: "object-cover object-center",
      titleWidth: "w-full sm:w-[50%] md:w-[45%] lg:w-[55%]",
    },
    {
      id: 2,
      imageSrc: "/images/programs-hero-2.png",
      alt: "Structured Growth Roadmap",
      title: "Your Roadmap to Wellbeing",
      description:
        "Our structured programs offer a clear and supportive path for your mental and emotional growth, guided by experts.",
      imageClass: "object-cover object-center",
      titleWidth: "w-full sm:w-[60%] md:w-[50%] lg:w-[60%]",
    },
    {
      id: 3,
      imageSrc: "/images/programs-hero-3.png",
      alt: "Presence in Daily Life",
      title: "Presence in Every Step",
      description:
        "Learn to integrate powerful presence-based techniques into your daily routine with our immersive guided workshops.",
      imageClass: "object-cover object-center",
      titleWidth: "w-full sm:w-[70%] md:w-[55%] lg:w-[65%]",
    },
  ];

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full min-h-svh h-svh flex items-center justify-center">
                <Image
                  src={slide.imageSrc}
                  alt={slide.alt}
                  fill
                  className={slide.imageClass}
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative h-full w-[90%] mx-auto flex flex-col gap-6 justify-center items-center max-w-7xl">
                  <div className="space-y-4 text-center flex flex-col items-center">
                    <h1
                      className={`text-[#F9FDF9] font-medium text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[100%] max-w-4xl`}
                    >
                      {slide.title}
                    </h1>
                    <p className="text-[1.125rem] md:text-[1.25rem] text-[#F7FBF6] opacity-90 leading-relaxed max-w-135">
                      {slide.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4  justify-center">
                    <Button
                      variant="regular"
                      className=""
                      onClick={() =>
                        document
                          .getElementById("program-growth")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Browse Programs <CaretRight className="ml-2" />
                    </Button>
                    <Link href="/consultation">
                      <Button variant="outline">Book Consultation</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          width: 0.75rem !important;
          height: 0.75rem !important;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff !important;
          width: 2rem !important;
          border-radius: 1rem !important;
        }
      `}</style>
    </section>
  );
}
