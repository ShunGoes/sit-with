import { Hero } from "@/components/homepage/hero";
import { HowWeHelp } from "@/components/homepage/how-we-help";
import { PowerOfPresence } from "@/public/icons/power-of-presence";
import { OurTeam } from "@/components/homepage/our-team";
import { Testimonials } from "@/components/homepage/testimonials";
import { CtaBanner } from "@/components/homepage/cta-banner";

export default function Home() {
  return (
    <div className="flex flex-col pb-24">
      <Hero />
      <div className="w-11/12 mx-auto">
        <HowWeHelp />
        <PowerOfPresence />
        <OurTeam />
        <Testimonials />
      </div>

      <CtaBanner />
    </div>
  );
}
