import Image from "next/image";
import { Pill } from "@/components/ui/pill";

export function PowerOfPresence() {
  const cards = [
    {
      title: "Emotional Healing",
      description:
        "Release emotional patterns and cultivate emotional intelligence through guided therapy.",
      icon: (
        <Image
          src="/icons/emotional-healing.svg"
          alt="Emotional Healing"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      ),
    },
    {
      title: "Community Connection",
      description:
        "Connect with like-minded individuals in a safe, supportive therapeutic community.",
      icon: (
        <Image
          src="/icons/community-connection.svg"
          alt="Community Connection"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      ),
    },
    {
      title: "Personal Growth",
      description:
        "Accelerate your development through structured programs and personalized guidance.",
      icon: (
        <Image
          src="/icons/personal-growth.svg"
          alt="Personal Growth"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      ),
    },
    {
      title: "Sustained Transformation",
      description:
        "Create lasting change through accountability, presence, and intentional practice.",
      icon: (
        <Image
          src="/icons/sustained-transformation.svg"
          alt="Sustained Transformation"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      ),
    },
  ];

  return (
    <section className="container mx-auto py-10 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
      {/* Left Content */}
      <div className="flex-1  max-w-xl">
        <div className="flex justify-center lg:text-start">
        <Pill text="The power of presence" />

        </div>
        <h2 className="heading-2 lg:leading-[54px] font-normal text-center ">
          Sit-With-PD harnesses the transformative power of presence-based
          therapy and personal development through authentic connection and
          guided facilitation.
        </h2>
      </div>

      {/* Right Content - Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col rounded-[10px] bg-[#E9EDF0] p-6 lg:p-4.5"
          >
            <div className="w-12.5 h-12.5 rounded-full bg-[#25756A1A] flex items-center justify-center mb-6">
              {card.icon}
            </div>
            <h3 className="text-xl font-medium text-[#132812] mb-2">
              {card.title}
            </h3>
            <p className="text-base text-[#14312D] font-normal leading-relaxed lg:leading-[24px] ">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
