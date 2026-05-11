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
import { BookOpen, LayoutDashboard, LogOut, MapPin, Settings } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { logout } from "@/lib/api/services/auth/auth.services";
import Image from "next/image";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import { useTheme } from "next-themes";

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
      title: "Camps",
      url: "/dashboard/camps",
      icon: <MapPin size={20} />,
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { data: dashboardData } = useGetDashboardData();
  const purchases = dashboardData?.data?.purchases ?? [];
  const campRegistrations = dashboardData?.data?.campRegistrations ?? [];
  
  const hasPurchases = purchases.length > 0;
  const hasCamps = campRegistrations.length > 0;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 mt-5">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2"
          onClick={() => setOpenMobile(false)}
        >
          <div className="w-[120px] h-[40px] relative ">
            <Image
              src={mounted && resolvedTheme === "light" ? "/images/light-mode-logo.png" : "/images/primary-logo.png"}
              alt="Sit With PD Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </SidebarHeader>
      <div className="h-[30px]" />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu className="px-3 space-y-3">
          {data.navMain.map((item) => {
            if (item.title === "My Programs" && !hasPurchases) {
              return null;
            }

            if (item.title === "Camps" && !hasCamps) {
              return null;
            }

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
