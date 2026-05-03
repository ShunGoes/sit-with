import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Purchase } from "@/lib/api/services/dashboard/dashboard.services";
import { Calendar, Clock, Monitor, User } from "lucide-react";
import Link from "next/link";

export default function ProgramCards({ purchase }: { purchase: Purchase }) {

  let programStatusBadge:
    | "warning"
    | "hibiscus"
    | "success"
    | "secondary"
    | "link"
    | "default"
    | "outline"
    | "ghost"
    | "destructive"
    | null
    | undefined;

  if (purchase.program.category === "LEADERS") {
    programStatusBadge = "warning";
  } else if (purchase.program.category === "PROFESSIONALS") {
    programStatusBadge = "hibiscus";
  } else if (purchase.program.category === "STUDENTS") {
    programStatusBadge = "success";
  } else {
    programStatusBadge = "secondary";
  }

  const cardLabel = "text-[#667085] text-xs ";
  const cardValue = "text-primary-text text-sm font-semibold";
  
  const completedWeeks = purchase.progress.completedWeeks;
  const totalWeeks = purchase.progress.totalWeeks;
  const progressPercentage = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

  
  return (
    <div>
      <div className="bg-dash-secondary-bg rounded-[16px] dark:border-none border-2 border-[#E8E9E7] p-6">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="xl:text-2xl text-xl font-semibold text-primary-text">
            {purchase.program.title}
          </h2>
          <Badge variant={programStatusBadge}>
            {purchase.program.category}
          </Badge>
        </div>

        <p className="text-primary-text text-base mb-8 leading-relaxed ">
          {purchase.program.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-10">
          <div className="bg-[#F9FAFB] dark:bg-transparent rounded-2xl p-5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#445b1c] shadow-sm">
              <Calendar size={18} />
            </div>
            <div>
              <p className={cardLabel}>Duration</p>
              <p className={cardValue}>
                {purchase.program?._count?.weeks ?? 0} Weeks
              </p>
            </div>
          </div>

          <div className="dark:bg-transparent bg-[#F9FAFB] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#445b1c] shadow-sm">
              <Clock size={18} />
            </div>
            <div>
              <p className={cardLabel}>Time Commitment</p>
              <p className={cardValue}>
                {purchase.program.hoursPerWeek}
                {purchase.program.hoursPerWeek === 1 ? "hr" : "hrs"}/week
              </p>
            </div>
          </div>

          <div className="dark:bg-transparent bg-[#F9FAFB] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#445b1c] shadow-sm">
              <Monitor size={18} />
            </div>
            <div>
              <p className={cardLabel}>Format</p>
              <p className={cardValue}>Online</p>
            </div>
          </div>

          <div className="dark:bg-transparent bg-[#F9FAFB] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#445b1c] shadow-sm">
              <User size={18} />
            </div>
            <div>
              <p className={cardLabel}>Facilitator</p>
              <p className={cardValue}>{purchase.program.facilitatorName}</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-[#F9FAFB] dark:bg-transparent border border-[#EAECF0] dark:border-[#333] rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-primary-text">Your Progress</h3>
            <span className="text-lg font-bold text-regular-button">{progressPercentage}%</span>
          </div>
          <div className="h-2.5 w-full bg-[#E4E7EC] dark:bg-[#1A1A1A] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-regular-button transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
          </div>
          <p className="text-sm text-secondary-text">
            {purchase.progress.percentComplete === 100 
              ? "Program completed! 🎉" 
              : purchase.progress.completedModules === 0 
                ? "Ready to start Week 1" 
                : `Week ${purchase.progress.currentWeekDisplayOrder ?? 1} in progress`
            } • {completedWeeks} of {totalWeeks} weeks completed
          </p>
        </div>
        <Link href={`/dashboard/program/${purchase.program?.id}`}>
          <Button
            variant={"regular"}
            className="w-full "
          >
            {purchase.progress.completedModules === 0 ? "Start Program" : "Continue Program"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
