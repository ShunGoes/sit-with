import { Heart, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";

export function OurMission() {
  const highlights = [
    {
      icon: <Heart className="w-5 h-5 text-brand-green" />,
      text: "Safe spaces",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-green" />,
      text: "Authenticity",
    },
    {
      icon: <Users className="w-5 h-5 text-brand-green" />,
      text: "Supportive Network",
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-8 py-20 flex flex-col md:flex-row gap-16 items-center">
      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <h2 className="heading-2 mb-6">Our Mission</h2>

        <p className="text-gray-600 leading-relaxed mb-6">
          Sit-With-PD started with a simple belief that though the space of
          internal growth and healing can be difficult to traverse, no one
          should traverse it alone. We believe that we are all on a journey
          towards a more authentic, fully present version of ourselves. Every
          journey requires time, intentionality, and a supportive community.
        </p>

        <p className="text-gray-600 leading-relaxed mb-10">
          Our mission is to create spaces for the empowerment and personal
          development of individuals, navigating life transition, or geographic.
          This mission seeks to cultivate emotional wellness, true healing,
          peace, and sustained transformation for all.
        </p>

        <div className="flex flex-wrap gap-6">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-green/20 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image Placeholder */}
      <div className="flex-1 w-full h-[400px] md:h-[500px] bg-gray-200 rounded-3xl overflow-hidden relative shadow-lg">
        {/* Using the join-us image as a placeholder since it features people connecting */}
        <Image
          src="/images/join-us.png"
          alt="Our Mission"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
