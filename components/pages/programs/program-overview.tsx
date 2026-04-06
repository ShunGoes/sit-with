"use client";

import { Pill } from "@/components/ui/pill";
import { motion } from "motion/react";

export function ProgramOverview() {
  const cards = [
    {
      title: "Core Programs",
      value: "4"
    },
    {
      title: "Per Program",
      value: "3-5"
    },
    {
      title: "Self Spaced",
      value: "100%"
    },
    {
      title: " Participants Guided",
      value: "3,400+"
    },
  ];

  return (
    <section className="container mx-auto py-10 lg:py-24 flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-20 max-w-6xl">
      {/* Left Content */}
      <div className="flex-1  max-w-xl">
        <div className="flex justify-center lg:text-start xl:justify-start">
        <Pill text="What We Offer" />

        </div>
        <h2 className="heading-2 xl:leading-13.5 font-normal text-center xl:text-start ">
          Each program is thoughtfully structured to help you understand yourself better, build emotional awareness, and grow with clarity at your own pace. No overwhelm  just steady, guided progress.

        </h2>
      </div>

      {/* Right Content - Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1 rounded-[10px] border border-[#A8D675] bg-white p-6  "
          >
          <h2 className="font-semibold text-4xl text-[#242424]">{card.value}</h2>
            <h3 className="text-xl  text-[#606060]">
              {card.title}
            </h3>
           
          </motion.div>
        ))}
      </div>
    </section>
  );
}
