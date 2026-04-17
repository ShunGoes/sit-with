"use client"; 

import { Pill } from "@/components/ui/pill";
import Image from "next/image";
import { motion } from "motion/react";

export function GlimpseGallery() {
  const images = [
    {
      src: "/images/glimpse-1.png", 
      title: "Group out-door",
      subtitle: "Spend time in a relaxed group setting where you can connect, share experiences, and feel supported in a calm and welcoming environment",
    },
    {
      src: "/images/glimpse-2.png",
      title: "Journaling",
      subtitle: "Take quiet moments to reflect through guided journaling, helping you process thoughts and gain clarity at your own pace.",
    },
    {
      src: "/images/glimpse-3.png",
      title: "Walking in Nature",
      subtitle: "Enjoy slow, mindful walks in a serene environment designed to help you reset, breathe, and reconnect with yourself.",
    },
    {
      src: "/images/glimpse-4.png",
      title: "Calm Conversations",
      subtitle: "Engage in gentle, meaningful conversations that allow you to express yourself freely and feel heard without pressure.",
    },
  ];

  return (
    <section className="container mx-auto bg-[#F0F4F0] px-4 md:px-8 py-10 lg:py-24 flex flex-col items-center">
      <Pill text="Camp Experience" />
      <h2 className="heading-2 text-center mb-16">
        A Glimpse Into the Experience
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="group relative w-full h-92 rounded-[16px] overflow-hidden bg-gray-200 cursor-pointer"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 backdrop-blur-xs bg-black/10 left-0 right-0 p-4">
              <h3 className="text-[#EBF6DF] font-bold text-base mb-3 ">
                {img.title}
              </h3>
              <p className="text-[#E6F2D9] leading-4.5 text-sm">{img.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
