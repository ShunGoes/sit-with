import { Hero } from "@/components/pages/consultation/hero";
import { ConsultationServices } from "@/components/pages/consultation/consultation-services";
import { AreasOfSupport } from "@/components/pages/consultation/areas-of-support";
import { ProcessCards } from "@/components/shared/process-cards";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { ConsultationCta } from "@/components/pages/consultation/consultation-cta";
import { BookingForm } from "@/components/pages/consultation/booking-form";

export default function ConsultationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center  w-full">
      <Hero />
      <div className="w-11/12 mx-auto">
        <AreasOfSupport />
      <ConsultationServices />
      <ProcessCards />
      </div>

      {/* Testimonials section */}
      <div className="w-full ">
        <Testimonials />
      </div>

      <ConsultationCta />
      <BookingForm />
    </main>
  );
}
