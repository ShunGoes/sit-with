"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProgramContent, useCompleteModule } from "@/lib/api/hooks/dashboard/dashboard.hooks";
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
  ChevronDown,
  ChevronUp,
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
import Player from "@vimeo/player";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

// Extract youtube ID from URL
const extractYouTubeId = (content: string) => {
  const match = content.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

// extract vimeo ID from URL
const extractVimeoId = (content: string) => {
  const match = content.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};


// this components opens up when we click on a module. it dynamicallys display youtube video, embed content or links that opens in new tab depending on the type of contentUrl it receives 
const ModuleViewer = ({
  module,
  onComplete,
  isCompleted,
}: {
  module: Module;
  onComplete: () => void;
  isCompleted: boolean;
}) => {
  const ytPlayerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const content = module.contentUrl || module.embedCode || "";

    if (module.platform === "YOUTUBE" || module.platform === "EMBED_YOUTUBE") {
      const videoId = extractYouTubeId(content);
      if (!videoId || !ytPlayerRef.current) return;

      const initYouTube = () => {
        if (!window.YT) return;
        new window.YT.Player(ytPlayerRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                if (!isCompleted) onComplete();
              }
            },
          },
        });
      };

      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = initYouTube;
      } else {
        initYouTube();
      }
    } else if (module.platform === "VIMEO" || module.platform === "EMBED_VIMEO") {
      const videoId = extractVimeoId(content);
      if (!videoId || !vimeoPlayerRef.current) return;

      const player = new Player(vimeoPlayerRef.current, {
        id: parseInt(videoId, 10),
        responsive: true,
      });

      player.on("ended", () => {
        if (!isCompleted) onComplete();
      });
    }
  }, [module, onComplete, isCompleted]);

  if (module.platform === "YOUTUBE" || module.platform === "EMBED_YOUTUBE") {
    return (
      <div className="mt-4">
        <div ref={ytPlayerRef} className="w-full aspect-video rounded-xl overflow-hidden bg-black" />
      </div>
    );
  }

  if (module.platform === "VIMEO" || module.platform === "EMBED_VIMEO") {
    return (
      <div className="mt-4">
        <div ref={vimeoPlayerRef} className="w-full aspect-video rounded-xl overflow-hidden bg-black" />
      </div>
    );
  }

  if (module.platform === "EMBED_UNKNOWN" && module.contentUrl) {
    return (
      <div className="mt-4 flex flex-col gap-4">
        <div
          className="w-full aspect-video rounded-xl overflow-hidden bg-black [&>iframe]:w-full [&>iframe]:h-full"
          dangerouslySetInnerHTML={{ __html: module.contentUrl }}
        />
        {!isCompleted && (
          <Button onClick={onComplete} className="w-fit mx-auto" variant="regular">
            Mark as complete
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4 items-center">
      <div className="p-6 bg-[#F9FAFB] dark:bg-[#1A1A1A] rounded-xl border border-[#EAECF0] dark:border-[#333] flex flex-col items-center justify-center gap-4 w-full">
        <p className="text-sm text-secondary-text">This content opens in a new tab.</p>
        {module.contentUrl && (
          <Button onClick={() => window.open(module.contentUrl!, "_blank", "noopener,noreferrer")} variant="outline" className="border-regular-button text-regular-button">
            Open Content <ExternalLink className="ml-2" size={14} />
          </Button>
        )}
      </div>
      {!isCompleted && (
        <Button onClick={onComplete} className="w-fit" variant="regular">
          Mark as complete
        </Button>
      )}
    </div>
  );
};



// WEEK DETAILS PAGE OVERALL COMPONENT
export default function WeekDetailPage() {
  const router = useRouter();
  const params = useParams();
  const programId = params.programId as string;
  const weekId = params.weekId as string;

  const { data: programResponse, isLoading } = useGetProgramContent(programId);
  const { mutate: completeModule } = useCompleteModule();
  
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // skeleton loaders 
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
        <p className="text-lg font-semibold text-secondary-text">Week not found</p>
        <Button variant="regular" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const modules = [...(week.modules ?? [])].sort((a, b) => a.order - b.order);
  
  const progress = program.progress;
  const weekProgressData = progress.weeks.find((w) => w.weekId === weekId);
  const completedModulesCount = weekProgressData?.modulesCompletedCount ?? 0;
  const totalModulesCount = weekProgressData?.moduleCount ?? 0;
  const progressPercentage = totalModulesCount > 0 ? Math.round((completedModulesCount / totalModulesCount) * 100) : 0;

  // Dynamically render icon type for each module based on module type and state 
  const getModuleIcon = (type: string, isCompleted: boolean) => {
    let iconColor = isCompleted ? "text-[#05603A]" : "text-[#667085]";
    let bgColor = isCompleted ? "bg-[#ECFDF3]" : "bg-[#F2F4F7]";
    let IconComp = Video;

    if (type === "VIDEO") IconComp = Video;
    else if (type === "READING") IconComp = BookOpen;
    else if (type === "QUIZ") IconComp = FileQuestion;
    else if (type === "ASSIGNMENT") IconComp = CopyCheck;

    return (
      <div className={`w-11 h-11 rounded-lg flex shrink-0 items-center justify-center ${bgColor} ${iconColor}`}>
        <IconComp size={18} />
      </div>
    );
  };

  // runs when users click on a module card 
  const handleModuleAction = (mod: Module) => {
    if (expandedModuleId === mod.id) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(mod.id);
      if (mod.platform === "EXTERNAL") {
        if (mod.contentUrl) {
          window.open(mod.contentUrl, "_blank", "noopener,noreferrer");
        }
      }
    }
  };

  const handleComplete = (moduleId: string) => {
    completeModule({ programId, moduleId });
  };

  const weekLabel = week.title.startsWith("Week") ? week.title.split(":")[0].trim() : `Week ${week.order}`;
  const weekSubtitle = week.title.includes(":") ? week.title.split(":").slice(1).join(":").trim() : week.title;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[900px] relative">
      <button
        onClick={() => router.back()}
        className="text-regular-button font-medium flex items-center gap-2 w-fit hover:underline text-sm"
      >
        <ChevronLeft size={16} />
        Go Back
      </button>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="success">{weekLabel}</Badge>
          {program.startDate && (
            <span className="text-xs text-secondary-text">
              Due: {formatAppDate(program.startDate, { month: "long", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>

        <h1 className="xl:text-[1.75rem] text-2xl font-semibold text-secondary-text leading-tight">
          {weekSubtitle || week.title}
        </h1>

        {week.description && <p className="text-primary-text text-base">{week.description}</p>}

        <div className="flex items-center gap-6 mt-1 text-sm text-secondary-text font-medium">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{program.hoursPerWeek ?? 0} hrs total</span>
          </div>
          <div className="flex items-center gap-2">
            <CopyCheck size={16} />
            <span>{modules.length} modules this week</span>
          </div>
        </div>
      </div>

          {/* Progress bar  */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-semibold text-primary-text">
          <span>Progress: {completedModulesCount} of {totalModulesCount} modules completed</span>
          <span className="text-regular-button">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-[#E4E7EC] h-2.5 rounded-full overflow-hidden">
          <div className="bg-regular-button h-full rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      {week.learningObjectives && week.learningObjectives.length > 0 && (
        <div className="bg-[#F9FAFB] dark:bg-[#1A1A1A] border border-[#EAECF0] dark:border-[#333] rounded-[12px] p-6">
          <h3 className="text-base font-semibold text-secondary-text mb-4">Learning Objectives</h3>
          <ul className="flex flex-col gap-3">
            {week.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-primary-text leading-relaxed">
                <Check className="text-regular-button shrink-0 mt-0.5" size={18} />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}


      {/*  MODULES CARDS STARTS HERE */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-primary-text">Modules</h2>

        {modules.map((mod) => {
          const isCompleted = mod.isCompleted;
          const isExpanded = expandedModuleId === mod.id;

          console.log()
          return (
            <div
              key={mod.id}
              className="bg-dash-secondary-bg border-[0.67px] border-[#EAECF0] dark:border-[#333] rounded-[12px] p-5 flex flex-col gap-4 transition-all"
            >
              <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => handleModuleAction(mod)}>
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {getModuleIcon(mod.type, isCompleted)}

                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h4 className="font-semibold text-base text-econdary-text leading-snug">{mod.title}</h4>
                    {mod.description && <p className="text-sm text-primary-text line-clamp-2">{mod.description}</p>}
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

                <div className="flex items-center gap-2 shrink-0 pl-2">
                  {isCompleted ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-regular-button shrink-0" size={20} />
                      <span className="text-sm font-medium text-regular-button hidden md:block">Completed</span>
                      {isExpanded ? <ChevronUp size={20} className="text-[#667085]" /> : <ChevronDown size={20} className="text-[#667085]" />}
                    </div>
                  ) : (
                    <div className="flex items-center  gap-2">
                      <Button
                        variant={isExpanded ? "outline" : "regular"}
                        size="sm"
                        className={`w-[110px] text-sm ${!isExpanded ? "" : "border-regular-button text-regular-button"}`}
                        onClick={(e) => { e.stopPropagation(); handleModuleAction(mod); }}
                      >
                        {isExpanded ? "Close" : "Start"}
                      </Button>
                      {(mod.platform === "EXTERNAL" || mod.platform === "EMBED_UNKNOWN") && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 text-regular-button border-regular-button hover:bg-regular-button/10"
                          onClick={(e) => { e.stopPropagation(); handleComplete(mod.id); }}
                          title="Mark as completed"
                        >
                          <CheckCircle2 size={18} />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-[#EAECF0] dark:border-[#333] pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <ModuleViewer 
                    module={mod} 
                    isCompleted={isCompleted} 
                    onComplete={() => handleComplete(mod.id)} 
                  />
                </div>
              )}
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
