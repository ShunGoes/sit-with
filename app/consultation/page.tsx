import { Hero } from "@/components/pages/consultation/hero";
import { AreasOfSupport } from "@/components/pages/consultation/areas-of-support";
import { ProcessCards } from "@/components/shared/process-cards";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { ConsultationCta } from "@/components/pages/consultation/consultation-cta";
import { BookingForm } from "@/components/pages/consultation/booking-form";

export default function ConsultationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F9F7F5] w-full">
      <Hero />
      <AreasOfSupport />
      <ProcessCards />
      
      {/* Testimonials section */}
      <div className="w-full pb-24">
        <Testimonials />
      </div>

      <ConsultationCta />
      <BookingForm />
    </main>
  );
}
