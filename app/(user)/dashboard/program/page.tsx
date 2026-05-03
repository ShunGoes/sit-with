"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import QueryStateHandler from "@/components/query-state-handler";

export default function UserProgramsPage() {
  const { data, isLoading, isError, error } = useGetDashboardData();
  const purchases = data?.data?.purchases ?? [];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header="Active Programmes"
        subtext={`You're enrolled in ${purchases.length} ${purchases.length === 1 ? "programme" : "programmes"}`}
      />

      <QueryStateHandler
        data={purchases}
        isLoading={isLoading}
        isError={isError}
        loadingMessage="Loading your programmes..."
        emptyMessage="You do not have any active programmes at this time"
        queryErrorMessage={error?.message}
        errorMessage="Can't fetch programmes at this time"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchases.map((purchase) => {
            const program = purchase.program;

            let badgeVariant: "warning" | "hibiscus" | "success" | "secondary" =
              "secondary";
            if (program.category === "LEADERS") badgeVariant = "warning";
            else if (program.category === "PROFESSIONALS")
              badgeVariant = "hibiscus";
            else if (program.category === "STUDENTS") badgeVariant = "success";

            const progressData = purchase.progress;
            const completedWeeks = progressData.completedWeeks;
            const totalWeeks = progressData.totalWeeks;
            const progressPercentage = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

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
                          {completedWeeks} of {totalWeeks} weeks completed
                        </span>
                        <span className="text-regular-button font-semibold">
                          {progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-[#f0f0f0] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-regular-button h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
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
      </QueryStateHandler>
    </div>
  );
}
