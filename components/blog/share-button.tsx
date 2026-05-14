"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  variant?: "public" | "admin";
  className?: string;
}

interface ShareOption {
  name: string;
  icon: React.ReactNode;
  action: () => void;
  label?: string;
}

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 3.5z" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.43-.3 6.83-1.62 10.06-1.14 2.81-3.39 5.27-6.33 6.46-2.58 1.05-5.51 1.15-8.19.4-2.86-.81-5.39-2.88-6.72-5.55-1.41-2.83-1.49-6.32-.3-9.3 1.07-2.7 3.34-4.89 6.13-5.83 1.1-.38 2.26-.55 3.42-.56v4.11c-.74.01-1.49.12-2.19.39-1.39.54-2.51 1.71-2.92 3.16-.48 1.71-.16 3.65.91 5.02 1.05 1.35 2.84 2.11 4.56 1.94 1.83-.17 3.43-1.44 3.96-3.19.34-1.12.33-2.3.33-3.47V0z" />
  </svg>
);

export default function ShareButton({
  url,
  title,
  description,
  variant = "public",
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const fullUrl = url.startsWith("http") ? url : `https://sitwithpd.com${url}`;

  const handleCopy = async (platform?: string) => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      if (platform) {
        setCopiedPlatform(platform);
        setTimeout(() => setCopiedPlatform(null), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const openPopup = (shareUrl: string) => {
    const width = 600;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      shareUrl,
      "share",
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`,
    );
  };

  const handleShare = async () => {
    if (variant === "public" && typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        });
        return;
      } catch (err) {
        // Fallback to dropdown if share fails or cancelled
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    }
  };

  const shareOptions = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${fullUrl}`)}`,
  };

  const publicOptions: ShareOption[] = [
    {
      name: "Facebook",
      icon: <Image src="/images/facebook.png" alt="Facebook" width={18} height={18} />,
      action: () => openPopup(shareOptions.facebook),
    },
    {
      name: "Twitter/X",
      icon: <Image src="/images/twitter.png" alt="Twitter" width={18} height={18} />,
      action: () => openPopup(shareOptions.twitter),
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4 text-[#0A66C2]" />,
      action: () => openPopup(shareOptions.linkedin),
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      action: () => openPopup(shareOptions.whatsapp),
    },
  ];

  const adminOptions: ShareOption[] = [
    {
      name: "Facebook",
      icon: <Image src="/images/facebook.png" alt="Facebook" width={18} height={18} />,
      action: () => openPopup(shareOptions.facebook),
    },
    {
      name: "Instagram",
      icon: <Image src="/images/instagram.png" alt="Instagram" width={18} height={18} />,
      label: "Copy for Instagram",
      action: () => handleCopy("Instagram"),
    },
    {
      name: "TikTok",
      icon: <Image src="/images/tiktok.png" alt="TikTok" width={18} height={18} />,
      label: "Copy for TikTok",
      action: () => handleCopy("TikTok"),
    },
  ];

  const currentOptions = variant === "public" ? publicOptions : adminOptions;

  return (
    <div className={cn("relative inline-block", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant === "admin" ? "outline" : "regular"}
            size={variant === "admin" ? "sm" : "default"}
            className={cn(
              "gap-2",
              variant === "admin" ? "w-8 h-8 p-0 border-none shadow-md" : "px-6 py-2",
            )}
            onClick={(e) => {
              if (variant === "public" && typeof navigator !== "undefined" && typeof navigator.share === "function") {
                e.preventDefault();
                handleShare();
              }
            }}
          >
            <Share2 className={cn(variant === "admin" ? "w-[15px] h-[15px] text-[#98A2B3]" : "w-4 h-4")} />
            {variant === "public" && <span className="hidden sm:inline">Share</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2 bg-white dark:bg-gray-900 border-none shadow-xl rounded-xl">
          {currentOptions.map((option) => (
            <DropdownMenuItem
              key={option.name}
              onClick={option.action}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group relative"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                {option.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {option.label || option.name}
                </span>
                {copiedPlatform === option.name && (
                  <span className="text-[10px] text-green-600 font-bold">
                    Link copied — paste it on {option.name}
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          {variant === "public" && (
            <>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-2" />
              <DropdownMenuItem
                onClick={() => handleCopy()}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Link2 className="w-4 h-4 text-gray-500" />
                  )}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
