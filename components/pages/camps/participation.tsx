import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import GrayCheckIcon from "@/pd-icons/gray-check";
import { CheckCircle2, Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CampParticipation() {
  const plans = [
    {
      name: "Individual",
      price: formatCurrency(500),
      features: [
        "Accommodation",
        "Meals",
        "Guided sessions",
        "Community activities",
        "Retreat materials",
      ],
    },
    {
      name: "Couple",
      price: formatCurrency(750),
      highlight: true,
      features: [
        "Accommodation",
        "Meals",
        "Guided sessions",
        "Community activities",
        "Retreat materials",
      ],
    },
    {
      name: "Family",
      price: formatCurrency(1500),
      features: [
        "Accommodation",
        "Meals",
        "Guided sessions",
        "Community activities",
        "Retreat materials",
      ],
    },
  ];

  return (
    <section className="pt-24 pb-0 lg:pt-24 w-full">
      <div className="container mx-auto flex flex-col items-center">
        <Pill text="Pricing" />
        <h2 className="heading-2 text-center mb-6 lg:mb-16">
          Choose Your Participation
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 w-11/12 sm:max-w-[400px] xl:max-w-6xl mx-auto items-stretch mb-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col rounded-[32px] px-8 py-15 md:py-[100px] transition-all duration-300 relative ${
                plan.highlight
                  ? "bg-white border-2 border-[#649351] z-10 xl:-mt-4 xl:mb-4"
                  : "bg-white border border-[#2C2D47]  xl:mt-2 xl:scale-[0.95]"
              }`}
            >
              <div className="text-center mb-8">
                <h3 className="text-lg font-medium text-[#242424] mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span
                    className={`text-[56px] font-medium leading-none ${plan.highlight ? "text-[#649351]" : "text-[#242424]"}`}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3">
                    <span
                      style={{
                        background: "rgba(100, 147, 81, 0.2)",
                      }}
                      className="  w-[17px] h-[17px] rounded-full flex items-center justify-center "
                    >
                      <GrayCheckIcon color={"#649351"} />
                    </span>
                    <span className="text-black text-base font-medium ">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Info Banner & CTA */}
        <div className="w-full max-w-4xl bg-[#E9EDF0]  rounded-[8px]  py-3 mb-5 lg:mb-10 flex justify-center items-start">
          <div className="flex items-start gap-3 rounded-[8px] w-11/12 py-5 px-3 md:p-5 bg-white">
            <Info className="w-5 h-5 text-[#60935D] mt-0.5 shrink-0" />
            <p className="text-black text-base     font-medium leading-[140%]">
              A presence-based retreat designed to help you pause, reflect, and
              reconnect with yourself in a calm and supportive environment.
            </p>
          </div>
        </div>
     
      </div>
    </section>
  );
}
