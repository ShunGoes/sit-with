"use client";

import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const COMMUNITIES = [
  {
    title: "The Generalist Pathfinders",
    description:
      "This is a dynamic community of versatile thinkers and solution-driven individuals committed to exploring opportunities, inspiring innovation, and creating meaningful impact across diverse fields and industries.",
    image: "/images/business.png",
    link: "https://chat.whatsapp.com/LAOVNyQho0HKzPX8Vw6l9e?mode=gi_t"
  },
  {
    title: "The Impact Volunteers Network",
    description:
      "This is a purpose-driven community of passionate individuals dedicated to serving, empowering communities, and creating lasting positive change through meaningful volunteerism.",
    link: "https://chat.whatsapp.com/EBw3foMpCv76zGCSB6b3v8?mode=gi_t",
    image: "/images/design.png",
  },
  {
    title: "The Internship Knowledge Hub",
    description: "This is a growth-focused community designed to equip students and emerging professionals with practical insights, career guidance, and valuable internship opportunities for future success.",
    link: "https://chat.whatsapp.com/IFhNQtUjiQdHCubNPTycgI?mode=gi_t",
    image: "/images/web.png",
  },
  {
    title: "The Global Philantropy Partners Network",
    description: "This is a collaborative community of changemakers, donors, and mission-driven partners committed to advancing humanitarian impact and sustainable development worldwide.",
    link: "https://chat.whatsapp.com/HoKUdHMQ5CpHkTUSNBzm38?mode=gi_t",
    image: "/images/data.png",
  },
  {
    title: "Thrive Uniquely Mentorship Community.",
    description:
      "This is an empowering network dedicated to helping individuals discover purpose, build confidence, and grow into their unique potential through mentorship and personal development.",
    link: "https://chat.whatsapp.com/JbWQGJkawUnFmjtx2FYMdQ?mode=gi_t",
    image: "/images/internship.png",
  },
  {
    title: "The Global Stewardship Halls",
    description:
      "This is a visionary community fostering responsible leadership, accountability, and sustainable impact through values-driven stewardship and global collaboration.",
    link: "https://chat.whatsapp.com/CkUSlamx0Cr5k9itH1nbJQ?mode=gi_t",
    image: "/images/leadership.png",
  },
];

export default function DiscoverCommunity() {
  return (
    <section className="py-20 w-full bg-[#F9FAFB]" id="communities">
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
              </div>

              <div className="w-full md:w-auto">
                <Link href={community.link} target="_blank">
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
