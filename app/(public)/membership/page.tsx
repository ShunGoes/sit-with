import { WhyJoin } from "@/components/pages/membership/why-join";
import { MembershipPricing } from "@/components/pages/membership/pricing";
import { MembershipFaq } from "@/components/pages/membership/faq";
import { CtaBlock } from "@/components/shared/cta-block";
import { MembershipHero } from "@/components/pages/membership/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership | Join the Therapeutic Network",
  description:
    "Become a member of Sit-With-PD. Gain access to exclusive programs, community support, and resources dedicated to presence-based healing and growth.",
};

import { notFound } from "next/navigation";

export default function MembershipPage() {
  notFound();
  return null;
}
