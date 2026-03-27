"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-footer-bg relative overflow-hidden text-white w-full rounded-[20px] lg:rounded-[40px] ">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url(/images/pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 lg:pr-8">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <div className="text-brand-green flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5h2v5h-2zm1-7.5c-.83 0-1.5-.67-1.5-1.5S11.17 6 12 6s1.5.67 1.5 1.5S12.83 9 12 9z" />
                </svg>
              </div>
              <span className="text-brand-green font-medium text-xl tracking-tight">
                Sit With PD
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Helping you pause, reflect, and grow.
            </p>
          </div>

          {/* Programs Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-green font-medium text-base mb-2">
              Programs
            </h3>
            <Link
              href="/programs"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/membership"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Membership
            </Link>
            <Link
              href="/camps"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Camps
            </Link>
            <Link
              href="/consultation"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Consultation
            </Link>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-green font-medium text-base mb-2">
              Company
            </h3>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Terms of services
            </Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-green font-medium text-base mb-2">
              Newsletter
            </h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-2">
              Subscribe for updates on new programs and community insights.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white text-gray-900 border-none placeholder:text-gray-400 h-10 rounded-md"
              />
              <Button
                type="submit"
                className="bg-[#6B9057] hover:bg-[#587948] text-white h-10 rounded-md"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Email</span>
              <a
                href="mailto:hello@sitwithpd.com"
                className="text-sm text-gray-300 underline underline-offset-4 hover:text-white transition-colors"
              >
                hello@sitwithpd.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Phone</span>
              <span className="text-sm text-gray-300 underline underline-offset-4">
                +1 (234) 567-890
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Location</span>
              <span className="text-sm text-gray-300">Global Network</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-xs">
            © 2026 Sit-with-PD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
