"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { logout } from "@/lib/api/services/auth/auth.services";
import Image from "next/image";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "My Programs",
      url: "/dashboard/program",
      icon: <BookOpen />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
    },
  ],
};

export function AppUserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const settings = usePlatformSettingsStore((state) => state.settings);
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 mt-5">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2"
          onClick={() => setOpenMobile(false)}
        >
          <div className="w-[31px] h-[31px] relative ">
            <Image
              src="/images/logo.webp"
              alt="Sit With PD Logo"
              fill
              className="object-cover"
            />
          </div>
          <h4 className="text-sm font-semibold text-regular-button tracking-tight">
            {settings?.platformName || "Sit With PD"}
          </h4>
        </Link>
      </SidebarHeader>
      <div className="h-[30px]" />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu className="px-3 space-y-3">
          {data.navMain.map((item) => {
            const isActive =
              item.url === "/dashboard"
                ? pathname === "/dashboard"
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
                    onClick={() => setOpenMobile(false)}
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
              onClick={async () => {
                setOpenMobile(false);
                try {
                  await logout();
                } catch (e) {
                  console.error(e);
                }
                const clearUser = useAuthStore.getState().clearUser;
                clearUser();
                localStorage.removeItem("sit-with-auth");
                localStorage.removeItem("sit-with-token");
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
