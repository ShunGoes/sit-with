import { OurMission } from "@/components/about/our-mission";
import { CoreValues } from "@/components/about/core-values";
import { TherapeuticApproach } from "@/components/about/therapeutic-approach";
import { OurStory } from "@/components/about/our-story";
import { AboutCta } from "@/components/about/about-cta";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <div className="w-11/12 mx-auto">
        <OurMission />
        <CoreValues />
        <TherapeuticApproach />
        <OurStory />
      </div>
      <AboutCta />
    </div>
  );
}
