"use client"

import { useEffect } from "react";
import { usePathname } from "next/navigation";

let prevPath: string | null = null;

export function ViewTransitionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (prevPath) {
      document.documentElement.dataset.direction = pathname > prevPath ? "forward" : "back";
    }

    prevPath = pathname;
  }, [pathname]);

  return null;
}
