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
import { BookOpen, CalendarClock, FileText, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/",
      icon: <LayoutDashboard />
    },
     {
      title: "Programs",
      url: "/admin/program",
      icon: <BookOpen />
    },
     {
      title: "Consultation",
      url: "/admin/consultation",
      icon: <CalendarClock />
    },
     {
      title: "Participants",
      url: "/admin/participants",
      icon: <Users />
    },
    {
      title: "Blog",
      url: "/admin/blog",
      icon: <FileText />
    },
   
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings />
    },
  
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu>
          {data.navMain.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(item.url + "/");

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                >
                  <div className="flex gap-2 items-center">
                    {item.icon}
                    <Link href={item.url}>{item.title}</Link>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          
          {/* Logout Button */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => {
                const clearUser = useAuthStore.getState().clearUser;
                clearUser();
                window.location.href = "/login";
              }}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
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
