import Image from "next/image";

export function OurMission() {
  const highlights = [
    {
      icon:  (
              <Image
                src="/images/green-heart-no-overlay.png"
                alt="Emotional Healing"
                width={24}
                height={24}
                className="w-6 h-6 object-contain bg-[#EBECEB33]"
              />
            ),
      text: "Compassion",
    },
    {
        icon: (
              <Image
                src="/images/award-no-overlay.png"
                alt="Community Connection"
                width={24}
                height={24}
                className="w-6 h-6 object-contain bg-[#EBECEB33]"
              />
            ),
      text: "Authenticity",
    },
    {
      icon: (
              <Image
                src="/images/connection-no-overlay.png"
                alt="Community Connection"
                width={24}
                height={24}
                className="w-6 h-6 object-contain bg-[#EBECEB33]"
              />
            ),
    
      text: "Connection",
    },
  ];

  return (
    <section className="container mx-auto  py-10 lg:py-20 flex flex-col lg:flex-row gap-10 md:gap-16 items-center max-w-6xl">
      {/* Left Content */}
      <div className="flex-1 ">
        <h2 className="heading-2 mb-6">Our Mission</h2>

        <p className="text-black text-base xl:text-xl leading-[140%] mb-6">
          Sit-With-PD started with a simple belief that though the space of
          internal growth and healing can be difficult to traverse, no one
          should traverse it alone. We believe that we are all on a journey
          towards a more authentic, fully present version of ourselves. Every
          journey requires time, intentionality, and a supportive community.
        </p>

        <p className="text-black text-base xl:text-xl leading-[140%] mb-10">
          Our mission is to create spaces for the empowerment and personal
          development of individuals, navigating life transition, or geographic.
          This mission seeks to cultivate emotional wellness, true healing,
          peace, and sustained transformation for all.
        </p>

        <div className="flex flex-wrap gap-6">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center bg-[#EBECEB33] px-2 py-1 gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-[#344054]0">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image Placeholder */}
      <div className="flex-1 w-full ">
        {/* Using the join-us image as a placeholder since it features people connecting */}
        <div className="w-full h-[300px] md:h-[400px] lg:min-h-[446px] rounded-[16px] border-[#DEDEDE] overflow-hidden relative border">
          <Image
            src="/images/join-us.webp"
            alt="Our Mission"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
