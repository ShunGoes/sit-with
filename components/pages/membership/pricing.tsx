import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function MembershipPricing() {
  const pricingPlans = [
    {
      name: "Standard",
      price: "$100",
      period: "Per month",
      highlight: false,
      features: [
        "Access to all community forums",
        "Program discounts (10%)",
        "Email support",
        "Access to member-alone resources",
      ],
      buttonText: "Get Standard Plan",
    },
    {
      name: "Plus",
      price: "$250",
      period: "Per month",
      highlight: true,
      features: [
        "All Standard benefits",
        "Unlimited program access",
        "Priority email support",
        "Exclusive member webinars",
        "Monthly 1-on-1 calls with a facilitator (15m)",
      ],
      buttonText: "Get Plus Plan",
    },
    {
      name: "Green",
      price: "$500",
      period: "Per month",
      highlight: false,
      features: [
        "All Plus benefits",
        "Dedicated personal facilitator",
        "Weekly 1-on-1 sessions",
        "Customized well-being plans",
        "Priority access to new programs",
        "Exclusive retreats and camp access (20% off)",
      ],
      buttonText: "Get Green Plan",
    },
  ];

  return (
    <section className="container mx-auto py-20 flex flex-col items-center">
      <h2 className="heading-2 text-center mb-4">
        Choose a Plan That Supports Your Growth
      </h2>
      <p className="text-center text-[#697586] mb-16 max-w-2xl  leading-[24px]">
        Find the subscription that works best for you. Choose wellbeing,
        encourage growth, move forward today. Cancel anytime without fees.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-11/12 max-w-6xl mx-auto items-stretch">
        {pricingPlans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex flex-col rounded-[32px] px-8 md:py-[100px] transition-all duration-300 relative ${
              plan.highlight
                ? "bg-white border-2 border-[#649351] z-10 md:-mt-4 md:mb-4"
                : "bg-white border border-[#2C2D47]  mt-2 lg:scale-[0.95]"
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
              <p className="text-[#242424] font-medium text-base">
                {plan.period}
              </p>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-[#60935D]" : "text-[#A8D675]"}`}
                  />
                  <span className="text-black text-base font-medium ">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlight ? "regular" : "outline"}
              className={`w-full  h-12 text-base font-medium ${
                plan.highlight
                  ? " hover:bg-[#4E7D4C] text-white border-none"
                  : "bg-gray-100 border-[#2C2D47] border text-[#242424]  "
              }`}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
