import { Heart, Maximize, Target, Users } from "lucide-react";

export function CoreValues() {
  const values = [
    {
      title: "Presence",
      desc: "We center the practice of being fully present, anchored intimately with ourselves and the world around us.",
      icon: <Maximize className="w-5 h-5 text-brand-green" />,
    },
    {
      title: "Authenticity",
      desc: "We honor the truth of who you are. We invite you to bring all your realness and rawness without judgment.",
      icon: <Heart className="w-5 h-5 text-brand-green" />,
    },
    {
      title: "Community",
      desc: "We believe that deep, transformational healing happens in the context of authentic relationships.",
      icon: <Users className="w-5 h-5 text-brand-green" />,
    },
    {
      title: "Integrity",
      desc: "Our guidance is rooted in trust, ethics, and respect. What we teach is also what we practice.",
      icon: <Target className="w-5 h-5 text-brand-green" />,
    },
  ];

  return (
    <section className="bg-[#F4F6F7] py-24 w-full">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        <h2 className="heading-2 text-center mb-16">Our Core Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl relative w-full">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-10 flex flex-col items-center text-center shadow-sm relative z-10 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-secondary-green/20 flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {val.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {val.desc}
              </p>
            </div>
          ))}

          {/* Decorative faint arrows grid (visible on md screens) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            {/* Horizontal Arrow */}
            <div className="absolute top-[25%] left-[45%] w-[10%] border-t-2 border-[#E5E9EB] border-dashed"></div>
            {/* Vertical Arrow */}
            <div className="absolute top-[45%] left-[25%] h-[10%] border-l-2 border-[#E5E9EB] border-dashed"></div>
            <div className="absolute top-[45%] right-[25%] h-[10%] border-l-2 border-[#E5E9EB] border-dashed"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
