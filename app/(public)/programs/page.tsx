import { ProgramHero } from "@/components/pages/programs/hero";
import { ProgramOverview } from "@/components/pages/programs/program-overview";
import { ProcessCards } from "@/components/shared/process-cards";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { CtaBlock } from "@/components/shared/cta-block";

export default function ProgramsPage() {
  return (
    <main className="flex flex-col items-center w-full overflow-x-hidden">
      <ProgramHero />
      <div className="w-11/12 mx-auto">
        <ProgramOverview />
        <ProcessCards />
      </div>
      
      <div className="w-full bg-white">
        <Testimonials />
      </div>

      <CtaBlock
        title="Ready to Start Your Journey?"
        subtext="Take the first step toward a more balanced life. Explore our guided sessions or book a free discovery call today."
        firstLink={{ text: "View All Programs", href: "/programs" }}
        secondLink={{ text: "Book Consultation", href: "/consultation" }}
      />
    </main>
  );
}
