"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on blog pages
  if (pathname?.startsWith("/blog")) {
    return null;
  }

  return (
    <div className="p-5">
      <Footer />
    </div>
  );
}
