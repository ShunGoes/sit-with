"use client";

import { Pill } from "@/components/ui/pill";
import { motion } from "motion/react";

export function OurTeam() {
  const team = [
    {
      name: "Mr Sam.",
      role: "Founder & CEO",
      description:
        "Ac dignissim nunc quam turpis varius nulla. Id etiam consectetur tellus ac.",
    },
    {
      name: "Mr Sam",
      role: "Engineering Manager",
      description:
        "Ac dignissim nunc quam turpis varius nulla. Id etiam consectetur tellus ac.",
    },
    {
      name: "Mr Sam",
      role: "Product Manager",
      description:
        "Ac dignissim nunc quam turpis varius nulla. Id etiam consectetur tellus ac.",
    },
    {
      name: "Mr Sam",
      role: "Frontend Developer",
      description:
        "Ac dignissim nunc quam turpis varius nulla. Id etiam consectetur tellus ac.",
    },
  ];

  return (
    <section className="container mx-auto pt-24 lg:py-24 flex flex-col items-center">
      <Pill text="Our Team" />

      <h2 className="heading-2 text-center  mb-16 max-w-[900px]">
        A dedicated team, committed to your well-being, here to guide support
        and walk the journey with you.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col h-[296px] "
          >
            <div className="w-full aspect-[4/5] bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Image]
              </div>
            </div>
            <p className="text-base font-semibold text-[#181D27] mb-1">
              {member.name}
            </p>
            <p className="text-[#649351] text-lg lg:text-base xl:text-lg font-normal mb-2">
              {member.role}
            </p>
            {/* <p className="text-base text-[#535862] leading-relaxed lg:leading-tight  xl:leading-[1.675rem]">
              {member.description}
            </p> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
