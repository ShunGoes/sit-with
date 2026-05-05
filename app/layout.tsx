import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ViewTransition } from "react";
import { ViewTransitionTracker } from "@/components/providers/view-transition-tracker";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";  
import { CalProvider } from "@/components/providers/calcom-provider";
import { HashScroller } from "@/components/providers/hash-scroller";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sit-with-pd.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Sit With PD",
    default: "Sit With PD — Presence Changes Everything",
  },
  description:
    "Join a global therapeutic network dedicated to presence-based healing, emotional transformation, and personal development. Connect with guided programs and expert consultations.",
  keywords: [
    "therapeutic presence",
    "emotional healing",
    "personal growth programs",
    "online therapeutic consultation",
    "emotional transformation",
    "Sit With PD therapeutic network",
    "presence-based healing",
  ],
  authors: [{ name: "Sit With PD Team" }],
  creator: "Sit With PD",
  publisher: "Sit With PD",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sit With PD",
    title: "Sit With PD — Presence Changes Everything",
    description:
      "A global therapeutic network for presence-based healing and emotional transformation.",
    images: [
      {
        url: "/images/primary-logo.png",
        width: 1200,
        height: 630,
        alt: "Sit-With-PD Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <QueryProvider>
        <TooltipProvider>
          <ViewTransitionTracker />
          <ModalProvider />
          <CalProvider>
            <Suspense fallback={null}>
              <HashScroller />
            </Suspense>
            <ViewTransition>{children}</ViewTransition>
          </CalProvider>
          <Toaster position="top-center"/>
        </TooltipProvider>
        </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}




