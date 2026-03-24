"use client";

import { Pill } from "@/components/ui/pill";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The program gave me structure and clarity at a time I felt completely stuck. The lessons were simple to follow, yet deeply impactful, and I found myself applying them to my daily life almost immediately. It truly changed how I approach my wellbeing.",
      name: "Ada",
      role: "Program Participant",
      avatar: "https://i.pravatar.cc/150?u=ada",
    },
    {
      quote:
        "Having someone genuinely listen and guide me through my thoughts made a huge difference. Each session felt safe and intentional, and I always left with a clearer mind and a sense of direction I didn't have before.",
      name: "James",
      role: "Consultation Client",
      avatar: "https://i.pravatar.cc/150?u=james",
    },
    {
      quote:
        "The camp was a refreshing experience I didn't know I needed. Being in a calm environment with others on a similar journey helped me open up and reflect in ways I hadn't before. It felt safe, peaceful, and truly transformative.",
      name: "Sharon",
      role: "Camp Attendee",
      avatar: "https://i.pravatar.cc/150?u=sharon",
    },
    {
      quote:
        "Joining the community was the best decision I made this year. I've found so much support and growth here. Highly recommended for anyone seeking true transformation.",
      name: "Michael",
      role: "Community Member",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-8 py-24 flex flex-col items-center overflow-hidden">
      <Pill text="Testimonial" />

      <h2 className="heading-2 text-center  mb-16  max-w-[900px]">
        Real experiences from people we've supported, stories of growth, healing
        and meaningful changes.
      </h2>

      <div className="w-full">
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
              <div className="flex flex-col bg-white rounded-[16px] p-8 border border-[#EEF2F6] shadow-[0px_12px_16px_-4px_#10182814,0px_4px_0px_-2px_#10182808] h-full min-h-[300px]">
                <p className="text-[#697586] text-[18px] leading-[28px] mb-8 flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-[48px] h-[48px] rounded-full object-cover bg-gray-100"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#202939] text-[16px]">
                      {t.name}
                    </span>
                    <span className="text-[#697586] text-[16px]">{t.role}</span>
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
