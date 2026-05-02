"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProgramContent } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import { useModuleStore } from "@/store/use-module-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  Clock,
  CopyCheck,
  Video,
  BookOpen,
  FileQuestion,
  Check,
  ExternalLink,
  CheckCircle2,
  MoreVertical,
  MessageCircleMore,
} from "lucide-react";
import { messageFacilitator } from "@/components/modal-helper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatAppDate } from "@/lib/utils";
import type { Module, Week } from "@/lib/api/services/dashboard/dashboard.services";

export default function WeekDetailPage() {
  const router = useRouter();
  const params = useParams();
  const programId = params.programId as string;
  const weekId = params.weekId as string;

  const { data: programResponse, isLoading } = useGetProgramContent(programId);
  const { getModuleStatus, startModule, completeModule } = useModuleStore();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[900px]">
        <Skeleton className="h-5 w-24 mb-2" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-2/3" />
          <div className="flex gap-4 mt-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <Skeleton className="h-4 w-full rounded-full mt-2" />
        <Skeleton className="h-32 w-full rounded-2xl mt-2" />
        <div className="mt-4 flex flex-col gap-4">
          <Skeleton className="h-7 w-32" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const program = programResponse?.data;
  const week: Week | undefined = program?.weeks.find((w) => w.id === weekId);

  if (!program || !week) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-lg font-semibold text-secondary-text">
          Week not found
        </p>
        <Button variant="regular" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const modules = [...(week.modules ?? [])].sort((a, b) => a.order - b.order);
  const totalModules = modules.length;

  // Merge API isCompleted with store status (store takes precedence for completed)
  const resolvedStatuses = modules.map((mod) => {
    const storeStatus = getModuleStatus(mod.id);
    if (storeStatus === "completed" || mod.isCompleted) return "completed";
    if (storeStatus === "started") return "started";
    return "not-started";
  });

  const completedCount = resolvedStatuses.filter((s) => s === "completed").length;
  const progressPercentage =
    totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const getModuleIcon = (type: string, status: string) => {
    let iconColor = "text-[#667085]";
    let bgColor = "bg-[#F2F4F7]";
    let IconComp = Video;

    if (status === "completed") {
      iconColor = "text-[#05603A]";
      bgColor = "bg-[#ECFDF3]";
    } else if (status === "started") {
      iconColor = "text-[#DC6803]";
      bgColor = "bg-[#FFFAEB]";
    }

    if (type === "VIDEO") IconComp = Video;
    else if (type === "READING") IconComp = BookOpen;
    else if (type === "QUIZ") IconComp = FileQuestion;

    return (
      <div
        className={`w-11 h-11 rounded-lg flex shrink-0 items-center justify-center ${bgColor} ${iconColor}`}
      >
        <IconComp size={18} />
      </div>
    );
  };

  const handleModuleAction = (mod: Module, currentStatus: string) => {
    if (currentStatus === "not-started") {
      startModule(mod.id);
    }
    // Navigate to content URL if present
    if (mod.contentUrl) {
      window.open(mod.contentUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Parse week label and subtitle from title like "Week 1: Foundations of Leadership"
  const weekLabel = week.title.startsWith("Week")
    ? week.title.split(":")[0].trim()
    : `Week ${week.order}`;
  const weekSubtitle = week.title.includes(":")
    ? week.title.split(":").slice(1).join(":").trim()
    : week.title;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[900px] relative">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-brand-green font-medium flex items-center gap-2 w-fit hover:underline text-sm"
      >
        <ChevronLeft size={16} />
        Go Back
      </button>

      {/* Header section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Badge
            variant="success"
            className=""
          >
            {weekLabel}
          </Badge>
          {program.startDate && (
            <span className="text-xs text-secondary-text ">
              Due:{" "}
              {formatAppDate(program.startDate, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <h1 className="xl:text-[1.75rem] text-2xl font-semibold text-secondary-text leading-tight">
          {weekSubtitle || week.title}
        </h1>

        {week.description && (
          <p className="text-primary-text text-base">{week.description}</p>
        )}

        <div className="flex items-center gap-6 mt-1 text-sm text-secondary-text font-medium">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{program.hoursPerWeek ?? 0} hrs total</span>
          </div>
          <div className="flex items-center gap-2">
            <CopyCheck size={16} />
            <span>{totalModules} modules</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-semibold text-primary-text">
          <span>
            Progress: {completedCount} of {totalModules} completed
          </span>
          <span className="text-regular-button">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-[#E4E7EC] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-regular-button h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Learning Objectives */}
      {week.learningObjectives && week.learningObjectives.length > 0 && (
        <div className="bg-[#F9FAFB] dark:bg-[#1A1A1A] border border-[#EAECF0] dark:border-[#333] rounded-[12px] p-6">
          <h3 className="text-base font-semibold text-secondary-text mb-4">
            Learning Objectives
          </h3>
          <ul className="flex flex-col gap-3">
            {week.learningObjectives.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-primary-text leading-relaxed"
              >
                <Check
                  className="text-regular-button shrink-0 mt-0.5"
                  size={18}
                />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modules */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-primary-text">Modules</h2>

        {modules.map((mod, idx) => {
          const status = resolvedStatuses[idx];
          const actionLabel =
            status === "completed"
              ? "View Content"
              : status === "started"
              ? "Continue"
              : "Start";

          return (
            <div
              key={mod.id}
              className="bg-dash-secondary-bg border-[0.67px] border-[#EAECF0] dark:border-[#333] rounded-[12px] p-5 flex items-center justify-between gap-4"
            >
              {/* Left: Icon + Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {getModuleIcon(mod.type, status)}

                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h4 className="font-semibold text-base text-econdary-text leading-snug">
                    {mod.title}
                  </h4>
                  {mod.description && (
                    <p className="text-sm text-primary-text line-clamp-2">
                      {mod.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs font-medium text-primary-text mt-1">
                    <span className="capitalize">{mod.type.toLowerCase()}</span>
                    {mod.duration && <span>{mod.duration}</span>}
                    {mod.contentUrl && (
                      <span className="flex items-center gap-1 text-regular-button">
                        <ExternalLink size={11} />
                        Has content
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0 pl-2">
                {status === "completed" ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="text-regular-button shrink-0"
                      size={20}
                    />
                    {mod.contentUrl && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hidden md:flex text-regular-button border border-regular-button text-xs whitespace-nowrap"
                          onClick={() =>
                            window.open(
                              mod.contentUrl!,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                        >
                          View Course
                        </Button>
                        <div className="md:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-regular-button n">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[200px] h-16 ">
                              <DropdownMenuItem
                              className="h-full"
                                onClick={() =>
                                  window.open(
                                    mod.contentUrl!,
                                    "_blank",
                                    "noopener,noreferrer"
                                  )
                                }
                              >
                                <ExternalLink size={14} className="mr-2" />
                                View Course
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Button
                      variant={status === "started" ? "regular" : "outline"}
                      size="sm"
                      className={`w-[90px] text-sm ${
                        status === "not-started"
                          ? "border-[#D0D5DD] text-[#344054]"
                          : ""
                      }`}
                      onClick={() => handleModuleAction(mod, status)}
                    >
                      {actionLabel}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-regular-button border border-regular-button"
                      onClick={() => completeModule(mod.id)}
                      title="Mark as completed"
                    >
                      <Check size={14} />
                      Done
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-10 right-10 z-50 pointer-events-auto">
        <button
          onClick={() => messageFacilitator(programId)}
          className="w-14 h-14 bg-regular-button rounded-full flex items-center justify-center text-white shadow-lg hover:bg-brand-green transition-all duration-300"
          aria-label="Message Facilitator"
        >
          <MessageCircleMore size={28} />
        </button>
      </div>
    </div>
  );
}
