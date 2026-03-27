import { Pill } from "@/components/ui/pill";
import { CheckCircle2 } from "lucide-react";

export function RetreatBenefits() {
  const benefits = [
    "Pause and reconnect with yourself",
    "Experience guided reflective practices",
    "Build meaningful connections",
    "Gain clarity and emotional balance",
  ];

  return (
    <section className=" py-24 w-full">
      <div className="container mx-auto  flex flex-col items-center text-center">
        <Pill text="Why attend the camp" />
        <h2 className="text-[32px] font-medium text-[#131313] mb-16 max-w-6xl leading-[48px] w-9/12">
          A presence-based retreat designed to help you pause, reflect, and
          reconnect with yourself in a calm and supportive environment
        </h2>

        <div className="flex  justify-center gap-4 w-full bg-[#E9EDF0] py-8 rounded-[24px]  max-w-3xl items-center">
          <div className="w-10/12 mx-auto flex flex-col gap-5">
            {benefits.map((benefit, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 bg-white shadow-[0px_4px_24px_rgba(221,228,234,0.5)] rounded-[16px] px-6 md:px-10 py-5 transition-transform hover:-translate-y-1"
                  style={{ marginLeft: `${idx * 20}px`, width: 'calc(100% - 60px)' }}
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-7 h-7 text-white fill-[#1AAB7A]" />
                    <span className="text-black font-medium text-[16px] md:text-[18px]">
                      {benefit}
                    </span>
                  </div>
                  
                  {/* Decorative faint lines matching the design */}
                  <div className="hidden md:flex flex-col gap-1.5">
                    <div className="w-8 h-1.5 bg-[#E9EDF0] rounded-full"></div>
                    <div className="w-5 h-1.5 bg-[#E9EDF0] rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


