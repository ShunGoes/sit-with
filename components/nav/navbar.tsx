"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Camps", href: "/camps" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
  { label: "Membership", href: "/membership" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav
      className="fixed top-0 backdrop-blur-sm z-50 w-full"
      style={{ backgroundColor: "#00000033" }}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center max-w-6xl justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        <div className="w-[31px] h-[31px] relative ">
          <Image src="/images/logo.webp" alt="Sit With PD Logo" fill className="object-cover" />
        </div>
          <h4 className="text-sm font-semibold text-[#A8D675] tracking-tight">
            Sit With PD
          </h4>
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
        <div className="hidden lg:flex items-center gap-4">
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

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            className="flex flex-col gap-1.5"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10 },
              }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -10 },
              }}
              className="w-6 h-0.5 bg-white block"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#E9EDF0] bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-screen max-h-screen bg-[#E9EDF0] backdrop-blur-md z-40 lg:hidden flex flex-col pt-7 px-6 pb-6 overflow-y-auto scrollbar-hide"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between mb-10">
              <Link href="/" className="flex items-center gap-2">
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
              <button
                onClick={() => setIsOpen(false)}
                className=" text-black hover:text-green-50 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>


            {/* Navigation Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-black text-lg font-medium hover:text-brand-green transition-colors py-3 px-4 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Login Button - Separated at Bottom */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
              className="border-t border-gray-700 pt-6"
            >
              <Button
                asChild
                className="w-full bg-brand-green hover:bg-[#324414] text-white rounded-md py-3 mb-3"
              >
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border border-brand-green text-brand-green hover:bg-brand-green hover:text-white rounded-md py-3"
              >
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  Join Now
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
