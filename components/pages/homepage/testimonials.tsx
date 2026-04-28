"use client";

import { Pill } from "@/components/ui/pill";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useGetAllTestimonials } from "@/lib/api/hooks/testimonials/testimonials.hooks";
import CardSkeletons from "@/components/skeletons/card-skeletons";

export function Testimonials() {
  const { data, isLoading, error } = useGetAllTestimonials();

  const testimonials = data?.data ?? []

  if(isLoading) return <CardSkeletons />
  if(error) return <p className="text-center min-h-[40vh] flex items-center justify-center text-xl">Error fetching testimonials</p>
  if(data?.data?.length === 0) return <p className="text-center min-h-[40vh] flex items-center justify-center text-xl">No testimonials yet</p>

  return (
    <section className="container mx-auto px-4 md:px-8 pt-24 flex flex-col items-center overflow-hidden">
      <Pill text="Testimonial" />

      <h2 className="heading-2 text-center mb-5 lg:mb-16  max-w-[900px]">
        Real experiences from people we've supported, stories of growth, healing
        and meaningful changes.
      </h2>

      <div className="w-full  ">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="w-full pb-8!"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="flex flex-col bg-white rounded-[16px] p-8 border border-[#EEF2F6] shadow-[4px_4px_16px_-4px_#10182814,0px_4px_0px_-2px_#10182808] h-full min-h-[300px]">
                <p className="text-[#697586] text-lg leading-relaxed mb-8 flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={t.avatarUrl ?? "/images/testimonials/ada.png"}
                    alt={t.name}
                    className="w-[48px] h-[48px] rounded-full object-cover bg-gray-100"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#202939] text-base">
                      {t.name}
                    </span>
                    <span className="text-[#697586] text-base">{t.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
