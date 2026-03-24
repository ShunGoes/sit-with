import { Button } from "@/components/ui/button";
import { CheckCircle2, Info } from "lucide-react";

export function CampParticipation() {
  const plans = [
    {
      name: "Individual",
      price: "$500",
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
      price: "$750",
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
      price: "$1500",
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
    <section className="bg-[#FAFAFA] py-24 w-full">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        <p className="text-gray-500 uppercase tracking-widest text-xs font-semibold mb-6">
          PRICING
        </p>
        <h2 className="heading-2 text-center mb-16">
          Choose Your Participation
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 w-full max-w-5xl mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col flex-1 rounded-[24px] p-8 md:p-10 transition-all duration-300 relative bg-white ${
                plan.highlight
                  ? "border border-[#60935D] shadow-lg z-10 lg:-mt-4 lg:mb-4"
                  : "border border-[#EEF2F6] shadow-sm mt-4 lg:scale-[0.96]"
              }`}
            >
              <div className="text-center mb-8">
                <h3 className="text-lg font-medium text-gray-600 mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span
                    className={`text-[48px] font-bold leading-none ${plan.highlight ? "text-[#60935D]" : "text-gray-900"}`}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-[#60935D]" : "text-[#A8D675]"}`}
                    />
                    <span className="text-gray-600 text-[14px] leading-snug font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Info Banner & CTA */}
        <div className="w-full max-w-4xl bg-[#F0F4F2] border border-[#DEE6E2] rounded-xl p-5 mb-10 flex items-start gap-4">
          <Info className="w-5 h-5 text-[#60935D] mt-0.5 shrink-0" />
          <p className="text-gray-700 text-[15px] font-medium leading-relaxed">
            A presence-based retreat designed to help you pause, reflect, and
            reconnect with yourself in a calm and supportive environment.
          </p>
        </div>

        <Button
          variant="regular"
          className="bg-[#60935D] hover:bg-[#4E7D4C] text-white border-none h-12 px-10 text-[16px] font-medium rounded-lg"
        >
          Book Your Experience
        </Button>
      </div>
    </section>
  );
}
