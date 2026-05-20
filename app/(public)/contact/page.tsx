import { Metadata } from "next";
import Image from "next/image";
import { ContactBody } from "@/components/pages/contact/contact-body";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description:
    "Have questions about our programs, camps, or consultations? Reach out to the Sit-With-PD team for support and information.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero section */}
      <div className="relative w-full min-h-[40svh] lg:min-h-[50dvh] flex items-center justify-center">
        <Image
          src={"/images/blog-hero.png"}
          alt={"Contact page background image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="w-full  flex relative items-center justify-center">
          <h1 className="text-[#F9FDF9] font-semibold  text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] lg:text-center">
            Contact Us
          </h1>
        </div>
      </div>
      
      {/* Main content section */}
      <ContactBody />
    </div>
  );
}
