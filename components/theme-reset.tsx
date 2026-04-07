"use client";

import { useEffect } from "react";

export function ThemeReset() {
  useEffect(() => {
    // Automatically revert any globally injected dark mode class
    // when entering a light-forced layout.
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }, []);

  return null;
}
