import { RetreatBenefits } from "@/components/pages/camps/retreat-benefits";
import { GlimpseGallery } from "@/components/pages/camps/glimpse";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { CampHero } from "@/components/pages/camps/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Therapeutic Camps | Awareness & Connection",
  description:
    "Join our immersive therapeutic camps. Build awareness, develop practical wellbeing habits, and connect with a community focused on growth and presence.",
};
import CampServices from "@/components/pages/camps/camp-services";
import { Suspense } from "react";
import CardSkeletons from "@/components/skeletons/card-skeletons";

export default function CampsPage() {
  return (
    <div className="flex flex-col items-center  w-full overflow-x-hidden">
      <CampHero />
      <div className="w-11/12 mx-auto">
        <RetreatBenefits />
      </div>
      <GlimpseGallery />
      <Suspense fallback={<CardSkeletons />}>
        <div className="w-11/12 mx-auto">
          <CampServices />
        </div>
      </Suspense>
      <div className="w-11/12 mx-auto"></div>
      {/* <BookingForm /> */}
      <div className="w-full bg-white ">
        <Testimonials />
      </div>

      {/* Shared CTA Block with custom props */}
    </div>
  );
}
