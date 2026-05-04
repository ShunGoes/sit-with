import { Hero } from "@/components/pages/homepage/hero";
import { HowWeHelp } from "@/components/pages/homepage/how-we-help";
import { PowerOfPresence } from "@/components/pages/homepage/power-of-presence";
import { OurTeam } from "@/components/pages/homepage/our-team";
import { Testimonials } from "@/components/pages/homepage/testimonials";
import { CtaBanner } from "@/components/pages/homepage/cta-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sit With PD — Presence Changes Everything",
  description:
    "Sit With PD is a global therapeutic network dedicated to presence-based healing, emotional transformation, and personal development. Start your journey today.",
};

export default function Home() {
  return (
    <div className="flex flex-col ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sit With PD",
            "url": "https://sit-with-pd.vercel.app",
            "logo": "https://sit-with-pd.vercel.app/images/primary-logo.png",
            "description": "A global therapeutic network for presence-based healing and emotional transformation.",
            "sameAs": [
              "https://www.youtube.com/@sitwithpd",
              "https://www.tiktok.com/@sitwithpd?_r=1&_t=ZN-95g0zMOaKzW",
              "https://www.instagram.com/sitwithpd?igsh=OHo1eHRqNTRmd2ps&utm_source=qr",
              "https://www.facebook.com/share/19tSLd5kzH/?mibextid=wwXIfr"
            ]
          }),
        }}
      />
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
