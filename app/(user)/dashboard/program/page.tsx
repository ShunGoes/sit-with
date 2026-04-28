"use client"

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";



export default function UserProgramsPage() {
    const { data, isLoading } = useGetDashboardData();
      const purchases = data?.data?.purchases ?? [];
      
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header="Active Programmes"
        subtext={`You're enrolled in ${purchases.length} ${purchases.length === 1 ? 'programme' : 'programmes'}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {purchases.map((purchase) => {
          const program = purchase.program;
          
          let badgeVariant: "warning" | "hibiscus" | "success" | "secondary" = "secondary";
          if (program.category === "LEADERS") badgeVariant = "warning";
          else if (program.category === "PROFESSIONALS") badgeVariant = "hibiscus";
          else if (program.category === "STUDENTS") badgeVariant = "success";

          // Placeholder progress for now as it's not in the API yet
          const progress = { current: 1, total: program.durationWeeks || 0, percentage: 10 };

          return (
            <div
              key={purchase.id}
              className="bg-dash-secondary-bg rounded-[12px] border-[0.67px] border-[#EAECF0] dark:border-none overflow-hidden flex flex-col  p-4 "
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-semibold text-lg text-primary-text leading-tight line-clamp-2 w-[60%]">
                  {program.title}
                </h3>
                <Badge variant={badgeVariant}>{program.category}</Badge>
              </div>

              <div className="mt-auto flex flex-col gap-4">
                {/* Progress */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs text-secondary-text font-normal">
                    <span>
                      Week {progress.current} of {progress.total}
                    </span>
                    <span className="text-regular-button font-semibold">
                      {progress.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[#f0f0f0] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-regular-button h-full rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/dashboard/program/${purchase.programId}`}>
                  <Button className="w-full" variant="regular">
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
