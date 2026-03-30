import { Heart, Maximize, Target, Users } from "lucide-react";
import Image from "next/image";

export function CoreValues() {
  const values = [
    {
      title: "Presence",
      desc: "We center the practice of being fully present, anchored intimately with ourselves and the world around us.",
      icon: (
        <Image
          src="/icons/emotional-healing.svg"
          alt="Emotional Healing"
          width={24}
          height={24}
          className="w-8 h-8 object-contain"
        />
      ),
    },
    {
      title: "Authenticity",
      desc: "We honor the truth of who you are. We invite you to bring all your realness and rawness without judgment.",
      icon: (
        <Image
          src="/icons/emotional-healing.svg"
          alt="Emotional Healing"
          width={24}
          height={24}
          className="w-8 h-8 object-contain"
        />
      ),
    },
    {
      title: "Community",
      desc: "We believe that deep, transformational healing happens in the context of authentic relationships.",
      icon: (
        <Image
          src="/icons/emotional-healing.svg"
          alt="Emotional Healing"
          width={24}
          height={24}
          className="w-8 h-8 object-contain"
        />
      ),
    },
    {
      title: "Integrity",
      desc: "Our guidance is rooted in trust, ethics, and respect. What we teach is also what we practice.",
      icon: (
        <Image
          src="/icons/emotional-healing.svg"
          alt="Emotional Healing"
          width={24}
          height={24}
          className="w-8 h-8 object-contain"
        />
      ),
    },
  ];

  return (
    <section className="bg-[#E9EDF0] py-24 w-full">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        <h2 className="heading-2 text-center mb-16">Our Core Values</h2>

        <div className="flex flex-col  items-center justify-center max-w-[900px] w-full">
          {/* Row 1: Presence & Authenticity */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between gap-6 md:gap-0">
            <div className="bg-[#F9FBFF] rounded-[10px] relative w-[319px] min-h-[320px] shrink-0 flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[276px] h-[276px] rounded-full bg-[#EEF2F6] z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <div className="w-12 min-h-[48px] rounded-full bg-[#E1EDDD] flex items-center justify-center mb-3">
                  {values[0].icon}
                </div>
                <h3 className="text-[20px] font-medium text-[#132812] mb-2">
                  {values[0].title}
                </h3>
                <p className="text-[#14312D] text-[16px] leading-[24px]">
                  {values[0].desc}
                </p>
              </div>
            </div>

            <div className="relative w-8 md:w-[228px] h-4 shrink-0 my-4 md:my-0">
              <Image
                src={"/images/brown-arrow.webp"}
                alt="brown arrow"
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-[#F9FBFF] rounded-[10px] relative w-[319px] min-h-[320px] shrink-0 flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[276px] h-[276px] rounded-full bg-[#EEF2F6] z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <div className="w-12 min-h-[48px] rounded-full bg-[#E1EDDD] flex items-center justify-center mb-3">
                  {values[1].icon}
                </div>
                <h3 className="text-[20px] font-medium text-[#132812] mb-2">
                  {values[1].title}
                </h3>
                <p className="text-[#14312D] text-[16px] leading-[24px]">
                  {values[1].desc}
                </p>
              </div>
            </div>
          </div>
          {/* green arrow demarcator */}
          <div className="flex justify-between w-full">
            <div className="relative w-[319px]  h-[100px] flex justify-center items-center ">
              <Image
                src={"/images/green-arrow.webp"}
                alt="green arrow"
                width={15}
                height={15}
                className=""
              />
            </div>
            <div className="relative w-[319px]  h-[100px] flex justify-center items-center ">
              <Image
                src={"/images/green-arrow.webp"}
                alt="green arrow"
                width={15}
                height={15}
                className=""
              />
            </div>
          </div>
          {/* Row 2: Community & Integrity */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between gap-6 md:gap-0">
            <div className="bg-[#F9FBFF] rounded-[10px] relative w-[319px] min-h-[320px] shrink-0 flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[276px] h-[276px]  rounded-full bg-[#EEF2F6] z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <div className="w-12 min-h-[48px] rounded-full bg-[#E1EDDD] flex items-center justify-center mb-3">
                  {values[2].icon}
                </div>
                <h3 className="text-[20px] font-medium text-[#132812] mb-2">
                  {values[2].title}
                </h3>
                <p className="text-[#14312D] text-[16px] leading-[24px]">
                  {values[2].desc}
                </p>
              </div>
            </div>

            <div className="relative w-8 md:w-[228px] h-4 shrink-0 my-4 md:my-0">
              <Image
                src={"/images/brown-arrow.webp"}
                alt="brown arrow"
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-[#F9FBFF] rounded-[10px] relative w-[319px] min-h-[320px] shrink-0 flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[276px] h-[276px] rounded-full bg-[#EEF2F6] z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <div className="w-12 min-h-[48px] rounded-full bg-[#E1EDDD] flex items-center justify-center mb-3">
                  {values[3].icon}
                </div>
                <h3 className="text-[20px] font-medium text-[#132812] mb-2">
                  {values[3].title}
                </h3>
                <p className="text-[#14312D] text-[16px] leading-[24px]">
                  {values[3].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
