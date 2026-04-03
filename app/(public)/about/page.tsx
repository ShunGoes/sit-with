import { OurMission } from "@/components/pages/about/our-mission";
import { CoreValues } from "@/components/pages/about/core-values";
import { TherapeuticApproach } from "@/components/pages/about/therapeutic-approach";
import { OurStory } from "@/components/pages/about/our-story";
import { AboutCta } from "@/components/pages/about/about-cta";
import { CtaBlock } from "@/components/shared/cta-block";
import { AboutHero } from "@/components/pages/about/hero";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <div className="w-11/12 k mx-auto">
        <OurMission />
      </div>
      <CoreValues />
      <div className="w-11/12 mx-auto">
        <TherapeuticApproach />
        <OurStory />
      </div>
      <CtaBlock
        title="Ready to Begin Your Journey?"
        subtext="Choose from our comprehensive programs, explore membership benefits, or book a consultation with a facilitator today."
        firstLink={{ text: "Explore programs" }}
        secondLink={{ text: "Book Consultation" }}
      />
    </div>
  );
}
