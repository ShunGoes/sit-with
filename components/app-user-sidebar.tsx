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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
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

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pt-6 pb-4 px-6 flex items-start justify-center">
        {/* Make sure the logo is visible and placed nicely */}
        <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg flex items-center gap-2">
              <span className="text-green-500 text-2xl">🌱</span> Sit With PD
            </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu className="px-4 gap-2 mt-4">
          {data.navMain.map((item) => {
            const isActive =
              pathname === item.url || (pathname.startsWith(item.url + "/") && item.url !== "/dashboard");

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className={`py-6 px-4 rounded-xl ${isActive ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                >
                  <Link href={item.url} className="flex gap-4 items-center">
                    {item.icon}
                    <span className="font-medium text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          
          {/* Logout Button */}
          <div className="mt-auto pb-8 pt-4">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                onClick={() => {
                  const clearUser = useAuthStore.getState().clearUser;
                  clearUser();
                  window.location.href = "/login";
                }}
                className="py-6 px-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
              >
                <div className="flex gap-4 items-center">
                  <LogOut size={20} />
                  <span className="font-medium text-base">Log out</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
