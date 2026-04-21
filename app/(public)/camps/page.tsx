import { RetreatBenefits } from "@/components/pages/camps/retreat-benefits";
import { GlimpseGallery } from "@/components/pages/camps/glimpse";
import { CampParticipation } from "@/components/pages/camps/participation";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { CtaBlock } from "@/components/shared/cta-block";
import { CampHero } from "@/components/pages/camps/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Therapeutic Camps | Awareness & Connection",
  description:
    "Join our immersive therapeutic camps. Build awareness, develop practical wellbeing habits, and connect with a community focused on growth and presence.",
};
import { BookingForm } from "@/components/pages/consultation/booking-form";

export default function CampsPage() {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <CampHero />
      <div className="w-11/12 mx-auto">
        <RetreatBenefits />
      </div>
      <GlimpseGallery />
      <div className="w-11/12 mx-auto">
        <CampParticipation />
      </div>
      <BookingForm />
      <div className="w-full bg-white ">
        <Testimonials />
      </div>

      {/* Shared CTA Block with custom props */}
    </div>
  );
}
