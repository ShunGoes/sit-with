

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import Image from "next/image";
import { motion } from "motion/react";

export function HowWeHelp() {
  const cards = [
    {
      title: "Guided Programs",
      description:
        "Structured sessions designed to support your wellbeing journey at your own pace.",
      link: "/programs",
      image: '/images/help-1.png'
    },
    {
      title: "Therapeutic Camps",
      description:
      "Take a break from the noise and focus fully on your healing and growth.",
      link: "/camps",
      image: '/images/help-2.png'
    },
    {
      title: "One-on-One Consultation",
      description:
      "Speak with a professional who understands and guides you personally.",
      link: "/consultation",
      image: '/images/help-3.png'
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="container mx-auto   pt-15 pb-20 flex flex-col items-center">
      {/* Badge */}
      <Pill text="How we can help" />

      {/* Heading */}
      <h2 className=" text-center heading-2 ">
        Find the support you need without feeling overwhelmed. <br className="sm:hidden md:block" /> Take simple
        steps toward a healthier, more balanced life
      </h2>

      {/* Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 xl:gap-8 w-full sm:w-8/12 md:w-full sm:mx-auto mt-10 max-w-6xl">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
            className="flex flex-col rounded-2xl border border-[#DEDEDE] bg-white p-4 lg:p-5 hover:shadow-[0px_2px_20px_rgba(0,0,0,0.08)] transition-shadow"
          >
            {/* Image Placeholder */}
            <div className="w-full  h-48 lg:h-40 xl:h-48 bg-gray-200 rounded-xl mb-6 overflow-hidden relative">
              <Image src={card.image} alt={card.title} fill className=""/>
            </div>

            {/* Content */}
            <h3 className="text-xl font-medium text-[#242424] mb-2">
              {card.title}
            </h3>
            <p className="text-[16px] text-black leading-relaxed mb-6 ">
              {card.description}
            </p>  

            {/* Link */}
            <Link
              href={card.link}
              className="flex items-center text-brand-green font-bold text-sm hover:underline mt-auto"
            >
              learn more <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
