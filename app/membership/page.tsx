import { WhyJoin } from "@/components/pages/membership/why-join";
import { MembershipPricing } from "@/components/pages/membership/pricing";
import { MembershipFaq } from "@/components/pages/membership/faq";
import { CtaBlock } from "@/components/shared/cta-block";
import { MembershipHero } from "@/components/pages/membership/hero";

export default function MembershipPage() {
  return (
    <div className="flex flex-col items-center">
      <MembershipHero/>
      <div className="w-11/12 mx-auto ">

      <WhyJoin />
      <MembershipPricing />
      <MembershipFaq />
      </div>
      <CtaBlock
        title="Ready to Begin Your  Membership Journey?"
        subtext="Choose your plan today and join thousands of members committed to presence-based healing and personal transformation."
        firstLink={{ text: "Join Now" }}
        secondLink={{ text: "Book consultation" }}
      />
    </div>
  );
}
