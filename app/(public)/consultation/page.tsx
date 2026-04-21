import { Hero } from "@/components/pages/consultation/hero";
import { ConsultationServices } from "@/components/pages/consultation/consultation-services";
import { AreasOfSupport } from "@/components/pages/consultation/areas-of-support";
import { ProcessCards } from "@/components/shared/process-cards";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { ConsultationCta } from "@/components/pages/consultation/consultation-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Therapeutic Consultation",
  description:
    "Book a one-on-one therapeutic consultation with our expert facilitators. Receive personalized support for emotional healing and presence-based growth.",
};

export default function ConsultationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center  w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Professional Therapeutic Consultation",
            "provider": {
              "@type": "Organization",
              "name": "Sit-With-PD"
            },
            "description": "Personalized one-on-one therapeutic consultations focused on presence-based healing and emotional transformation.",
            "areaServed": "Global",
            "serviceType": "Therapeutic Consultation"
          }),
        }}
      />
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
    </main>
  );
}
