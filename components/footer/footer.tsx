"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Youtube, Instagram, Facebook } from "lucide-react";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import MailIcon from "@/pd-icons/mail-icon";
import PhoneIcon from "@/pd-icons/phone-icon";
import LocationIcon from "@/pd-icons/location-icon";

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.23-2.74.28-.69.44-1.22 1.06-1.35 1.88-.22 1.16.27 2.35 1.14 3.07.45.38 1.01.63 1.58.75 1.75.37 3.68-.55 4.32-2.15.14-.35.21-.73.21-1.11.02-3.52.01-7.03.02-10.55-.02-.1-.01-.3 0-.4z" />
  </svg>
);

export function Footer() {
  const settings = usePlatformSettingsStore((state) => state.settings);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
  };
  return (
    <footer className="bg-footer-bg relative overflow-hidden text-white w-full rounded-[20px] py-15 lg:rounded-[40px] ">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 hidden md:block border-4 border-red-500 pointer-events-none"
        style={{
          backgroundImage: "url(/images/pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container mx-auto w-11/12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 lg:gap-8 mb-15 lg:mb-30">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 ">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-[120px] h-[40px] relative ">
                <Image
                  src="/images/primary-logo.png"
                  alt="Sit With PD Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-[#F8FFF5] text-sm leading-relaxed max-w-xs">
              Helping you pause, reflect, and grow.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <span className="text-[#F8FFF5] text-sm">Follow Us</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.youtube.com/@sitwithpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C7CAC6] hover:text-[#A8D675] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://www.facebook.com/share/19tSLd5kzH/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C7CAC6] hover:text-[#A8D675] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/sitwithpd?igsh=OHo1eHRqNTRmd2ps&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C7CAC6] hover:text-[#A8D675] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@sitwithpd?_r=1&_t=ZN-95g0zMOaKzW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C7CAC6] hover:text-[#A8D675] transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-15 lg:justify-center ">
            {/* Programs Links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[#6FB851] font-medium text-base  leading-[145%]">
                Programs
              </h3>
              <Link
                href="/programs"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Programs
              </Link>

              <Link
                href="/camps"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Camps
              </Link>
              <Link
                href="/consultation"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Consultation
              </Link>
              <Link
                href="/blog"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Blog
              </Link>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[#6FB851] font-medium text-base  leading-[145%]">
                Company
              </h3>
              <Link
                href="/about"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Contact
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/refund-policy"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Refund Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Terms of Services
              </Link>
            </div>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 mb-10 gap-8 pt-8 items-start">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <MailIcon />
            </div>
            <div className="flex flex-col team-sm text-[#C7CAC6]">
              <span className=" ">Email</span>
              <a
                href={`mailto:${settings?.supportEmail || "info@sitwithpd.com"}`}
                className=" underline underline-offset-4 hover:text-white transition-colors text-sm"
              >
                {settings?.supportEmail || "info@sitwithpd.com"}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <PhoneIcon />
            </div>
            <div className="flex flex-col team-sm text-[#C7CAC6]">
              <span className=" ">Phone</span>
              <a
                href="tel:+447359307733"
                className=" underline underline-offset-4 hover:text-white transition-colors text-sm"
              >
                <span>+44 7359 307 733 </span>
              </a>
              <a
                href="tel:+234201 453 6932"
                className=" underline underline-offset-4 hover:text-white transition-colors text-sm"
              >
                +234 201 453 6932
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <div className="mt-1">
              <LocationIcon />
            </div>
            <div className="flex flex-col team-sm text-[#C7CAC6] min-w-0">
              <span className=" ">Address</span>
              <div className="flex flex-col gap-1 text-sm min-w-0">
                <p className="w-full min-w-0 leading-relaxed text-wrap text-[#C7CAC6]">
                  <span className="block">International Headquarters; </span>
                  <span className="block">Gardenia Tropicana Lane</span>
                  <span className="block">Urmston, Manchester </span>
                  <span className="block mb-3">United Kingdom. </span>
                  <span className="block">African Headquarters; </span>
                  <span className="block">Gardenia Tropicana Camps </span>
                  <span className="block">Victoria Island, </span>
                  <span className="block">Lagos, Nigeria.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#F2F8EC] text-sm">
            © 2026 {settings?.platformName || "Sit-with-PD"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
