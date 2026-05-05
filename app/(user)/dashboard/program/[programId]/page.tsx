"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProgramContent } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  Clock,
  Calendar,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function ProgramDetailPage() {
  const router = useRouter();
  const params = useParams();
  const programId = params.programId as string;

  const { data: programResponse, isLoading } = useGetProgramContent(programId);
  const program = programResponse?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[1000px]">
        <Skeleton className="h-5 w-24 mb-2" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-[12px]" />
          ))}
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-lg font-semibold text-secondary-text">
          Programme not found
        </p>
        <Button variant="regular" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  // Badge variant based on category
  let badgeVariant: "warning" | "hibiscus" | "success" | "secondary" =
    "secondary";
  if (program.category === "LEADERS") badgeVariant = "warning";
  else if (program.category === "PROFESSIONALS") badgeVariant = "hibiscus";
  else if (program.category === "STUDENTS") badgeVariant = "success";

  // Calculate overall progress
  const progress = program.progress;
  const totalModules = progress.totalModules;
  const completedModules = progress.completedModules;
  const progressPercentage = progress.percentComplete;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1000px]">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-regular-button font-medium flex items-center gap-2 w-fit hover:underline text-sm"
      >
        <ChevronLeft size={16} />
        Go Back
      </button>

      {/* Programme Overview Card — same design as /dashboard card */}
      <div className="bg-dash-secondary-bg rounded-[12px] border-[0.67px] border-[#EAECF0] dark:border-none p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="xl:text-2xl-text text-xl font-semibold text-secondary-text">
            {program.title}
          </h2>
          <Badge variant={badgeVariant}>{program.category}</Badge>
        </div>

        {program.description && (
          <p className="text-sm text-primary-text mb-4">
            {program.description}
          </p>
        )}

        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 text-[#667085] text-sm">
            <Clock size={16} />
            <span>
              {program.weeks.length}{" "}
              {program.weeks.length === 1 ? "week" : "weeks"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#667085] text-sm">
            <Calendar size={16} />
            <span>
              {program.hoursPerWeek ?? 0}
              {program.hoursPerWeek === 1 ? "hr" : "hrs"}/week
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-primary-text">
              Progress: {completedModules} of {totalModules} modules completed
            </span>
            <span className="font-semibold text-regular-button">
              {progressPercentage}%
            </span>
          </div>
          <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
            <div
              className="h-full bg-regular-button transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weeks List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-secondary-text">
          Programme Content
        </h3>
        <p className="text-sm text-secondary-text -mt-1">
          {program.weeks.length} {program.weeks.length === 1 ? "week" : "weeks"}{" "}
          · Click on any week to view its modules
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {program.weeks
            .sort((a, b) => a.order - b.order)
            .map((week) => {
              const weekProgressData = progress.weeks.find((w) => w.weekId === week.id);
              const weekTotal = weekProgressData?.moduleCount ?? 0;
              const weekCompleted = weekProgressData?.modulesCompletedCount ?? 0;
              const weekProgress = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;
              const isWeekDone = weekProgressData?.isWeekComplete ?? false;

              if (week.modules.length === 0) return;

              return (
                <div
                  key={week.id}
                  className="bg-dash-secondary-bg rounded-[12px] border-[0.67px] border-[#EAECF0] flex flex-col md:flex-row gap-4 dark:border-none p-6"
                >

                  {/* week number and title  */}
                  <Badge
                    variant={isWeekDone ? "success" : "secondary"}
                    className="text-xs font-semibold px-2.5 py-0.5 shrink-0 "
                  >
                    {week.title.startsWith("Week")
                      ? week.title.split(":")[0]
                      : `Week ${week.order}`}
                  </Badge>

                  <div className="w-full">
                    {/* Week header */}
                    <div className="flex items-center justify-between gap-3 mb-3 w-full">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-secondary-text">
                          {week.title.includes(":")
                            ? week.title.split(":").slice(1).join(":").trim()
                            : week.title}
                        </h4>
                      </div>
                      <span className="text-xs font-medium text-regular-button shrink-0">
                        {weekProgress}%
                      </span>
                    </div>

                    {week.description && (
                      <p className="text-sm text-secondary-text mb-3">
                        {week.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center gap-2 text-primary-text text-sm">
                        <BookOpen size={14} />
                        <span>
                          {weekTotal} {weekTotal === 1 ? "module" : "modules"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary-text text-sm">
                        <span>
                          {weekCompleted} of {weekTotal} completed
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="space-y-2 mb-4">
                      <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-regular-button transition-all duration-300"
                          style={{ width: `${weekProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`/dashboard/program/${programId}/${week.id}`}>
                      <Button variant="regular" className="w-full">
                        {isWeekDone
                          ? "Review Week"
                          : weekCompleted > 0
                            ? "Continue Week"
                            : "Start Week"}
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </Link>

                    <div></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
