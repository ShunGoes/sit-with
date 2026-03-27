import { Hero } from "@/components/pages/homepage/hero";
import { HowWeHelp } from "@/components/pages/homepage/how-we-help";
import { PowerOfPresence } from "@/public/icons/power-of-presence";
import { OurTeam } from "@/components/pages/homepage/our-team";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { CtaBanner } from "@/components/pages/homepage/cta-banner";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Hero />
      <div className="w-11/12 mx-auto">
        <HowWeHelp />
        <PowerOfPresence />
        <OurTeam />
        <Testimonials />
        <div className="pb-24" />
        <CtaBanner />
      </div>
    </div>
  );
}
