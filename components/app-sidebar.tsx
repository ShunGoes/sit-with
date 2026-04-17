"use client";
import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarClock,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import Image from "next/image";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/",
      icon: <LayoutDashboard />,
    },
    {
      title: "Programs",
      url: "/admin/program",
      icon: <BookOpen />,
    },
    {
      title: "Consultation",
      url: "/admin/consultation",
      icon: <CalendarClock />,
    },
    {
      title: "Participants",
      url: "/admin/participants",
      icon: <Users />,
    },
    {
      title: "Blog",
      url: "/admin/blog",
      icon: <FileText />,
    },

    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 mt-5">
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
            Sit With PD
          </h4>
        </Link>
      </SidebarHeader>
      <div className="h-[30px]" />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu className="px-3 space-y-3">
          {data.navMain.map((item) => {
            const isActive =
              item.url === "/admin/"
                ? pathname === "/admin/"
                : pathname === item.url || pathname.startsWith(item.url + "/");

            return (
              <SidebarMenuItem key={item.title} className="h-11 cursor-pointer">
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className="px-3 h-full data-[active=true]:bg-[#EDFFD8] data-[active=true]:text-[#445b1c]"
                >
                  <Link
                    className="flex h-full items-center gap-2"
                    href={item.url}
                  >
                    {" "}
                    {item.icon} <span>{item.title} </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          {/* Logout Button */}
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => {
                const clearUser = useAuthStore.getState().clearUser;
                clearUser();
                window.location.href = "/login";
              }}
              className="text-[#B42318] h-11 font-medium hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <div className="flex gap-2 items-center">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
