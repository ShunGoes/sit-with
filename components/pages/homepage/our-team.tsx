"use client";

import { Pill } from "@/components/ui/pill";
import { motion } from "motion/react";
import Image from "next/image";

export function OurTeam() {
  const team = [
    {
      name: "Oluwatosin SAM-ABEREOLA(PD)..",
      role: "Founder & CEO",
      image: "/images/team-1.png"
    },
    {
      name: "Oluwafunmike SAM-ABEREOLA",
      role: "Co-Founder/CFO",
      image: "/images/team-2.png"
    },
    {
      name: "Temitope BAMIDELE.",
      role: "Public Relation/CTO",
      image: "/images/team-3.png"
    },
    {
      name: "Clementina B. ADETOYE",
      role: "Camp Director/COO",
      image: "/images/team-4.png"
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
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
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="container mx-auto pt-24 lg:py-24 flex flex-col items-center">
      <Pill text="Our Team" />

      <h2 className="heading-2 text-center  mb-16 max-w-[900px]">
        A dedicated team, committed to your well-being, here to guide support
        and walk the journey with you.
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="flex flex-col "
          >
            <div className="w-full aspect-4/5 mb-6 relative overflow-hidden bg-transparent">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top sm:object-center"
              />
            </div>
            <div className="space-y-1 px-2">
              <p className="text-base font-semibold text-[#181D27] ">
              {member.name}
            </p>
            <p className="text-[#649351] text-lg lg:text-base xl:text-lg font-normal mb-2">
              {member.role}
            </p>
            </div>
            {/* <p className="text-base text-[#535862] leading-relaxed lg:leading-tight  xl:leading-[1.675rem]">
              {member.description}
            </p> */}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
