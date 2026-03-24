import { RetreatBenefits } from "@/components/pages/camps/retreat-benefits";
import { GlimpseGallery } from "@/components/pages/camps/glimpse";
import { CampParticipation } from "@/components/pages/camps/participation";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { CtaBlock } from "@/components/shared/cta-block";

export default function CampsPage() {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <RetreatBenefits />
      <GlimpseGallery />
      <CampParticipation />

      {/* Reusing Testimonials component */}
      <div className="w-full bg-white">
        <Testimonials />
      </div>

      {/* Shared CTA Block with custom props */}
      <CtaBlock
        title="Join the Next Camp Experience"
        subtext="Secure your spot for our upcoming camp and give yourself the space to grow."
        firstLink={{ text: "Join Now" }}
      />
    </div>
  );
}
