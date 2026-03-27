import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav
      className="fixed top-0 backdrop-blur-sm z-50 w-full"
      style={{ backgroundColor: "#00000033" }}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center max-w-6xl  justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Logo icon representation */}
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
          <span className="text-brand-green font-medium text-lg tracking-tight">
            Sit With PD
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link
            href="/about"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            About
          </Link>
          <Link
            href="/programs"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            Programs
          </Link>
          <Link
            href="/membership"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            Membership
          </Link>
          <Link
            href="/camps"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            Camps
          </Link>
          <Link
            href="/consultation"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            Consultation
          </Link>
          <Link
            href="/blog"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-white text-sm font-medium hover:text-green-50 transition-colors"
          >
            Login
          </Link>
          <Button
            asChild
            className="bg-brand-green hover:bg-[#324414] text-white rounded-md px-6"
          >
            <Link href="/auth/signup">Join Now</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
