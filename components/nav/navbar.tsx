"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { X, LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/use-auth-store";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { logout } from "@/lib/api/services/auth/auth.services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Camps", href: "/camps" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const settings = usePlatformSettingsStore((state) => state.settings);
  console.log("user", user, isAuthenticated);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 backdrop-blur-sm z-50 w-full transition-colors duration-300 ${
        isScrolled ? "bg-black/80" : "bg-black/20"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center max-w-6xl justify-between">
        {/* Logo */}
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
            {settings?.platformName || "Sit With PD"}
          </h4>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks
            .filter((link) => link.label !== "Home")
            .map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-regular-button underline underline-offset-4"
                      : "text-white hover:text-green-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="text-white text-sm font-medium hover:text-green-50 transition-colors"
              >
                Login
              </Link>
              <Button
                asChild
                variant={"regular"}
                className="bg-brand-green hover:bg-[#324414] text-white rounded-md px-6"
              >
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href={user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="text-regular-button hover:text-brand-green transition-colors flex items-center gap-2 p-2 rounded-full hover:bg-white/10"
                title="Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>
              <Button
                variant="danger"
                onClick={async () => {
                  try { await logout(); } catch (e) { console.error(e); }
                  clearUser();
                  localStorage.removeItem("sit-with-auth");
                  localStorage.removeItem("sit-with-token");
                  window.location.href = "/login";
                }}
                className="  flex items-center gap-2 px-3"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </div>
          )}
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
                <div className="w-[31px] h-[31px] relative ">
                  <Image
                    src="/images/logo.webp"
                    alt="Sit With PD Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-sm font-semibold text-[#A8D675] tracking-tight">
                  {settings?.platformName || "Sit With PD"}
                </h4>
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
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors py-3 px-4 block ${
                        isActive
                          ? "text-regular-button underline underline-offset-4"
                          : "text-black hover:text-brand-green"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Login Button - Separated at Bottom */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
              className="border-t border-gray-700 pt-6"
            >
              {!isAuthenticated ? (
                <>
                  <Button
                    asChild
                    variant={"outline"}
                    className="w-full bg-white text-regular-button mb-3"
                  >
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="regular"
                    className="w-full "
                  >
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                     Sign up
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-white text-regular-button mb-3"
                  >
                    <Link href={user?.role === "ADMIN" ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      try { await logout(); } catch (e) { console.error(e); }
                      clearUser();
                      setIsOpen(false);
                      localStorage.removeItem("sit-with-auth");
                      localStorage.removeItem("sit-with-token");
                      window.location.href = "/login";
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
