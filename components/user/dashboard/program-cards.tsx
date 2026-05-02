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
        {/* <div className="dark:bg-primary-text bg-[#F9FAFB] rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#101828]">Your Progress</h3>
            <span className="text-lg font-bold text-[#445b1c]">0%</span>
          </div>
          <div className="h-2.5 w-full bg-[#E4E7EC] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[#445b1c]" style={{ width: "0%" }} />
          </div>
          <p className="text-sm text-[#667085]">
            Ready to start Week 1 • 0 of {purchase.program.durationWeeks ?? 0}{" "}
            weeks completed
          </p>
        </div> */}
    <Link href={`/dashboard/program/${purchase.program?.id}`}>
        <Button
          variant={"regular"}
          className="w-full "
        >
          Start Program
        </Button>
    
    </Link>
      </div>
    </div>
  );
}
