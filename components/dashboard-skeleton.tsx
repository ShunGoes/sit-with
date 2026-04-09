import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F7F7F7] dark:bg-[#0A0A0A]">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-[16rem] flex-col border-r border-[#EAECF0] dark:border-gray-800 bg-white dark:bg-[#0A0A0A] p-4 shrink-0">
        <Skeleton className="h-10 w-32 mb-8 bg-muted/60" />
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md bg-muted/60" />
          ))}
        </div>
        <div className="mt-auto">
          <Skeleton className="h-10 w-full rounded-md mb-4 bg-muted/60" />
          <Skeleton className="h-12 w-full rounded-md bg-muted/60" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 w-full items-center shrink-0 justify-between px-6 bg-white dark:bg-[#0A0A0A] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-md md:hidden bg-muted/60" />
            <Skeleton className="h-6 w-32 sm:w-48 bg-muted/60" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full ml-auto bg-muted/60" />
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 space-y-6 overflow-y-auto">
          {/* Breadcrumb or Title Skeleton */}
          <Skeleton className="h-8 w-48 mb-6 bg-muted/80" />

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-[10px] bg-muted/80" />
            ))}
          </div>

          {/* Quick Actions Skeleton */}
          <div className="flex gap-4 pt-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 min-w-[250px] flex-1 rounded-[10px] bg-muted/80" />
            ))}
          </div>

          {/* Main List / Table / Recent Activities Skeleton */}
          <div className="space-y-4 pt-2">
            <Skeleton className="h-6 w-1/4 bg-muted/80" />
            <Skeleton className="h-[40vh] w-full rounded-[16px] bg-muted/80" />
          </div>
        </main>
      </div>
    </div>
  );
}
