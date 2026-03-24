import { CheckCircle2 } from "lucide-react";

export function RetreatBenefits() {
  const benefits = [
    "Pause and reconnect with yourself",
    "Experience guided reflective practices",
    "Build meaningful connections",
    "Gain clarity and emotional balance",
  ];

  return (
    <section className="bg-[#F4F6F7] py-24 w-full">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <p className="text-gray-500 uppercase tracking-widest text-xs font-semibold mb-6">
          WHY JOIN THE CAMP
        </p>
        <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-16 max-w-3xl leading-snug">
          A presence-based retreat designed to help you pause, reflect, and
          reconnect with yourself in a calm and supportive environment
        </h2>

        <div className="flex flex-col gap-4 w-full max-w-3xl items-center">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 bg-white rounded-full px-6 md:px-10 py-4 shadow-sm border border-[#EEF2F6] w-full md:w-[80%] lg:w-[70%] transition-transform hover:-translate-y-1 ${
                idx % 2 === 0 ? "mr-auto md:ml-0" : "ml-auto md:mr-0"
              }`}
            >
              <CheckCircle2 className="w-6 h-6 text-[#1AAB7A]" />
              <span className="text-gray-800 font-medium text-[16px] md:text-[18px]">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
