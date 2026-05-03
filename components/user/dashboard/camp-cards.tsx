import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { formatAppDate } from "@/lib/utils";

export default function CampCards({ registration }: { registration: any }) {
  const camp = registration.camp;
  
  let statusBadgeVariant: "warning" | "hibiscus" | "success" | "secondary" = "secondary";
  if (camp.status === "ONGOING") statusBadgeVariant = "warning";
  else if (camp.status === "COMPLETED") statusBadgeVariant = "secondary";
  else if (camp.status === "UPCOMING") statusBadgeVariant = "success";

  const cardLabel = "text-secondary-text text-xs ";
  const cardValue = "text-primary-text text-sm font-semibold";

  return (
    <div className="bg-dash-secondary-bg rounded-[16px] dark:border-none border-[0.67px] border-[#EAECF0] p-6">
      <div className="flex items-center justify-between gap-3 mb-1">
        <h2 className="xl:text-xl text-lg font-semibold text-primary-text line-clamp-1">
          {camp.title}
        </h2>
        <Badge variant={statusBadgeVariant}>
          {camp.status}
        </Badge>
      </div>

      <p className="text-secondary-text text-sm mb-6 leading-relaxed line-clamp-2">
        {camp.description}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F9FAFB] dark:bg-transparent border border-[#EAECF0] dark:border-[#333] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1A1A] flex items-center justify-center text-regular-button shadow-sm">
            <Calendar size={16} />
          </div>
          <div>
            <p className={cardLabel}>Date</p>
            <p className={cardValue}>
              {formatAppDate(camp.startDate, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="bg-[#F9FAFB] dark:bg-transparent border border-[#EAECF0] dark:border-[#333] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1A1A] flex items-center justify-center text-regular-button shadow-sm">
            <MapPin size={16} />
          </div>
          <div>
            <p className={cardLabel}>Location</p>
            <p className={cardValue}>{camp.location}</p>
          </div>
        </div>

        <div className="bg-[#F9FAFB] dark:bg-transparent border border-[#EAECF0] dark:border-[#333] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1A1A] flex items-center justify-center text-regular-button shadow-sm">
            <Users size={16} />
          </div>
          <div>
            <p className={cardLabel}>Participants</p>
            <p className={cardValue}>{registration.participantCount} registered</p>
          </div>
        </div>
      </div>

      <Link href={`/camps/${camp.id}`}>
        <Button variant="outline" className="w-full border-regular-button text-regular-button hover:bg-regular-button/10">
          View Details
        </Button>
      </Link>
    </div>
  );
}
