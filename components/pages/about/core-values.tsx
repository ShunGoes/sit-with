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

        <div className="flex flex-col  items-center justify-center lg:max-w-[900px] w-full">
          {/* Row 1: Presence & Authenticity */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between gap-6 md:gap-0">
            <div className="relative w-10/12 h-[300px] sm:h-[400px] lg:h-[600px] mx-auto ">
              <Image
                src={"/images/about-core-values.png"}
                alt="about core values"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
