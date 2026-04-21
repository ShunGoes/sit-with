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
      avatar: "/images/testimonials/ada.png",
    },
    {
      quote:
        "Having someone genuinely listen and guide me through my thoughts made a huge difference. Each session felt safe and intentional, and I always left with a clearer mind and a sense of direction I didn't have before.",
      name: "James",
      role: "Consultation Client",
      avatar: "/images/testimonials/james.png",
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
        "The camp gave me a kind of calm I hadn't experienced in a long time. Being in such a peaceful environment, away from daily pressure, allowed me to slow down, reflect deeply, and reconnect with myself in a way that felt natural and unforced.",
      name: "Ifeoma",
      role: "Camp participant",
      avatar: "/images/testimonials/ifeoma.png",
    },
    {
      quote:
        "I didn't expect to open up the way I did, but the environment felt safe and welcoming from the start. The conversations, the quiet moments, and the shared experiences helped me gain clarity and feel more grounded than I have in a while.",
      name: "David",
      role: "Camp attendee",
      avatar: "/images/testimonials/david.png",
    },
    {
      quote:
        "Everything about the experience was intentional and well thought out. From the sessions to the atmosphere, it created space for real reflection and growth, and I left feeling lighter, more aware, and better equipped to move forward.",
      name: "Zainab",
      role: "Camp participant",
      avatar: "/images/testimonials/zainab.png",
    },
  ];

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
                    src={t.avatar}
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
