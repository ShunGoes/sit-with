// components/providers/cal-provider.tsx
"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", { theme: "light" });
    })();
  }, []);

  return <>{children}</>;
}