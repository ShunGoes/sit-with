import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
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
    <section className=" py-24 w-full">
      <div className="container mx-auto flex flex-col items-center">
        <Pill text="Pricing" />
        <h2 className="heading-2 text-center mb-16">
          Choose Your Participation
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6  max-w-5xl w-11/12 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col flex-1 rounded-[32px] p-8 md:py-25 md:px-10 transition-all duration-300 relative bg-white ${
                plan.highlight
                  ? "border-2 border-[#649351]  z-10 lg:-mt-4 lg:mb-4"
                  : "border-2 border-[#EEF2F6]  mt-4 lg:scale-[0.96]"
              }`}
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-[#242424] mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span
                    className={`text-[56px] font-medium  ${plan.highlight ? "text-[#649351]" : "text-[#242424]"}`}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M1.03906 10.0003C1.03906 14.9479 5.04985 18.9587 9.9974 18.9587C14.945 18.9587 18.9557 14.9479 18.9557 10.0003C18.9557 5.05278 14.945 1.04199 9.9974 1.04199C5.04985 1.04199 1.03906 5.05278 1.03906 10.0003Z"
                        fill="#649351"
                      />
                      <path
                        d="M14.0672 6.68365C14.288 7.08744 14.1397 7.59381 13.7359 7.81463C12.5931 8.43958 11.5199 9.74792 10.7004 11.0027C10.301 11.6143 9.98052 12.1839 9.7601 12.6003C9.6501 12.8081 9.5656 12.9767 9.50919 13.0921L9.42727 13.2632C9.29852 13.5447 9.02435 13.7318 8.71535 13.7489C8.40627 13.7659 8.11316 13.6102 7.95425 13.3446C7.69532 12.9117 7.28388 12.5165 6.90258 12.2151C6.7173 12.0686 6.55054 11.9531 6.43153 11.8752L6.25629 11.7656C5.85671 11.5374 5.71758 11.0287 5.94554 10.629C6.17354 10.2292 6.68248 10.0899 7.08226 10.3179L7.34479 10.481C7.49662 10.5804 7.70485 10.7248 7.93625 10.9077C8.11309 11.0475 8.3108 11.2156 8.51044 11.4092C8.72444 11.0247 8.99194 10.5708 9.30502 10.0913C10.1523 8.79408 11.4124 7.18572 12.9363 6.35235C13.34 6.13152 13.8464 6.27985 14.0672 6.68365Z"
                        fill="#649351"
                      />
                    </svg>

                    <span className="text-black text-base  font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Info Banner & CTA */}
        <div className="w-full max-w-4xl bg-[#E9EDF0]  rounded-[8px]  py-3 mb-10 flex justify-center items-start">
          <div className="flex items-start gap-3 rounded-[8px] w-11/12 p-5 bg-white">
            <Info className="w-5 h-5 text-[#60935D] mt-0.5 shrink-0" />
            <p className="text-black text-base     font-medium leading-[140%]">
              A presence-based retreat designed to help you pause, reflect, and
              reconnect with yourself in a calm and supportive environment.
            </p>
          </div>
        </div>
          <div className="w-[25%] max-w-3xl">
        <Button
          variant="regular"
          className="w-full"
        >
          Begin your application
        </Button>

          </div>
      </div>
    </section>
  );
}
