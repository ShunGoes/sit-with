"use client"

import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function Hero() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bg-[url('/images/homepage-bg.png')] bg-cover bg-[70%_center] lg:bg-center bg-no-repeat min-h-dvh h-dvh w-full flex items-center justify-center md:grid md:grid-cols-3 py-24">
            <div className="h-full md:col-span-2 lg:col-span-1 mx-auto px-6 md:px-15 lg:px-20 flex flex-col gap-6 justify-center items-center">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05]">
                  Presence Changes Everything
                </h1>
                <p className="lg:text-[1.25rem] text-base text-[#F7FBF6] sm:text-center  md:text-start sm:mx-auto sm:w-10/12 md:w-full">
                  Join a global therapeutic network dedicated to presence-based
                  healing, personal development, and emotional transformation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-start sm:justify-center md:justify-start w-full gap-4 mt-4">
                <Button variant={"regular"}>
                  Explore Programs <CaretRight />
                </Button>
                <Button variant={"outline"}>Book Consultation</Button>
              </div>
            </div>
            <div className="col-span-1 h-full" />
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="bg-[url('/images/guided-programs.png')]  bg-cover bg-[70%_center] lg:bg-center bg-no-repeat min-h-dvh h-dvh w-full flex items-center justify-center md:grid md:grid-cols-3 py-24">
            <div className="h-full md:col-span-2 lg:col-span-1 mx-auto px-6 md:px-15 lg:px-20 flex flex-col gap-6 justify-center items-center">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05]">
                  Presence Changes Everything
                </h1>
                <p className="lg:text-[1.25rem] text-base text-[#F7FBF6] sm:text-center md:text-start sm:mx-auto sm:w-10/12 md:w-full">
                  Join a global therapeutic network dedicated to presence-based
                  healing, personal development, and emotional transformation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-start sm:justify-center md:justify-start w-full gap-4 mt-4">
                <Button variant={"regular"}>
                  Explore Programs <CaretRight />
                </Button>
                <Button variant={"outline"}>Book Consultation</Button>
              </div>
            </div>
            <div className="col-span-1 h-full" />
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="bg-[url('/images/camp-hero.png')]  bg-cover bg-[70%_center] lg:bg-center bg-no-repeat min-h-dvh h-dvh w-full flex items-center justify-center md:grid md:grid-cols-3 py-24">
            <div className="h-full md:col-span-2 lg:col-span-1 mx-auto px-6 md:px-15 lg:px-20 flex flex-col gap-6 justify-center items-center">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05]">
                  Presence Changes Everything
                </h1>
                <p className="lg:text-[1.25rem] text-base text-[#F7FBF6] sm:text-center sm:mx-auto md:text-start sm:w-10/12 md:w-full">
                  Join a global therapeutic network dedicated to presence-based
                  healing, personal development, and emotional transformation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-start sm:justify-center md:justify-start w-full gap-4 mt-4">
                <Button variant={"regular"}>
                  Explore Programs <CaretRight />
                </Button>
                <Button variant={"outline"}>Book Consultation</Button>
              </div>
            </div>
            <div className="col-span-1 h-full" />
          </div>
        </SwiperSlide>




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
  );
}
