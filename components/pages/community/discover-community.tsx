"use client";

import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { Users2 } from "lucide-react";
import Link from "next/link";

const COMMUNITIES = [
  {
    title: "Business & Leadership Learners",
    description:
      "For future entrepreneurs, marketers, and business strategists.",
    members: "4.2k",
    image: "/images/business.png",
  },
  {
    title: "Design & Creative Circle",
    description:
      "A space for UI/UX designers, illustrators, and visual storytellers.",
    members: "3.5k",
    image: "/images/design.png",
  },
  {
    title: "Web Developers Unite",
    description: "Frontend, backend, or full-stack — build better, together.",
    members: "5.1k",
    image: "/images/web.png",
  },
  {
    title: "Data & AI Explorers",
    description: "Dive into data science, machine learning, and AI innovation.",
    members: "2.8k",
    image: "/images/data.png",
  },
  {
    title: "Internship & Volunteer Hub",
    description:
      "Connect with opportunities to gain experience and make meaningful impact.",
    members: "6.3k",
    image: "/images/internship.png",
  },
  {
    title: "Leadership Circle",
    description:
      "Inspire, empower, and lead with purpose alongside committed leaders.",
    members: "3.9k",
    image: "/images/leadership.png",
  },
];

const WHATSAPP_LINK =
  "https://chat.whatsapp.com/BNby8Med1SmK1bX4YXLLuI?mode=gi_t";

export default function DiscoverCommunity() {
  return (
    <section className="py-20 w-full bg-[#F9FAFB]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-10">
          <Pill text="Our Community" className="mb-4" />
          <h2 className="heading-2 max-w-2xl mb-4">
            Discover Your Perfect Community
          </h2>
          <p className="text-lg text-[#667085] max-w-3xl">
            Connect with like-minded individuals in vibrant WhatsApp communities
            tailored to your interests, passions, and professional goals.
          </p>
        </div>

        <div className="w-full space-y-4 lg:w-10/12 mx-auto">
          {COMMUNITIES.map((community, index) => (
            <div
              key={index}
              className="bg-white border-[0.67px] border-[#EAECF0] rounded-[16px] p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md"
            >
              <div className="relative w-full md:w-[160px] h-[250px] lg:w-[120px] lg:h-[96px]  shrink-0 overflow-hidden rounded-[12px]">
                <Image
                  src={community.image}
                  alt={community.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="flex-1 text-center md:text-left space-y-1">
                <h3 className="text-xl font-semibold text-[#111827]">
                  {community.title}
                </h3>
                <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
                  {community.description}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#6B7280] text-sm">
                  <Users2 size={16} />
                  <span>{community.members} members</span>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link href={WHATSAPP_LINK} target="_blank">
                  <Button
                    variant="regular"
                    className="w-full md:w-auto px-8 py-3 "
                  >
                    Join Group
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
