import React from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    id: "leadership-essentials",
    title: "Leadership Essentials",
    category: "Leaders",
    badgeVariant: "warning" as const,
    progress: { current: 3, total: 12, percentage: 25 },
    nextSession: "Friday, April 11 at 2:00 PM",
  },
  {
    id: "executive-leadership",
    title: "Executive Leadership",
    category: "Leaders",
    badgeVariant: "warning" as const,
    progress: { current: 2, total: 8, percentage: 15 },
    nextSession: "Monday, April 14 at 10:00 AM",
  },
  {
    id: "professional-growth",
    title: "Professional Growth Program",
    category: "Professionals",
    badgeVariant: "hibiscus" as const,
    progress: { current: 5, total: 10, percentage: 50 },
  },
];

export default function UserProgramsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header="Active Programmes"
        subtext={`You're enrolled in ${programs.length} programmes`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col pt-6 pb-6 px-6 h-[280px]"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-semibold text-lg text-primary-text leading-tight w-[60%]">
                {program.title}
              </h3>
              <Badge variant={program.badgeVariant}>{program.category}</Badge>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              {/* Progress */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-secondary-text font-medium">
                  <span>
                    Week {program.progress.current} of {program.progress.total}
                  </span>
                  <span className="text-brand-green">
                    {program.progress.percentage}%
                  </span>
                </div>
                <div className="w-full bg-[#f0f0f0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#609960] h-full rounded-full"
                    style={{ width: `${program.progress.percentage}%` }}
                  />
                </div>
              </div>

              {/* Next session or spacer */}
              <div className="h-5 flex items-center text-xs text-secondary-text font-medium mt-2">
                {program.nextSession ? (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{program.nextSession}</span>
                  </div>
                ) : null}
              </div>

              {/* Action Button */}
              <Link href={`/dashboard/program/${program.id}`}>
                <Button className="w-full border-transparent" variant="default">
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
