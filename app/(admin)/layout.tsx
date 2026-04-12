"use client"

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Poppins } from "next/font/google";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { useGetCurrentUser } from "@/lib/api/hooks/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { useAuthStore } from "@/store/use-auth-store";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  preload: false,
});

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useGetCurrentUser();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // console.log("Current user in ProtectedLayout:", user, data);

  // useEffect(() => {
  //   if (isError) {
  //     router.replace("/login");
  //   } else if (data?.user && data.user.role !== "ADMIN") {
  //     router.replace(data.user.role === "USER" ? "/user" : "/login");
  //   }
  // }, [isError, data, router]);

  
  // if (isLoading) return <DashboardSkeleton />;
  // if (isError || data.data.role !== "ADMIN") return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 w-full justify-between pr-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>
              <ModeToggle />
            </div>
          </header>
          <div
            className={`flex flex-1 flex-col bg-[#F7F7F7] dark:bg-[#0A0A0A] gap-4 p-4 mt-10 md:mt-0 lg:p-10  ${poppins.className}`}
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
