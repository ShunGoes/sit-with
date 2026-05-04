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
  useSidebar,
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
  Tent,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { logout } from "@/lib/api/services/auth/auth.services";
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
      title: "Camps",
      url: "/admin/camps",
      icon: <Tent />,
    },
    {
      title: "Consultation",
      url: "/admin/consultation",
      icon: <CalendarClock />,
    },
    {
      title: "Blog",
      url: "/admin/blog",
      icon: <FileText />,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: <MessageSquare />,
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
  const settings = usePlatformSettingsStore((state) => state.settings);
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 mt-5">
        <Link 
          href="/admin" 
          className="flex items-center gap-2"
          onClick={() => setOpenMobile(false)}
        >
          <div className="w-[120px] h-[40px] relative ">
            <Image
              src="/images/primary-logo.png"
              alt="Sit With PD Logo"
              fill
              className="object-contain"
            />
          </div>
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
                try { await logout(); } catch (e) { console.error(e); }
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
