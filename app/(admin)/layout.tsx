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
import { Bell } from "lucide-react";

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
  const token = useAuthStore((state) => state);

  const firstName = user?.firstName ?? ""
  const lastName = user?.lastName ?? ""
  const userInitials = firstName.charAt(0) + lastName.charAt(0);

  console.log("Current user in ProtectedLayout:", token);
  const currentUser = data?.user || data?.data;

  useEffect(() => {
    if (isError) {
      router.replace("/login");
    } else if (currentUser && currentUser.role !== "ADMIN") {
      router.replace(currentUser.role === "USER" ? "/user" : "/login");
    }
  }, [isError, currentUser, router]);

  if (isLoading) return <DashboardSkeleton />;
  if (isError || currentUser?.role !== "ADMIN") return null;

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
             
            </div>
            <div className=" w-full flex items-center justify-end gap-3">
              <div className="w-11.5 h-11.5 bg-[#F5F7FA] dark:bg-dash-secondary-bg rounded-full relative flex items-center justify-center">
                <Bell color="#737791"/>
              </div>
             <div className="flex items-center gap-2">
               <p className="w-11.5 h-11.5 bg-[#F5F7FA] dark:bg-dash-secondary-bg text-secondary-text font-medium  rounded-full relative flex items-center justify-center">
               {userInitials}
              </p>
              <p className="text-base text-regular-button font-medium ">Admin</p>
             </div>
              {/* <div className="w-11.5 h-11.5 bg-[#F5F7FA] rounded-full relative flex items-center justify-center"> */}
                <ModeToggle />
              </div>
            {/* </div> */}
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
