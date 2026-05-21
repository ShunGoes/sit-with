import { Metadata } from "next";
import CommunityHero from "@/components/pages/community/community-hero";
import WhoWeWelcome from "@/components/pages/community/ho-we-welcome";
import DiscoverCommunity from "@/components/pages/community/discover-community";

export const metadata: Metadata = {
  title: "Join Our Community | Connect & Grow",
  description:
    "Our community is diverse, dynamic, and purpose-driven. Connect with like-minded individuals in vibrant WhatsApp communities tailored to your interests, passions, and professional goals.",
};

export default function CommunityPage() {
  return (
    <main className="flex min-h-screen flex-col items-center  w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sit-With-PD Community",
            description:
              "A diverse and purpose-driven community for growth, impact, and transformation. Join our vibrant WhatsApp groups for business, design, development, and more.",
            publisher: {
              "@type": "Organization",
              name: "Sit-With-PD",
              logo: {
                "@type": "ImageObject",
                url: "https://sitwithpd.com/images/primary-logo.png",
              },
            },
          }),
        }}
      />
      <CommunityHero />
      <WhoWeWelcome />
      <DiscoverCommunity />
    </main>
  );
}
