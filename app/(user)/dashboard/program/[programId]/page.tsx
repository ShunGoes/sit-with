"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Clock, 
  CopyCheck, 
  Video, 
  BookOpen, 
  FileQuestion,
  Check,
  CheckSquare
} from "lucide-react";
import { useRouter } from "next/navigation";

const programDetail = {
  title: "Communication & Influence",
  description: "Learn how to communicate effectively as a leader and influence your team members positively.",
  week: "Week 3",
  dueDate: "April 14, 2026",
  totalHours: "4.5 hours total",
  totalModulesCount: 6,
  completedModules: 2,
  progressPercentage: 33,
  objectives: [
    "Understand different communication styles and adapt your approach",
    "Learn techniques for active listening and giving feedback",
    "Master the art of persuasion and influence without authority",
    "Develop skills for difficult conversations and conflict resolution"
  ],
  modules: [
    {
      id: 1,
      title: "Introduction to Leadership Communication",
      description: "Explore the fundamentals of effective leadership communication",
      type: "Video",
      duration: "45 min",
      status: "completed",
      iconType: "video"
    },
    {
      id: 2,
      title: "Active Listening Techniques",
      description: "Learn how to truly listen and understand your team members",
      type: "Reading",
      duration: "30 min",
      status: "completed",
      iconType: "reading"
    },
    {
      id: 3,
      title: "The Art of Persuasion",
      description: "Discover strategies to influence others and gain buy-in",
      type: "Video",
      duration: "1 hour",
      status: "in-progress",
      action: "Continue",
      iconType: "video"
    },
    {
      id: 4,
      title: "Communication Style Assessment",
      description: "Take a quiz to identify your communication style",
      type: "Quiz",
      duration: "20 min",
      status: "not-started",
      action: "Start",
      iconType: "quiz"
    },
    {
      id: 5,
      title: "Giving Effective Feedback",
      description: "Learn frameworks for delivering constructive feedback",
      type: "Video",
      duration: "50 min",
      status: "not-started",
      action: "Start",
      iconType: "video"
    }
  ]
};

export default function ProgramDetailPage() {
  const router = useRouter();

  const getModuleIcon = (type: string, status: string) => {
    let iconColorClass = "";
    let bgColorClass = "";
    let IconComp = Video;

    if (status === "completed") {
      iconColorClass = "text-[#05603A]";
      bgColorClass = "bg-[#ECFDF3]";
    } else if (status === "in-progress") {
      iconColorClass = "text-[#DC6803]";
      bgColorClass = "bg-[#FFFAEB]";
    } else {
      iconColorClass = "text-[#667085]";
      bgColorClass = "bg-[#F2F4F7]";
    }

    if (type === "video") IconComp = Video;
    if (type === "reading") IconComp = BookOpen;
    if (type === "quiz") IconComp = FileQuestion;

    return (
      <div className={`w-12 h-12 rounded-lg flex flex-shrink-0 items-center justify-center ${bgColorClass} ${iconColorClass}`}>
        <IconComp size={20} />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[900px]">
      <button 
        onClick={() => router.back()} 
        className="text-brand-green font-medium flex items-center gap-2 mb-2 w-fit hover:underline text-sm"
      >
        <ChevronLeft size={16} /> Go Back
      </button>

      {/* Header section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="success" className="font-semibold px-3 py-1 rounded-full">{programDetail.week}</Badge>
          <span className="text-sm text-secondary-text font-medium">Due: {programDetail.dueDate}</span>
        </div>
        
        <h1 className="text-[2rem] font-bold text-primary-text leading-tight mt-2">
          {programDetail.title}
        </h1>
        <p className="text-secondary-text text-base">
          {programDetail.description}
        </p>

        <div className="flex items-center gap-6 mt-2 text-sm text-secondary-text font-medium">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{programDetail.totalHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <CopyCheck size={16} />
            <span>{programDetail.totalModulesCount} modules</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center text-sm font-semibold text-primary-text">
          <span>Progress: {programDetail.completedModules} of {programDetail.totalModulesCount} completed</span>
          <span className="text-brand-green">{programDetail.progressPercentage}%</span>
        </div>
        <div className="w-full bg-[#E4E7EC] h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-brand-green h-full rounded-full" 
            style={{ width: `${programDetail.progressPercentage}%` }} 
          />
        </div>
      </div>

      {/* Learning Objectives box */}
      <div className="bg-[#F9FAFB] dark:bg-[#1A1A1A] border border-[#EAECF0] dark:border-[#333] rounded-2xl p-6 mt-4">
        <h3 className="text-base font-semibold text-primary-text mb-4">Learning Objectives</h3>
        <ul className="flex flex-col gap-3">
          {programDetail.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-secondary-text leading-relaxed">
              <Check className="text-brand-green flex-shrink-0 mt-0.5" size={18} />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modules */}
      <div className="mt-8 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-primary-text mb-2">Modules</h2>
        
        {programDetail.modules.map((mod) => (
          <div 
            key={mod.id} 
            className="bg-white dark:bg-dash-secondary-bg border border-[#EAECF0] dark:border-[#333] rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              {getModuleIcon(mod.iconType, mod.status)}
              
              <div className="flex flex-col gap-1.5 flex-1">
                <h4 className="font-semibold text-base text-primary-text">{mod.title}</h4>
                <p className="text-sm text-secondary-text">{mod.description}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-secondary-text mt-1">
                  <span>{mod.type}</span>
                  <span>{mod.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 pl-4 flex items-center justify-end w-[120px]">
              {mod.status === "completed" && (
                <Check className="text-brand-green" size={24} />
              )}
              {mod.status === "in-progress" && (
                <Button variant="default" className="w-[100px]">
                  {mod.action}
                </Button>
              )}
              {mod.status === "not-started" && (
                <Button variant="outline" className="w-[100px] border-[#D0D5DD] text-[#344054] dark:border-[#333] dark:text-[#E4E7EC] hover:bg-gray-50 dark:hover:bg-[#1A1A1A]">
                  {mod.action}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
