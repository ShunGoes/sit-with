"use client";

import { motion } from "motion/react";
import { Pill } from "@/components/ui/pill";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProgramOverview() {
  const programs = [
    {
      title: "Presence Foundations",
      description:
        "Our entry-level program focused on developing basic awareness and emotional regulation techniques for daily life.",
      image: "/images/help-1.png",
      link: "#",
    },
    {
      title: "Emotional Intelligence",
      description:
        "Deepen your understanding of your emotional landscape and build resilience through guided sessions and practical exercises.",
      image: "/images/help-2.png",
      link: "#",
    },
    {
      title: "Mindful Leadership",
      description:
        "Learn to lead with presence, empathy, and clarity. This program is designed for professionals and teams seeking growth.",
      image: "/images/help-3.png",
      link: "#",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <section className="py-20 lg:py-30 flex flex-col items-center">
      <Pill text="Our Guided Programs" />
      
      <h2 className="text-center heading-2 mb-12 lg:mb-18 max-w-200">
        Explore our structured journeys designed to help you reconnect with yourself and your emotions.
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {programs.map((program, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="flex flex-col bg-white rounded-[1.25rem] border border-[#EEEEEE] overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-60 w-full bg-muted">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-[1.25rem] font-medium text-[#242424] mb-3">
                {program.title}
              </h3>
              <p className="text-[1rem] text-[#4F4F4F] leading-relaxed mb-6 flex-1">
                {program.description}
              </p>
              <Link
                href={program.link}
                className="inline-flex items-center text-brand-green font-semibold text-[0.875rem] group"
              >
                Learn More
                <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
