"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import MailIcon from "@/pd-icons/mail-icon";
import PhoneIcon from "@/pd-icons/phone-icon";
import LocationIcon from "@/pd-icons/location-icon";

export function Footer() {
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
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-12 lg:gap-8 mb-15 lg:mb-30">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 ">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-[31px] h-[31px] relative ">
                <Image
                  src="/images/logo.webp"
                  alt="Sit With PD Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-semibold text-[#A8D675] tracking-tight">
                Sit With PD
              </h4>
            </Link>
            <p className="text-[#F8FFF5] text-sm leading-relaxed max-w-xs">
              Helping you pause, reflect, and grow.
            </p>
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
                href="/membership"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Membership
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
                href="/terms"
                className="text-[#F8FFF5] hover:underline  text-sm transition-all"
              >
                Terms of services
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#6FB851] font-medium text-base  leading-[145%]">
              Newsletter
            </h3>
            <p className="text-[#F8FFF5] text-sm leading-relaxed mb-2">
              Subscribe for updates on new programs and community insights.
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-1 max-w-[500px]">
                <Input
                  type="email"
                  {...form.register("email")}
                  placeholder="Email address"
                  className="bg-white text-gray-900 border-none placeholder:text-gray-400 h-10 w-full sm:w-[70%] rounded-md"
                />
                <Button
                  type="submit"
                  variant={"regular"}
                  className="  w-full sm:w-[30%] "
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between lg:items-center mb-10 gap-8 pt-8 ">
          <div className="flex items-center gap-3">
            <MailIcon />
            <div className="flex flex-col team-sm text-[#C7CAC6]">
              <span className=" ">Email</span>
              <a
                href="mailto:hello@sitwithpd.com"
                className=" underline underline-offset-4 hover:text-white transition-colors"
              >
                hello@sitwithpd.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <PhoneIcon />
            <div className="flex flex-col team-sm text-[#C7CAC6]">
              <span className=" ">Phone</span>
              <a
                href="tel:+1 234 567-890"
                className=" underline underline-offset-4 hover:text-white transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LocationIcon />
            <div className="flex flex-col team-sm text-[#C7CAC6]">
              <span className=" ">Location</span>
              <a
                href="mailto:hello@sitwithpd.com"
                className=" underline underline-offset-4 hover:text-white transition-colors"
              >
                Global Network
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#F2F8EC] text-sm">
            © 2026 Sit-with-PD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
